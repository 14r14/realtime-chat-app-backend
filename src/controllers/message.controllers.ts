import { Request, Response } from "express";
import { v4 } from "uuid";

import Message, { MessageStructure } from "../models/message.model";

const getMessages = async (req: Request, res: Response) => {
  const messages = await Message.find().populate("sender").sort({ date: -1 });

  interface MessageSent {
    key: string;
    sent: boolean;
    message: MessageStructure;
  }

  const r: MessageSent[] = [];
  messages.forEach((message) => {
    const messageStructure = {
      key: v4(),
      sent: true,
      message: message,
    };
    r.push(messageStructure);
    return messageStructure;
  });
  return res.status(200).json({ messages: r });
};

export { getMessages };
