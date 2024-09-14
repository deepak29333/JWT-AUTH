import {PrismaClient} from "@prisma/client";

export class BaseController {
  protected prisma = new PrismaClient();

  okResult(ctx: any, message: any, data?: any, status: number = 200) {
    ctx.status = status
    ctx.body = {message: message};
    data ? ctx.body.data = data : undefined;
  }

  error(ctx: any, message: any, status: number) {
    ctx.status = status;
    ctx.body = {message: message};
  }
}