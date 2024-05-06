import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    profileId: { 
        type: String, 
        required: true 
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, 
        required: true
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema)