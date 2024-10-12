import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        classNumber: {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);
export default User;