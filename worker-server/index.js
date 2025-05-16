import { startProducer } from "./src/kafkaProducer.js";

(async () => {
  try {
    await startProducer();
  } catch (err) {
    console.error("Kafka producer error:", err);
  }
})();
