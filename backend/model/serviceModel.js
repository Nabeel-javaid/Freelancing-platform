import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema({

    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    tags:{
        type: [String],
        require:true
    }

},
{timestamps:true}
)

const Service = mongoose.model('Service', serviceSchema);
export default Service;