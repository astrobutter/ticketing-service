import { Kafka } from "kafkajs";
import { env } from "../config/env.js";

export const kafka = new Kafka({
  clientId: "payments-service",
  brokers: env.KAFKA_BROKERS
});
