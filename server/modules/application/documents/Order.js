import mongoose, {Schema} from 'mongoose'
export const Order = mongoose.model('Order',
    {
        date: String,
        status: {
            type: Boolean,
            default: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });