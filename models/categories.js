import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const categorySchema = new Schema({

    categoryName: { type: String, required: true },

});


export default model("category", categorySchema);