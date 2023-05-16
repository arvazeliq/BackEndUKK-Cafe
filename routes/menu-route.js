const express = require(`express`)
const app = express()

const menuController = require(`../controllers/menu-controller`)
const authController = require(`../controllers/auth-controller`)

app.get(`/menu`, authController.authorization, menuController.getMenu)
app.post(`/menu`, authController.authorization, menuController.addMenu)
app.post(`/menu/find`, authController.authorization, menuController.filterMenu)
app.put(`/menu/:id_menu`, authController.authorization, menuController.updateMenu)
app.delete(`/menu/:id_menu`, authController.authorization, menuController.deleteMenu)

module.exports = app