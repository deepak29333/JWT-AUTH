import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',  // Replace this with your Redis URL if using a hosted Redis service
});

(async () => {
  try {
    await redisClient.connect(); // Connect to Redis
    console.log("Redis connected successfully");
  } catch (error) {
    console.error('Redis connection failed', error);
  }
})();
export default redisClient;