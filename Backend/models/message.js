const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    senderName:{
        type:String,
     
    },
    subject:{
        type:String,
        
    },
    message:{
        type:String,
       
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
