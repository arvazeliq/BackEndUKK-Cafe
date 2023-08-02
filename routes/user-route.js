const express = require(`express`)
const app = express()

app.use(express.json())

const userController = require(`../controllers/user-controller`)
const auth = require(`../middlewares/auth`)

app.get(`/user`, auth.authorization(["admin", "kasir", "manajer"]), userController.getUser)
app.post(`/user/find`, auth.authorization(["admin", "kasir", "manajer"]), userController.findUser)
app.post(`/user`, auth.authorization(["admin", "kasir", "manajer"]), userController.addUser)
app.put(`/user/:id_user`, auth.authorization(["admin", "kasir", "manajer"]), userController.updateUser)
app.delete(`/user/:id_user`, auth.authorization(["admin", "kasir", "manajer"]), userController.deleteUser)

module.exports = app