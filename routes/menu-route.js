const express = require(`express`)
const app = express()

const menuController = require(`../controllers/menu-controller`)
const auth = require(`../middlewares/auth`)

app.get(`/menu`, auth.authorization(["admin", "kasir", "manajer"]), menuController.getMenu)
app.post(`/menu`, auth.authorization(["admin", "kasir", "manajer"]), menuController.addMenu)
app.post(`/menu/find`, auth.authorization(["admin", "kasir", "manajer"]), menuController.filterMenu)
app.put(`/menu/:id_menu`, auth.authorization(["admin", "kasir", "manajer"]), menuController.updateMenu)
app.delete(`/menu/:id_menu`, auth.authorization(["admin", "kasir", "manajer"]), menuController.deleteMenu)

module.exports = app