const User = require('../models/users.model')
const Report = require('../models/reports.model')


const emailExist = async ( email = '' ) => {

    const existEmail = await User.findOne({ email })

    if (existEmail) {
        throw new Error(`The email ${email} is already taken`)
        }
}

const idReportExist = async ( id ) => {

    const existeReport = await Report.findById(id)

    if (!existeReport) {
        throw new Error(`The id ${id} doesn't exist`)
        }
}

const idUserExist = async ( id ) => {

    const existeUser = await User.findById(id)

    if (!existeUser) {
        throw new Error(`The id ${id} doesn't exist`)
        }
}

module.exports = {
    emailExist,
    idReportExist,
    idUserExist
}