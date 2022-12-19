import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const toDoSchema = new Schema({
    title: { type: String, required: true }, // String is shorthand for {type: String}
    event: { type: String, required: true },
    eventDate: { type: Date, required: true },
    date: { type: Date, default: Date.now },

}); 


export default model("toDo", toDoSchema);