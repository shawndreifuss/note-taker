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
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
})


app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req,res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);




// function to post notes 
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4()

    db.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(db))
    res.json(db)

})


//delete notes 
app.delete('/api/notes/:id', (req,res) => {
    const newDb = db.filter((note) =>
    note.id !== req.params.id)
    fs.writeFile('./db/db.json', JSON.stringify(newDb))
    fs.readFile.json(newDb)
})

//wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);