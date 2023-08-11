import mongoose from 'mongoose'

const serviceOrderSchema = mongoose.Schema({

    serviceid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    buyerid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    response:{
        type: String,
    },
    status:{
        type: String,
        require:true
    }

},
{timestamps:true}
)

const ServiceOrder = mongoose.model('Service Order', serviceOrderSchema);
export default ServiceOrder;