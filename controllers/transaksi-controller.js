const transaksiModel = require(`../models/index`).transaksi
const detailModel = require(`../models/index`).detail_transaksi
const menuModel = require(`../models/index`).menu
const mejaModel = require(`../models/index`).meja

exports.addTransaksi = async (request, response) => {
    try {
        let transaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: "belum_bayar"
        }
        let insertTransaksi = await transaksiModel.create(transaksi)
        let id_meja = insertTransaksi.id_meja
        let data_meja = {
            status: false
        }
        await mejaModel.update(data_meja, { where: { id_meja: id_meja } })
        let transaksiID = insertTransaksi.id_transaksi
        let arrayDetail = request.body.detail_transaksi
        for (let i = 0; i < arrayDetail.length; i++) {
            arrayDetail[i].id_transaksi = transaksiID
            let menu = await menuModel.findOne({ where: { id_menu: arrayDetail[i].id_menu } })
            arrayDetail[i].harga = menu?.harga
        }
        await detailModel.bulkCreate(arrayDetail)
        return response.json({
            status: true,
            message: `Data transaksi berhasil ditambahkan`
        })
    } catch (error) {
        return response.json({
            status: false,
            messsage: error.messsage
        })
    }
}
exports.updateTransaksi = async (request, response) => {
    try {
        let id_transaksi = request.params.id_transaksi
        let newData = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: "belum_bayar"
        }
        let transaksi = await transaksiModel.update(newData, { where: { id_transaksi: id_transaksi } })
        let id_meja = transaksi.id_meja
        let data_meja = {
            status: false
        }
        await mejaModel.update(data_meja, { where: { id_meja: id_meja } })
        await detailModel.destroy({ where: { id_transaksi: id_transaksi } })
        let arrayDetail = request.body.detail_transaksi
        for (let i = 0; i < arrayDetail.length; i++) {
            arrayDetail[i].id_transaksi = id_transaksi
            let menu = await menuModel.findOne({ where: { id_menu: arrayDetail[i].id_menu } })
            arrayDetail[i].harga = menu?.harga
        }
        await detailModel.bulkCreate(arrayDetail)
        return response.json({
            status: true,
            message: `Data transaksi berhasil diubah`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.deleteTransaksi = async (request, response) => {
    try {
        let id_transaksi = request.params.id_transaksi
        await detailModel.destroy({ where: { id_transaksi: id_transaksi } })
        await transaksiModel.destroy({ where: { id_transaksi: id_transaksi } })
        return response.json({
            status: true,
            message: `Data transaksi berhasil dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.pembayaranTransaksi = async (request, response) => {
    try {
        let id_transaksi = request.params.id_transaksi
        let newData = {
            status: "lunas"
        }
        let transaksi = await transaksiModel.findOne({ where: { id_transaksi: id_transaksi } })
        let id_meja = transaksi.id_meja
        let data_meja = {
            status: true
        }
        await mejaModel.update(data_meja, { where: { id_meja: id_meja } })
        await transaksiModel.update(newData, { where: { id_transaksi: id_transaksi } })
        return response.json({
            status: true,
            message: `Pembayaran berhasil`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.getTransaksi = async (request, response) => {
    try {
        let result = await transaksiModel.findAll({
            order: [
                ["id_transaksi", "DESC"]
            ],
            include: [
                "meja", "user", {
                    model: detailModel,
                    as: "detail_transaksi",
                    include: ["menu"]
                }
            ]
        })
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.findTransaksi = async (request, response) => {
    try {
        let keyword = request.body.searchKasir
        let result = await transaksiModel.findAll({
            include: [
                "meja", {
                    model: userModel, as: "user", where: {
                        [Op.or]: {
                            nama_user: { [Op.substring]: keyword }
                        }
                    }
                },
                { model: detailModel, as: "detail_transaksi", include: ["menu"] }
            ]
        })

        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}