import jwt from "jsonwebtoken";
import redisClient from "../redis/redisClient";

const JWT_SECRET = "your_secret_key";

export const authMiddleware = async (ctx: any, next: any) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.status = 401;
    ctx.body = {message: "Authorization token is missing or invalid"};
    return;
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodeToken: any = jwt.verify(token, JWT_SECRET);
    ctx.state.user = decodeToken.userId;

    const cachedData = await redisClient.get(ctx.url);
    if (cachedData) {
      ctx.body = JSON.parse(cachedData);
      return;
    }
    await next();

    if (ctx.status === 200) {
      await redisClient.set(ctx.url, JSON.stringify(ctx.body), {
        EX: 60,
      });
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = {message: "Invalid or expired token"};
  }
};