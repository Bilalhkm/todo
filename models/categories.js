import mongoose, { model } from "mongoose";
import User from "./user.js";
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: User },
  shareUser: { type: Schema.Types.ObjectId },
});

export default model("Category", categorySchema);
