const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/users.model');

const { generateJWT } = require("../helpers/generar-jwt");


// Register
const register = async (req, res = response) => {

    const { name, lastname, email, password, phone } = req.body

    const user = new User({ name, email, password, lastname, phone })

    //Hash Password
    const salt = await bcryptjs.genSaltSync()
    user.password = await bcryptjs.hashSync(password, salt)

    await user.save()

    //Generate JWT
    const token = await generateJWT(user.id, user.name)

    res.json({
        token,
        ok: true,
        name: user.name,
        lastname: user.lastname,
        uid: user.id,
        profile: user.profile,
        company: user.company
    })
}


// Login
const login = async (req, res = response) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "No user founded"
            })
        }

        //Matched password
        const matched = await bcryptjs.compareSync(password, user.password)

        if (!matched) {
            return res.status(400).json({
                ok: false,
                msg: "Password is not correct"
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id, user.name)

        res.json({
            token,
            ok: true,
            name: user.name,
            lastname: user.lastname,
            uid: user.id,
            profile: user.profile,
            company: user.company
        })
    } catch (error) {
        console.log(error)
    }

}


const userUpdate = async (req, res = response) => {

    const { id } = req.params
    const { password, email, ...resto } = req.body


    // TODO validar contra DB
    if (password) {
        //Hash Password
        const salt = await bcryptjs.genSaltSync()
        resto.password = await bcryptjs.hashSync(password, salt)
    }

    const usuario = resto
    await User.findByIdAndUpdate(id, usuario)

    res.json({
        ok: true,
        usuario,
    })
}


const meToken = async (req, res = response) => {

    const { uid, name } = req;

    const { profile = "", lastname = "", company = "" } = await User.findOne({ _id: uid })

    // Generar JWT
    const token = await generateJWT(uid, name);

    res.status(201).json({
        token,
        ok: true,
        uid,
        name,
        lastname,
        profile,
        company
    })
}


module.exports = {
    register,
    login,
    userUpdate,
    meToken,
}