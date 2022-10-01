import { MessageStructure } from "../models/message.model";

interface Message {
  message: string;
  userToken: string;
  // time: Date;
  // room: string;
}

interface MessageSent {
  key: string;
  sent: boolean;
  message: MessageStructure;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  connected: (res: string) => void;
  sent: (message: MessageSent) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  message: (msg: Message) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}