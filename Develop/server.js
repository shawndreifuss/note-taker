const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const db = require('./db/db.json')

//gives notes  a unique ID
const { v4: uuidv4 } = require('uuid');

//middleware
app.use(express.static('public'))
app.use(express.json())

//API Routes
//get notes from api
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
})

//post notes function
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()
    db.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(db))
    res.json(db)
})
//delete function
app.delete('/api/notes/:id', (req, res) => {
    const newDb = db.filter((note) =>
        note.id !== req.params.id)
    fs.writeFile('./db/db.json', JSON.stringify(newDb))
    readFile.json(newDb)
})
//route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
//route for notes page
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