const Pool = require('pg').Pool
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.db,
  password: config.database.pw,
  port: config.database.port
})

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
  const { title, estimatedTime, category, userID } = request.body
  pool.query('INSERT INTO tasks (title, estimated_time, category, user_id) VALUES ($1, $2, $3, $4)', [title, estimatedTime, category, userID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   const { name, email } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

module.exports = {
  getTasks,
  getTaskById,
  createTask
}