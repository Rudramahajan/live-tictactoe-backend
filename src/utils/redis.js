import Redis from 'ioredis'

// Replace with your Redis details
const redis = new Redis({
  host: 'redis', // Redis host
  port: 6379,        // Redis port
//   password: "yourpassword", // Replace with your password if set
});

// Test the connection
redis.on("connect", () => {
  console.log("Connected to Redis!");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis
