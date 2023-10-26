import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productManager } from "./dao/ManagersFS/ProductManager.js";
import { messagesManager } from "./dao/ManagersDB/MessagesManagerDB.js";

//db connection
import "./db/configDB.js";

const app = express()
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

//routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/views", viewsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al servidor ${PORT}`);
})

const socketServer = new Server(httpServer)
const messages = []

// Connection - Disconnect
socketServer.on("connection", async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    socket.emit("welcome", "Welcome to admin panel");
    const allProducts = await productManager.getProducts();

    socket.emit("productsInitial", allProducts);

    socket.on("addProduct", async (product) => {
        const producto = await productManager.addProduct(product)
        const listUpdated = await productManager.getProducts();
    socket.emit("listUpdated", listUpdated);

    });

    socket.on("deleteProduct", async (idDelete) => {
    const producto = await productManager.deleteProduct(+idDelete);
    const listUpdated = await productManager.getProducts();
    socket.emit("productDeleted", listUpdated);
    });


    socket.on("newUser", (user) => {
        socket.broadcast.emit("userConnected", user);
    });

    socket.on("message", (infoMessage) => {
        messages.push(infoMessage)
        socketServer.emit("chat", messages)
    });

    socket.on("message", async(infoMessage) => {
        await messagesManager.createOne(infoMessage);
        const allMessages = await messagesManager.findAll()
        socketServer.emit("chat", allMessages)
    });

    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
})