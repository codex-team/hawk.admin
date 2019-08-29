import axios, { AxiosInstance } from "axios";

import workerNames from "../common/workerNames";

interface RabbitOverview {
  queued: {
    messages: {
      value: number;
      rate: number;
    };
  };
}

interface RabbitWorkers {
  name: string;
  idleSince: String;
  messagesUnacknowledged: number;
}

const URI_OVERVIEW = "/overview";
const URI_CONSUMERS = "/consumers";
const URI_CHANNELS = "/channels";

const queueToWorkerName = {
  "notify/checker": "checker",
};

export default class Rabbit {
  private rabbitUrl: string;
  private rabbitPass: string;
  private rabbitUser: string;
  private axios: AxiosInstance;

  constructor() {
    if (!process.env.RABBIT_URL) {
      throw new Error("RABBIT_URL must be set");
    }

    if (!process.env.RABBIT_USER) {
      throw new Error("RABBIT_USER must be set");
    }

    if (!process.env.RABBIT_PASS) {
      throw new Error("RABBIT_PASS must be set");
    }

    this.rabbitUrl = process.env.RABBIT_URL;
    this.rabbitUser = process.env.RABBIT_USER;
    this.rabbitPass = process.env.RABBIT_PASS;

    this.axios = axios.create({ baseURL: process.env.RABBIT_URL });
    this.axios.defaults.auth = {
      username: process.env.RABBIT_USER,
      password: process.env.RABBIT_PASS,
    };
  }

  public async overview(): Promise<RabbitOverview> {
    const result: any = (await this.axios.get(URI_OVERVIEW)).data;

    return {
      queued: {
        messages: {
          value: result.queue_totals.messages,
          rate: result.queue_totals.messages_details.rate,
        },
      },
    };
  }

  public async openConnections(): Promise<any> {
    // list consumers -> get each consumer
    let consumers: any = (await this.axios.get(URI_CONSUMERS)).data;

    consumers = consumers.map((el: any) => el.channel_details.name);

    const result = [];

    return consumers;
  }

  public async workersOnline(): Promise<any> {
    // list queues -> get each queue -> get each consumer
  }
}
