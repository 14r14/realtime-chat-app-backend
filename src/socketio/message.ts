import { checkJWT } from "../helpers/jwtTokenMethods";
import Message, { MessageStructure } from "../models/message.model";

import uuid = require("uuid");

interface MessageParam {
  message: string;
  userToken: string;
}

export const newMessage = async (msg: MessageParam) => {
  const user = await checkJWT(msg.userToken);
  const message = await Message.create({
    msg: msg.message,
    sender: user && user._id.toString(),
    date: new Date().toISOString(),
  });
  await message.save();
  await message.populate("sender");
  return {
    key: uuid.v4(),
    sent: true,
    message: message,
  };
};
