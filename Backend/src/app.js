require('dotenv').config();
const express = require('express');
const noteModel = require('./models/note.model');
const cors = require('cors');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.static('./public'));
app.use(cors());

app.post("/notes", async (req, res)=>{
    const {title, description} = req.body;
    if(!title || !description){
        return res.status(400).json({message: "Title and description are required"});
    }
    try {
        const newNote = new noteModel({title, description});
        await newNote.save();
        res.status(201).json({message: "Note created successfully", note: newNote});
    } catch (error) {
        res.status(500).json({message: "Error creating note"});
    }
})

app.get("/notes", async (req, res)=>{
    try {
        const notes = await noteModel.find();   
        res.status(200).json({message: "Notes fetched successfully",  notes});
    } catch (error) {
        res.status(500).json({message: "Error fetching notes"});
    }
});

app.delete("/notes/:id", async (req, res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({message: "Note deleted successfully"});
    
});

app.patch("/notes/:id", async (req, res)=>{
    const id = req.params.id;
    const {title, description} = req.body;
    const updatedNote = await noteModel.findByIdAndUpdate(id, {title, description}, {new: true});

    res.status(200).json({message: "Note modified successfully", note: updatedNote});


});

app.use("*name",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"));
});



module.exports = app;