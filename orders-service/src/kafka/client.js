import { Kafka } from "kafkajs";
import { env } from "../config/env.js";

export const kafka = new Kafka({
  clientId: "orders-service",
  brokers: env.KAFKA_BROKERS
});
