//import files
const fs = require('fs')
const path = require('path');
const express = require('express');
const db = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express();

//gives unique id 
const { v4: uuidv4 } = require('uuid');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(api.slice(1));
});

app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);




// function to post notes 
app.post('api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4()

    db.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(db))
    res.json(db)

})


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

//wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);