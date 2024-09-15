import {BaseController} from "./BaseController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserRepository} from "../repository/UserRepository";
import {User} from "@prisma/client";
import redisClient from "../redis/redisClient";

const JWT_SECRET = "your_secret_key"

export class AuthController extends BaseController {
  protected userRepository: UserRepository = new UserRepository(this.prisma);

  async signup(ctx: any): Promise<any> {
    try {
      const body: User = ctx.request.body;

      if (!body.email || !body.password) {
        return this.error(ctx, "Email and password are required", 400);
      }

      const user = await this.userRepository.findByEmail(body.email);

      if (user) return this.error(ctx, "user already exist", 400);

      body.password = await bcrypt.hash(body.password, 10);
      await this.userRepository.create(body);
      await redisClient.del('/users');
      return this.okResult(ctx, "ok")
    } catch (error: any) {
      return this.error(ctx, "error", 400)
    }
  }

  async login(ctx: any): Promise<any> {
    try {
      const {email, password} = ctx.request.body;
      const user = await this.userRepository.findByEmail(email);

      if (!user) return this.error(ctx, "Invalid email or password", 401);

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) return this.error(ctx, "Invalid password", 401);

      // Generate JWT token
      const token = jwt.sign({userId: user.id}, JWT_SECRET, {
        expiresIn: "2h",
      });

      return this.okResult(ctx, "Login successful", {token})

    } catch (error: any) {
      return this.error(ctx, error, 400);
    }
  }


  async logout(ctx: any): Promise<any> {
    try {
      // ctx.body = {message: "Login successful", token};
    } catch (error: any) {
      console.log(error);
      ctx.status = 500;
      ctx.body = {message: "Error logging in"};
    }
  }

}