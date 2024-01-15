const PRODUCTOS = [
    {id:1, nombre: "ZOMBIE HANDS T-SHIRT", precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/products/BMTH_ZombieHandsTee.png?v=1668702843&width=500"},
    {id:2, nombre: "GLOBE WHITE T-SHIRT", precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/products/GlobeWhiteFront.png?v=1641317209&width=500"},
    {id:3, nombre: "BARBED WIRED T-SHIRT", precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/products/BarbedHexWhiteFront.png?v=1641313796&width=500"},
    {id:4, nombre: "KOOL AID HOODIE" , precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/files/BMTH---Koolaid-text-black-Hoodie-Front.png?v=1704379094&width=500"}
];

let CARRITO = [];

function cargarCarritoLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        CARRITO = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(CARRITO));
}

function mostrarProductos(){
    const contenedorProducto = document.getElementById("cards");
    contenedorProducto.innerHTML = "";

    PRODUCTOS.forEach(producto => {
        const cardProductos = document.createElement("div");
        cardProductos.classList.add("card");
        cardProductos.innerHTML = `
                    <img src="${producto.image}" alt="${producto.image}">
                    <h5>${producto.nombre}</h5>
                    <p>$${producto.precio.toFixed(2)}</p>
                    <button onclick ="agregarAlCarrito(${producto.id})">Agregar al carrito</button
        `;
        contenedorProducto.appendChild(cardProductos);
    });

    cargarCarritoLocalStorage();
}   

function agregarAlCarrito(idProducto)  {
    const productoSeleccionado = PRODUCTOS.find(producto => producto.id === idProducto);

    if(productoSeleccionado){
        CARRITO.push(productoSeleccionado);
        actualizarCarrito();
        guardarCarritoLocalStorage();
    }
}

function eliminarDelCarrito(idProducto) {
    CARRITO = CARRITO.filter(producto => producto.id !== idProducto);
    actualizarCarrito();
    guardarCarritoLocalStorage();
}

function actualizarCarrito(){
    const contenidoCarrito = document.getElementById("agregarCarrito");
    contenidoCarrito.innerHTML = "";

    CARRITO.forEach(producto =>{
        const cardCarrito = document.createElement("div");
        cardCarrito.classList.add("card");
        cardCarrito.innerHTML = `
                    <img src="${producto.image}" alt="${producto.image}">
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio.toFixed(2)}</p>
                    <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        contenidoCarrito.appendChild(cardCarrito);
    })
    sumarPrecio();
}

function sumarPrecio(){
    const totalElement = document.getElementById("precioFinal");
    const total = CARRITO.reduce((acc, producto) => acc+ producto.precio,0)
    totalElement.innerHTML = `<p> total: $${total}`;
}

mostrarProductos()