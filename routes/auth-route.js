const express = require(`express`)
const app = express()

app.use(express.json())

const auth = require(`../middlewares/auth`)

app.post(`/authentication`, auth.authentication)
app.post(`/authorization`, auth.authorization)

module.exports = app