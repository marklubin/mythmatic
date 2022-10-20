import axios, { Axios, AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "https://api.replicate.com/v1";

export type ReplicateModelVersion = {
  id: string;
};

export type ReplicateModel = {
  owner: string;
  name: string;
  description: string;
  latest_version: ReplicateModelVersion;
};

export type ReplicatePrediction = {
  id: string;
  version: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output: string[];
};

export class ReplicateClient {
  token: string;
  httpClient: AxiosInstance;
  constructor() {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("Required to set API token environement variable.");
    }
    this.token = process.env.REPLICATE_API_TOKEN;
    this.httpClient = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Token ${this.token}`,
      },
    });
  }

  async createPrediction(
    version: string,
    input: any
  ): Promise<ReplicatePrediction> {
    return await (
      await this.httpClient.post("predictions", { version, input })
    ).data;
  }

  async getPrediction(id: string): Promise<ReplicatePrediction> {
    return await (
      await this.httpClient.get(`predictions/${id}`)
    ).data;
  }

  async getModel(modelPath: string): Promise<ReplicateModel> {
    return await (
      await this.httpClient.get(`models/${modelPath}`)
    ).data;
  }
}
