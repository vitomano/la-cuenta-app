const { model, Schema } = require('mongoose')
var Mongoose = require('mongoose');


const reportSchema = Schema({

    mainData:{type:Object},

    palletRef:{type:String, default:"--"},
    
    comments:{type:String, default:"No comments"},

    fruit:{type:String, default:"other"},

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    pallets:{
        type:Array,
        pid: {type:String, require:true},
        images:{type:Array, default: void 0},
        details:{type:Array, default:void 0},
        score:{type:String, default:0},
    },

    formatGr:{type:Number, default:0},

    score:{type:Number, default:0},
    
    date:{
        type: Date,
        require: true,
        default: Date.now
    }

},{ 
    versionKey: false,
    }
)

module.exports = model('Report', reportSchema)