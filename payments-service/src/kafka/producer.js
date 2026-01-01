import { kafka } from "./client.js";

export const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
  console.log("Payments Kafka producer connected");
}

export async function publish(topic, payload) {
  await producer.send({ topic, messages: [{ value: JSON.stringify(payload) }] });
}
