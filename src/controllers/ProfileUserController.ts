import { Request, Response } from "express";
import prismaClient from "../prisma";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    return response.json(user);
  }
}

export { ProfileUserController };
