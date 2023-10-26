import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:false
    },
    code:{
        type:Number,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
});

export const productsModel = mongoose.model("products", productsSchema);