import { Request, Response } from "express";
import prismaClient from "../prisma";
import { io } from "../app";

class MessageController {
  async create(request: Request, response: Response) {
    const { text } = request.body;
    const { user_id } = request;

    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    };

    io.emit("new_message", infoWS);

    return response.json(message);
  }

  async last3(request: Request, response: Response) {
    
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return response.json(messages);
  }

}

export { MessageController };
