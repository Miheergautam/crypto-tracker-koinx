import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "worker-server",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export const startProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");

  setInterval(async () => {
    try {
      await producer.send({
        topic: "crypto-update",
        messages: [{ value: JSON.stringify({ trigger: "update" }) }],
      });
      console.log("Published update event to kafka");
    } catch (err) {
      console.error("Error publishing to Kafka", err);
    }
  }, 15 * 60 * 1000);
};
