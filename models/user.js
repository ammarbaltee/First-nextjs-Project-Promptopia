import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    email: {
        type: String,
        //if it is not unique and already exists then give a message, Email already exists!
        unique: [true, 'Email already exist!'],
        //if it is required then give a message, Email is required!
        required: [true, 'Email is required!'],
    },
    userName: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"] 
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;