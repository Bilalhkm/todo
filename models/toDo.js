import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const toDoSchema = new Schema({
  categoryID: { type: String, required: true ,index:true},
  taskName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  date: { type: Date, default: Date.now },
});

export default model("toDo", toDoSchema);
