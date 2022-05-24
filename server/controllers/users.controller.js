const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/users.model');

const { generateJWT } = require("../helpers/generar-jwt");


// Register
const register = async (req, res = response) => {


    const { name, email, password, rol } = req.body

    const user = new User({ name, email, password, rol })

    //Hash Password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    //Generate JWT
    const token = await generateJWT(user._id, user.name)

    res.json({
        ok: true,
        user,
        token
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
                msg: "User / Password not valid"
            })
        }

        //Matched password
        const matched = bcryptjs.compareSync(password, user.password)

        if (!matched) {
            return res.status(400).json({
                ok: false,
                msg: "User / Password not valid"
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id, user.name)

        res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contact Admin"
        })
    }

}


// const userUpdate = async (req, res = response) => {

//     const { id } = req.params
//     const { password, email, ...resto } = req.body
//     const file = req.file

//     if (file) {

//         const { profile } = await User.findOne({ _id: id })

//         resto.profile = results.secure_url

//         await fs.unlink(file.path)
//     }

//     // TODO validar contra DB
//     if (password) {
//         //Hash Password
//         const salt = bcryptjs.genSaltSync()
//         resto.password = bcryptjs.hashSync(password, salt)
//     }

//     const user = resto
//     await User.findByIdAndUpdate(id, user)

//     res.json({
//         ok: true,
//         user
//     })
// }





const meToken = async (req, res = response) => {

    const { uid, name } = req;

    try {
        const user = await User.findById(uid)

        // Generar JWT
        const token = await generateJWT(uid, name);

        res.status(201).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: "Not user found"
        })
    }

}


module.exports = {
    register,
    login,
    // userUpdate,
    meToken
}