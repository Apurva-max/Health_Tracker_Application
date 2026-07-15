import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
            trim: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            trim: true,
        },

        password: {
            required: true,
            unique: true,
            type: String,
        },
    },
{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;