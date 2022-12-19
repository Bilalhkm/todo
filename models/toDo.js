import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const toDoSchema = new Schema({
    category: { type: String, required: true }, // String is shorthand for {type: String}
    task: { type: String, required: true },
    eventDate: { type: Date, required: true },
    date: { type: Date, default: Date.now },

});


export default model("toDo", toDoSchema);