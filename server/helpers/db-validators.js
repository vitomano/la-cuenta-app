const User = require('../models/users.model')
const Rol = require('../models/roles')


const emailExist = async ( email = '' ) => {

    const existEmail = await User.findOne({ email })

    if (existEmail) {
        throw new Error(`The email ${email} is already taken`)
        }
}


const idUserExist = async ( id ) => {

    const existeUser = await User.findById(id)

    if (!existeUser) {
        throw new Error(`The id ${id} doesn't exist`)
        }
}

const validRol = async(rol="") => {
    const existRol = await Rol.findOne({rol})
    if(!existRol){
        throw new Error(`${rol} is not registered in DB`)
    }
}

module.exports = {
    emailExist,
    idUserExist,
    validRol
}