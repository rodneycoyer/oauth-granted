const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        default: "",
        required: true
    },
    lastname: {
        type: String,
        default: "",
        required: true
    },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema)