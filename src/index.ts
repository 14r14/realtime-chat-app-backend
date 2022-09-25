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
    origin: "http://localhost:3001",
    methods: ["OPTIONS", "POST", "GET", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  socket.emit("connected", "Connected to server!");
  socket.on("message", (data) => {
    console.log(data);
  });
  console.log("Connection receieved.");
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Robots-Tag"],
    methods: ["OPTIONS", "POST", "GET", "DELETE", "PUT"],
  })
);

app.use("/auth", authRoutes);

mongoose.connect("mongodb://localhost:27017/realtime-chat-app").then(() => {
  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
});
