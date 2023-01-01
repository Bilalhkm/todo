import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const toDoSchema = new Schema({
  categoryID: { type: String, required: true, index: true },
  taskName: { type: String, required: true },
  duoDate: { type: Date, required: true },
  createdDate: { type: Date, default: Date.now },
  completeTask: { type: Boolean, default: false },
});

export default model("ToDo", toDoSchema);
