import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

export interface MessageStructure {
  _id: ObjectId | string;
  sender: ObjectId | string;
  msg: string;
  date: Date;
}

const messageSchema = new Schema<MessageStructure>({
  sender: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  msg: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<MessageStructure>("message", messageSchema);