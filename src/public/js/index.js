document.addEventListener('DOMContentLoaded', function() {
const socketClient = io();

const form = document.getElementById("form")
const inputTitle = document.getElementById("title")
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputThumbnail = document.getElementById("thumbnail");
const formDelete = document.getElementById("formDelete");
const inputIdDelete = document.getElementById("idDelete");

const updatedProducts = (products) => {
    let divRealTimeProduct = document.getElementById("divRealTimeProduct");
  
    let html = "";
  
    products.forEach((product) => {
      html += `
               
                <h3>titulo: ${product.title}</h3>
                <p>descripcion: ${product.description}</p>
                <p>precio: ${product.price}</p>
                <p>codigo: ${product.code}</p>
                <p>categoria: ${product.category}</p>
                <p>stock: ${product.stock}</p>
                <p>thumbnails: ${product.thumbnails}</p>
                <p>id: ${product.id}</p>
                <br></br>
        
            `;
      divRealTimeProduct.innerHTML = html;
    });
  };

  socketClient.on("productsInitial", (products) => {
    updatedProducts(products);
  });

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    const thumbnail = inputThumbnail.value;

    socketClient.emit("addProduct", {
        title,
        description,
        status,
        price,
        code,
        stock,
        category,
        thumbnail,
      });

};

socketClient.on("listUpdated", (products) => {
    updatedProducts(products);
  });

formDelete.onsubmit = (e) => {
e.preventDefault();
    const idDelete = inputIdDelete.value;
    socketClient.emit("deleteProduct", idDelete);
};
  
socketClient.on("productDeleted", (products) => {
    updatedProducts(products);
});

socketClient.on("welcome", (message) => {
    alert(message);
})
});
