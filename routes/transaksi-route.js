const express = require(`express`)
const app = express()

app.use(express.json())

const transaksiController = require(`../controllers/transaksi-controller`)
const auth = require(`../middlewares/auth`)

app.get(`/transaksi`, auth.authorization(["admin", "kasir", "manajer"]), transaksiController.getTransaksi)
app.post(`/transaksi`, auth.authorization(["admin", "kasir", "manajer"]), transaksiController.addTransaksi)
app.post(`/transaksi/find`, auth.authorization(["admin", "kasir", "manajer"]), transaksiController.findTransaksi)
app.put(`/transaksi/:id_transaksi`, auth.authorization(["admin", "kasir", "manajer"]), transaksiController.updateTransaksi)
app.put(`/transaksi/pembayaran/:id_transaksi`, auth.authorization(["admin", "kasir", "manajer"]), transaksiController.pembayaranTransaksi)
app.delete(`/transaksi/:id_transaksi`, auth.authorization(["admin", "kasir", "manajer"]), transaksiController.deleteTransaksi)

module.exports = app