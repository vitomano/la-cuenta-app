const {model, Schema} = require('mongoose')

const RolSchema = Schema({

    rol:{
        type: String,
        required: [true, 'Rol is required']
    }
})


module.exports = model('Role', RolSchema)