const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    senderName:{
        type:String,
        minLength:[2,"Name must contain at least 2 characters!"]
    },
    subject:{
        type:String,
        minLength:[2,"Name must contain at least 2 characters!"]
    },
    message:{
        type:String,
        minLength:[2,"Name must contain at least 2 characters!"]
    },
    email:{
        type:String,
       
    },
    createdAt:{
       type:Date,
       default:Date.now()
    },

})

module.exports = mongoose.model("Message",messageSchema )