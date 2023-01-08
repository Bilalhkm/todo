import mongoose, { model } from "mongoose";
import User from "./user";
const { Schema } = mongoose;

const toDoSchema = new Schema({
  categoryID: { type: String, required: true, index: true },
  taskName: { type: String, required: true },
  duoDate: { type: Date, required: true },
  createdDate: { type: Date, default: Date.now },
  completeTask: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: User },
});

export default model("ToDo", toDoSchema);
