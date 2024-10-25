const mongoose = require("mongoose")
const connectDB = async () =>{
    try {
        await mongoose.connect (`mongodb+srv://Gayathri:i3sxHT1c7cKYuhJc@cluster0.xo6ax.mongodb.net/mydb`)
        console.log('DB Connected')
    } catch (error) {
        
    }
}

// const productDB = async () =>{
//     try {
//         await mongoose.connect (`mongodb+srv://Gayathri:i3sxHT1c7cKYuhJc@cluster0.xo6ax.mongodb.net/productdb`)
//         console.log('ProductDB Connected')
//     } catch (error) {
        
//     }
// }
module.exports = connectDB;
