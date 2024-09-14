import {PrismaClient, User} from "@prisma/client";

export class UserRepository {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.model = prisma.user;
  }


  async create(user: User) {
    return this.prisma.user.create({data: user});
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({where: {email}});
  }


}