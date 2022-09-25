import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface UserStructure {
  username: string;
  email: string;
  password: string;
  active: boolean;
  token?: string;
  status: string;
}

const UserSchema = new Schema<UserStructure>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  token: { type: String, required: false },
  status: { type: String, default: "Offline" },
});

export default mongoose.model<UserStructure>("user", UserSchema);
