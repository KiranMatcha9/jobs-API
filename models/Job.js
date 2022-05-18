const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
    {
        company:{
            type:String,
            required: [true,'please proviode the comany'],
            maxlength: 50
        },
        position:{
            type:String,
            required: [true,'please proviode the position'],
            maxlength: 100
        },
        status:{
            type:String,
            enum:['interview','declined','pending'],
            default:'pending'
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            required:[true,'please provide the user']
        }
    },{timestamps:true}
)

module.exports = mongoose.model('Job',JobSchema)