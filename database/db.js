// getting-started.js

import mongoose from "mongoose";
mongoose.set('strictQuery', false);

connect().catch(err => console.log(err));

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
};


export default connect;