const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5001;

const db = require('./queries')

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get("/", (req, res) => res.send('hello'))

app.get('/getTasks/:user_id', db.getTasks);
app.get('/tasks/:id', db.getTaskById);
app.post('/createTask', db.createTask);
app.put('/updateTask/:user_id', db.updateTask);
app.put('/startTask/:user_id', db.startTask);
app.put('/endTask/:user_id', db.endTask);
app.delete('/deleteTask/:user_id', db.deleteTask);
app.get('/getNotes/:user_id', db.getNotes);
app.put('/updateNotes/:user_id', db.updateNotes);

// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.use(express.static(path.join(__dirname, './frontend/build')));

//production mode
if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, './frontend/build'))); 
  app.get('*', (req, res) => {    
    res.sendfile(path.join(__dirname = './frontend/build/index.html'));  
  })
}

//build mode
app.get('*', (req, res) => {  
  res.sendFile(path.join(__dirname+'./frontend/build/index.html'));
})

console.log("\x1b[36m%s\x1b[0m", `Hosting on PORT=${PORT}`);
app.listen(PORT);