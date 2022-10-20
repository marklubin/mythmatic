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
  width: 256 as ImageDimension,
  height: 256 as ImageDimension,
  prompt_strength: 0.8,
  num_outputs: 1,
  num_inference_steps: 25,
  guidance_scale: 7.5,
};

export const renderTaskResolvers: Resolvers = {
  Mutation: {
    startRenderTask: async (parents, args, context: Context) => {
      const model = await context.replicateClient.getModel(
        STABLE_DIFFUSION_MODEL_NAME
      );

      const input: StableDiffusionModelInput = {
        prompt: args.input.prompt,
        ...MODEL_DEFAULT_INPUT,
      };

      const prediction = await context.replicateClient.createPrediction(
        model.latest_version.id,
        input
      );

      return context.prisma.renderTask.create({
        data: {
          externalGenerationId: prediction.id,
          prompt: args.input.prompt,
          status: RenderTaskStatus.Created,
        },
      });
    },
  },
};
