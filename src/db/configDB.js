import mongoose from "mongoose";

const URI = "mongodb+srv://diazmatiasit:04mPWNnIuX5bEsNV@ecommerce.qoflfc4.mongodb.net/dbecommerce?retryWrites=true&w=majority";
mongoose
.connect(URI)
.then(() => console.log("Conectado a la base de datos"))
.catch((error) => console.log(error));