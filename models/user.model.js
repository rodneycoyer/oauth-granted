const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;