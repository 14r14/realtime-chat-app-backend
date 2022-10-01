import express, { Express } from "express";
import dotenv from "dotenv";
import http = require("http");
import socketIO from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser = require("cookie-parser");
import cors = require("cors");

import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "./interfaces/socketio.interface";

import authRoutes = require("./routes/auth.routes");
import messageRoutes = require("./routes/message.routes");

import { newMessage } from "./socketio/message";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const server = http.createServer(app);

const io = new socketIO.Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: "http://localhost:3000",
    methods: ["OPTIONS", "POST", "GET", "DELETE", "PUT"],
  },
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    newMessage(msg).then((message) => {
      socket.emit("sent", message)
    });
  });
})

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Robots-Tag"],
    methods: ["OPTIONS", "POST", "GET", "DELETE", "PUT"],
  })
);

app.use("/auth", authRoutes);
app.use("/msg", messageRoutes);

mongoose.connect("mongodb://localhost:27017/realtime-chat-app").then(() => {
  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
});
