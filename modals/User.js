const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModel = new Schema({
    FirstName : {
        type : String,
        trim : true,
        required : true
    },

    LastName : {
        type : String,
        trim : true,
        required : true
    },

    Email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },

    ContactNo : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },

    ProfilePhoto : {
        type : String,
        trim : true,
        required : true
    },

    Password : {
        type : String,
        required:true
    },

    isEmailVerified : {
        type : Boolean,
        default : false
    },

    isContactNoVerified : {
        type : Boolean,
        default : false
    },

    Access : {
        type : Array,
        default : []
    }
});

module.exports = mongoose.model("Users", UserModel);