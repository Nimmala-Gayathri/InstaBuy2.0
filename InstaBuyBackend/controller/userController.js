const Product = require('../models/product')

const getProduct = async (req,res) =>{
    try {
        const data = await Product.find({})
        res.status(200).send({
            success: true,
            message :"Data of player",
            data
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            massage : " Internal server error",
            error
        })
    }
}
const postProduct = async (req,res) =>{
    try {
        const {title,description,price,discount,category,image_url} = req.body

        if( !title || !description || !price || !discount || !category || !image_url){
            return res.status(404).send({
                success: true,
                message : "Each field is mandatory to fill"
            })
        }
        await Product({
            title,
            description,
            price,
            discount,
            category,
            image_url
        }).save()
        res.status(200).send({
             success: true,
            message : " Data added successfully!"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            massage : " Internal server error",
            error
        })
    }
}

const editProduct = async(req,res) =>{
    try {
        const productId = req.params.id;
        await Product.updateOne({_id:productId},{$set:req.body})

        res.status(200).send({
            success:true,
            message:"Product updated successfully"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
const deleteProduct = async(req,res) => {
    try {
        const product_id = req.params.id
        // console.log("Product ID to be deleted:", product_id);  

        const deletedProduct = await Product.deleteOne({ _id: product_id });
        // console.log("Deleted Product:", deletedProduct);  

        if (!deletedProduct) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).send({
            success:true,
            message:"Product Deleted successfully"
        })
    } catch (error) {   
        res.status(500).send({
            success :false,
            message :"Internal server error",
            error
        })
        
    }
}

module.exports = {postProduct,getProduct,deleteProduct,editProduct}