import mongoose, { model } from "mongoose";
import validator from "validator";
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username area is required"],
    lowercase: true,
    validate: [validator.isAlphanumeric, "Only alphanumaric charechters"],
  },
  email: {
    type: String,
    required: [true, "Email area is required"],
    validate: [validator.isEmail, "Valid email is required"],
  },
  password: {
    type: String,
    required: true,
  },
});
export default model("User", userSchema);
