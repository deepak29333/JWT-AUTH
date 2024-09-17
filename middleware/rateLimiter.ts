import rateLimit from "koa-ratelimit";
import Redis from "ioredis"

export const rateLimiter = rateLimit({
  driver: "redis",
  db: new Redis(),
  duration: 60 * 1000,
  errorMessage: 'Too many requests from this IP, please try again after some time.',
  id: (ctx: any) => ctx.ip, // Using the IP as the unique identifier
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total',
  },
  max: 20, // Maximum 100 limit
})