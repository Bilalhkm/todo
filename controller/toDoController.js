import toDo from "../models/toDo.js";
const createToDo = async (req, res) => {
    let data = req.body;
    let time = `${data.date}T${data.hour}:00.000+00:00`
    const taDoData = { title: data.title, event: data.event, eventDate: time }
    await toDo.create(taDoData);
    res.send("event is created");
};
export default { createToDo: createToDo };

const myEvents = async (req, res) => {
    await toDo.find({}).sort
}