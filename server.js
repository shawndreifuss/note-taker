const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const db = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');

//middleware
app.use(express.static('public'))
app.use(express.json())

//API Routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

//Post routes
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()
    db.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})


//delete route
app.delete('/api/notes/:id', (req, res) => {
    const noteData = db.filter((note) =>
        note.id !== req.params.id)
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData))
    readFile.json(noteData)
})

//HTML Routes
//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//Wildcard Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//App listens with front end on this port
app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`))