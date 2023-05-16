const express = require(`express`)
const app = express()

app.use(express.json())

const mejaController = require(`../controllers/meja-controller`)
const authController = require(`../controllers/auth-controller`)

app.get(`/meja`, authController.authorization, mejaController.getMeja)
app.get(`/meja/available`, authController.authorization, mejaController.availableMeja)
app.post(`/meja`, authController.authorization, mejaController.addMeja)
app.put(`/meja/:id_meja`, authController.authorization, mejaController.updateMeja)
app.delete(`/meja/:id_meja`, authController.authorization, mejaController.deleteMeja)

module.exports = app