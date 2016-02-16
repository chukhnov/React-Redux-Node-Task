import mongoose, {Schema} from 'mongoose'
export const Order = mongoose.model('Order',
    {
        date: String,
        status: {
            type: Boolean,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });