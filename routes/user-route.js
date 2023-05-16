const express = require(`express`)
const app = express()

app.use(express.json())

const userController = require(`../controllers/user-controller`)
const authController = require(`../controllers/auth-controller`)

app.get(`/user`, authController.authorization, userController.getUser)
app.post(`/user/find`, authController.authorization, userController.findUser)
app.post(`/user`, authController.authorization, userController.addUser)
app.put(`/user/:id_user`, authController.authorization, userController.updateUser)
app.delete(`/user/:id_user`, authController.authorization, userController.deleteUser)

module.exports = app