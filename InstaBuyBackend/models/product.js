const mongoose = require("mongoose")

const Product = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    price:{
        type : String,
        required : true
    }, 
    discount:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    },
    image_url:{
        type : String,
        required : true
    },
})
module.exports = mongoose.model("Product",Product)
