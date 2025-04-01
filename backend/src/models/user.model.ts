import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLenght: 6 },
    profilePic: { type: String, default: "" },
    gender: { type: String, default: "" },
    description: { type: String, default: "" },
    age: { type: Number, default: null },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;