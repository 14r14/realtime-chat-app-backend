interface Message {
  data: string;
  username: string;
  time: Date;
  room: string;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  connected: (res: string) => void;
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