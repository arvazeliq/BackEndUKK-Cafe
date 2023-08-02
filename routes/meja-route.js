const express = require(`express`)
const app = express()

app.use(express.json())

const mejaController = require(`../controllers/meja-controller`)
const auth = require(`../middlewares/auth`)

app.get(`/meja`, auth.authorization(["admin", "kasir", "manajer"]), mejaController.getMeja)
app.get(`/meja/available`, auth.authorization(["admin", "kasir", "manajer"]), mejaController.availableMeja)
app.post(`/meja`, auth.authorization(["admin", "kasir", "manajer"]), mejaController.addMeja)
app.put(`/meja/:id_meja`, auth.authorization(["admin", "kasir", "manajer"]), mejaController.updateMeja)
app.delete(`/meja/:id_meja`, auth.authorization(["admin", "kasir", "manajer"]), mejaController.deleteMeja)

module.exports = app