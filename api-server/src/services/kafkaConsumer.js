import { Kafka } from "kafkajs";
import { storeCryptoStats } from "./cryptoService.js";

const kafka = new Kafka({
  clientId: "api-server",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "crypto-group" });

export const startConsumer = async () => {
  await consumer.connect();
  console.log("Kafka Consumer connected");

  await consumer.subscribe({ topic: "crypto-update", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const msgValue = message.value.toString();
      console.log("Received message:", msgValue);

      try {
        const data = JSON.parse(msgValue);
        if (data.trigger === "update") {
          console.log("Triggering storeCryptoStats()...");
          await storeCryptoStats();
          console.log("Crypto stats updated");
        }
      } catch (err) {
        console.error("Error processing Kafka message", err);
      }
    },
  });
};
