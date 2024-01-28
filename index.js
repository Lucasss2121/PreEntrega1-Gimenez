// const PRODUCTOS = [
//     {id:1, nombre: "ZOMBIE HANDS T-SHIRT", precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/products/BMTH_ZombieHandsTee.png?v=1668702843&width=500"},
//     {id:2, nombre: "GLOBE WHITE T-SHIRT", precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/products/GlobeWhiteFront.png?v=1641317209&width=500"},
//     {id:3, nombre: "BARBED WIRED T-SHIRT", precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/products/BarbedHexWhiteFront.png?v=1641313796&width=500"},
//     {id:4, nombre: "KOOL AID HOODIE" , precio: 25980, image: "https://shop.bmthofficial.com/cdn/shop/files/BMTH---Koolaid-text-black-Hoodie-Front.png?v=1704379094&width=500"}
// ];

let carrito = [];

function cargarCarritoLocalStorage() {
    const CARRITO_GUARDADO = localStorage.getItem('carrito');
    carrito = CARRITO_GUARDADO ? JSON.parse(CARRITO_GUARDADO) : [];
    actualizarCarrito();
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarProductos(){
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(dato => {
            const CONTENEDOR_PRODUCTO = document.getElementById("cards");
            CONTENEDOR_PRODUCTO.innerHTML = "";
        
            dato.forEach(({ id, nombre, precio, image }) => {
                const CARD_PRODUCTOS = document.createElement("div");
                CARD_PRODUCTOS.classList.add("card");
                CARD_PRODUCTOS.innerHTML = `
                    <img src="${image}" alt="${image}">
                    <h5>${nombre}</h5>
                    <p>$${precio.toFixed(2)}</p>
                    <button onclick="agregarAlCarrito(${id})">Agregar al carrito</button>
                `;
                CONTENEDOR_PRODUCTO.appendChild(CARD_PRODUCTOS);
            });
            
            cargarCarritoLocalStorage();
        })
        .catch(error => console.log(error));
}   

function agregarAlCarrito(idProducto)  {
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(dato => {
            const PRODUCTO_SELECCIONADO = dato.find(({id}) => id === idProducto);
        
            if(PRODUCTO_SELECCIONADO){
                carrito.push(PRODUCTO_SELECCIONADO);
                actualizarCarrito();
                guardarCarritoLocalStorage();
        
                Toastify({
                    text: `${PRODUCTO_SELECCIONADO.nombre} se agrego al carrito`,
                    duration: 950,
                    gravity: "top",
                    position: "right",
                    // backgroundColor: "#FF0000",
                    backgroundColor: "linear-gradient(to right, #FF5858, #FF4242)",
                    style: {
                        filter: "brightness(80%)",
                    }
                }).showToast();
            }

        })
        .catch(error => console.log(error));
}

function eliminarDelCarrito(idProducto) {
    const INDEX = carrito.findIndex(({id}) => id === idProducto);
    if (INDEX !== -1) {
        const PRODUCTO_ELIMINADO = carrito.splice(INDEX, 1)[0];
        actualizarCarrito();
        guardarCarritoLocalStorage();

        Toastify({
            text: `Se elimino ${PRODUCTO_ELIMINADO .nombre}`,
            duration: 950,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #D9534F, #C9302C)",
            style: {
                filter: "brightness(100%)",
            }
        }).showToast();

    }
}

function actualizarCarrito(){
    const CONTENIDO_CARRITO = document.getElementById("agregarCarrito");
    CONTENIDO_CARRITO.innerHTML = "";

    carrito.forEach(({id, nombre, precio, image}) => {
        const CARD_CARRITO = document.createElement("div");
        CARD_CARRITO.classList.add("card");
        CARD_CARRITO.innerHTML = `
                    <img src="${image}" alt="${image}">
                    <h4>${nombre}</h4>
                    <p>$${precio.toFixed(2)}</p>
                    <button onclick="eliminarDelCarrito(${id})">Eliminar</button>
        `;
        CONTENIDO_CARRITO.appendChild(CARD_CARRITO);
    })
    sumarPrecio();
}

function sumarPrecio(){
    const TOTAL_ELEMENT = document.getElementById("precioFinal");
    const TOTAL = carrito.reduce((acc, {precio}) => acc+ precio, 0)
    TOTAL_ELEMENT.innerHTML = `<p> total: $${TOTAL.toFixed(2)}`;
}

mostrarProductos()