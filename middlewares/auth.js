const jwt = require(`jsonwebtoken`)
const md5 = require(`md5`)
const userModel = require(`../models/index`).user

async function verifyToken(token) {
    try {
        let secretKey = `mokletmlg`
        let decode = jwt.verify(token, secretKey)
        return true
    } catch (error) {
        return false
    }
}

exports.authentication = async (request, response) => {
    try {
        let dataLogin = {
            username: request.body.username,
            password: md5(request.body.password)
        }

        let result = await userModel.findOne({ where: dataLogin })
        if (result) {
            let secretKey = `mokletmlg`
            let header = {
                algorithm: "HS256"
            }
            let payload = JSON.stringify(result)
            let token = jwt.sign(payload, secretKey, header)

            return response.json({
                status: true,
                token: token,
                data: result,
                message: `Login Successfull`
            })
        } else {
            return response.json({
                status: false,
                message: `Invalid Username or Password`
            })
        }
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.authorization = (roles) => {
    return async function (request, response, next) {
        try {
            let token = request.headers?.authorization?.split(" ")[1]
            if (token == null) {
                return response
                    .status(401)
                    .json({
                        status: false,
                        message: "Unauthorized"
                    })
            }
            if (!await verifyToken(token)) {
                return response
                    .status(401)
                    .json({
                        status: false,
                        message: "Invalid Token"
                    })
            }
            let plainText = jwt.decode(token)
            if (!roles.includes(plainText?.role)) {
                return response
                    .status(403)
                    .json({
                        status: false,
                        message: "Forbidden Access"
                    })
            }
            next()
        } catch (error) {
            return response.json({
                status: false,
                message: error.message
            })
        }
    }
}