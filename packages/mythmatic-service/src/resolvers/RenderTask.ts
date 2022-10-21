import { RenderTaskStatus, Resolvers } from "mythmatic-graphql-schema";
import { Context } from "../context";

type ImageDimension = 128 | 256 | 512 | 768 | 896 | 1024;

type StableDiffusionModelInput = {
  prompt: String!;
  width: ImageDimension!;
  height: ImageDimension!;
  prompt_strength: number!;
  num_outputs: number!;
  num_inference_steps: number!;
  guidance_scale: number!;
};

const STABLE_DIFFUSION_MODEL_NAME = "stability-ai/stable-diffusion";

//Eventually this will be customized by the type of model and be part of graphql schema as well
const MODEL_DEFAULT_INPUT = {
  width: 512 as ImageDimension,
  height: 512 as ImageDimension,
  prompt_strength: 0.8,
  num_outputs: 1,
  num_inference_steps: 50,
  guidance_scale: 7.5,
};

function isTerminalStatus(status: string) {
  return status === RenderTaskStatus.Completed || status === RenderTaskStatus.Failed;
}

export const renderTaskResolvers: Resolvers = {
  Mutation: {
    startRenderTask: async (parents, args, context: Context) => {
      const model = await context.replicateClient.getModel(STABLE_DIFFUSION_MODEL_NAME);

      const input: StableDiffusionModelInput = {
        prompt: args.input.prompt,
        ...MODEL_DEFAULT_INPUT,
      };

      const prediction = await context.replicateClient.createPrediction(model.latest_version.id, input);

      return context.prisma.renderTask.create({
        data: {
          externalGenerationId: prediction.id,
          prompt: args.input.prompt,
          status: RenderTaskStatus.Created,
        },
      });
    },
  },
  Query: {
    getRenderTask: async (parent, args, context: Context) => {
      const task = await context.prisma.renderTask.findUnique({
        where: {
          id: args.taskId,
        },
      });

      if (!task) {
        throw new Error(`No task found for ${args.taskId}.`);
      }

      if (isTerminalStatus(task.status)) {
        return task;
      }

      const prediction = await context.replicateClient.getPrediction(task.externalGenerationId);

      if (prediction.status === "failed") {
        return context.prisma.renderTask.update({
          where: {
            id: args.taskId,
          },
          data: {
            status: RenderTaskStatus.Failed,
          },
        });
      }

      if (prediction.status === "succeeded") {
        return context.prisma.renderTask.update({
          where: {
            id: args.taskId,
          },
          data: {
            status: RenderTaskStatus.Completed,
            payloadUrl: prediction.output[0], //only supports single prediction per task for now
          },
        });
      }

      console.log("Queried Replicate for update by task is still pending.");

      return task;
    },
  },
};
