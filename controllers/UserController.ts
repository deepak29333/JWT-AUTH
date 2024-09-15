import {BaseController} from "./BaseController";
import {Context} from "koa";

export class UserController extends BaseController {
  async getUsers(ctx: Context) {
    const users = await this.prisma.user.findMany({});
    this.okResult(ctx, "ok", users);
  }
}