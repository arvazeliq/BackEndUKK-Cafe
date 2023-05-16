const express = require(`express`)
const app = express()

app.use(express.json())

const transaksiController = require(`../controllers/transaksi-controller`)
const authController = require(`../controllers/auth-controller`)

app.get(`/transaksi`, authController.authorization, transaksiController.getTransaksi)
app.post(`/transaksi`, authController.authorization, transaksiController.addTransaksi)
app.put(`/transaksi/:id_transaksi`, authController.authorization, transaksiController.updateTransaksi)
app.delete(`/transaksi/:id_transaksi`, authController.authorization, transaksiController.deleteTransaksi)

module.exports = app