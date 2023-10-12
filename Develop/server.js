//import files
const fs = require('fs')
const path = require('path');
const express = require('express');
const api = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);




// function to post notes 
function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFile(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, api);
    res.json(newNote);
});


//delete notes 
function deleteNotes (id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];
        if (note.id === id ) {
            notesArray.splice(i,1);
            fs.writeFile(path.join(__dirname, './db/db.json'),JSON.stringify(notesArray, null, 2))
        }

}
}
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, api);
    res.json(true);
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);