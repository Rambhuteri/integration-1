const express = require('express');
const noteModel = require('./models/note.model')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
/**
 * post /api/notes
 * create new note and save data in mongoose database
 * req.body = {title, description}
 */

app.post('/api/notes', async(req,res)=>{
   const {title,description} = req.body;


 const note = await  noteModel.create({title,description})
 res.status(201).json({message:"note created successfully ",
    note
 })
})

/**
 * get /api/notes
 * fetch all the notes data from mongoose database and send it to the client
 */

app.get('/api/notes', async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})
/**
 * delete/api/notes/id'
 * delete the note from mongoose database based on the id provided in the request params
 */

app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;

    const note = await noteModel.findByIdAndDelete(id);

   

    res.status(200).json({
        message: "Note deleted successfully",
        note
    });
});
/**
 * patch /api/notes/:id
 * update the note description by id
 * req.body ={descriptio}
 */

app.patch('/api/notes/:id',async(req, res)=>{
    const id = req.params.id
    const {description} = req.body

  const note =  await noteModel.findByIdAndUpdate(id,{description})

  res.status(200).json({
    message:"note updated successfully",
    note
  })

})



module.exports = app;