import mongoose, { model, Schema } from "mongoose";
import User from "./user.js";
interface findCategory extends mongoose.Document {
  categoryName: string;
  user: string;
}

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: User },
});

export default model<findCategory>("Category", categorySchema);
