const Pool = require('pg').Pool;
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const moment = require('moment');

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.db,
  password: config.database.pw,
  port: config.database.port
})

const crypto = require('crypto');

const getTasks = (request, response) => {
  const user_id = request.params.user_id
  console.log(`SELECT * FROM tasks WHERE user_id = ${user_id} ORDER BY id ASC`);

  pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC', [user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTaskById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM tasks WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTask = (request, response) => {
  const { title, estimatedTime, category, userID } = request.body;
  pool.query('INSERT INTO tasks (title, estimated_time, category, user_id) VALUES ($1, $2, $3, $4)', [title, estimatedTime, category, userID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const deleteTask = (request, response) => {
  const { id, title, category } = request.body;
  const userID = request.params.user_id;
  console.log(request.body)
  console.log(`Deleting task from user ${userID} with id ${id}`)
  pool.query('DELETE FROM tasks WHERE user_id=$1 and id=$2 and title=$3 and category=$4',
    [userID, id, title, category], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Removed task ${title} with id ${id}`)
  })
}

const updateTask = (request, response) => {
  const { title, estimated_time, category, id} = request.body;
  const userID = request.params.user_id;
  console.log(`Updating user ${userID} who has task ${id}`)
  pool.query(
    'UPDATE tasks SET title=$1, estimated_time=$2, category=$3 WHERE user_id=$4 and id=$5',
    [title, estimated_time, category, userID, id],
    (error, results) => {
      if (error)
        throw error
      response.status(200).send(`Updated user ${userID} with fields ${{title, estimated_time, category, userID}}`)
  })
}

const startTask = (request, response) => {
  const { id } = request.body;
  const userID = request.params.user_id;
  const time_created = moment().utc().format();
  console.log(time_created);
  pool.query(
    'UPDATE tasks SET time_started=$1 WHERE user_id=$2 and id=$3', 
    [time_created, userID, id],
    (error, results) => {
      if (error)
        throw error
      response.status(200).send(`Updated user ${userID} with fields ${{time_created}}`)
  })
}

const endTask = (request, response) => {
  const { id } = request.body;
  const userID = request.params.user_id;
  const time_finished = moment().utc().format();
  pool.query(
    'UPDATE tasks SET time_finished=$1 WHERE user_id=$2 and id=$3', 
    [time_finished, userID, id],
    (error, results) => {
      if (error)
        throw error
      response.status(200).send(`Updated user ${userID} with fields ${{time_finished}}`)
  })
}

// const createUser = (request, response) => {
//   const { userID, first_name, last_name, email, username, pw } = request.body
//   pwHashed = crypto.createHash('sha256').update(pw+config.secret.salt).digest('hex');
//   console.log(pwHashed)
//   pool.query(
//     'INSERT INTO nibble_users (user_id, first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5, $6',
//      [userID, first_name, last_name, email, username, pwHashed],
//      (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(201).send(`Successfully created user ${username}. Welcome, ${first_name}!`)
//      })
// }

const getNotes = (request, response) => {
  const user_id = request.params.user_id

  pool.query('SELECT * FROM notes WHERE user_id = $1', [user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows[0])
  })
}

const deleteUser = (request, response) => {
  const user_id = parseInt(request.params.user_id)

  pool.query('DELETE FROM nibble_users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    console.log(`User with ID: ${user_id} was deleted`);
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const updateNotes = (request, response) => {
  const { userID, note } = request.body

  // INSERT INTO distributors (did, dname)
  // VALUES (5, 'Gizmo Transglobal'), (6, 'Associated Computing, Inc')
  // ON CONFLICT (did) DO UPDATE SET dname = EXCLUDED.dname;
  const query = `INSERT INTO notes (user_id, content) VALUES ($1, '') ON CONFLICT (user_id) DO UPDATE SET content = $2`

  pool.query(query, [userID, note], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User modified with ID: ${userID}`)
  })
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  startTask,
  endTask,
  deleteTask,
  getNotes,
  updateNotes
}