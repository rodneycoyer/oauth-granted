const mongoose = reauire("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);