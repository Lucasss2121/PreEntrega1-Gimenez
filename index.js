let productos = [];
let precioFinal = 0;

function Productos(nombre,precio){
    this.nombre = nombre;
    this.precio = precio;
}

function agregarProducto(){
    let productoNombre = prompt("Ingrese un producto");
    let precioProducto =parseFloat(prompt ("Ingrese el precio del producto"));
    
    if(!isNaN(precioProducto)){
        let nuevoProducto = new Productos(productoNombre, precioProducto);

        productos.push(nuevoProducto);
        precioFinal += precioProducto;
        console.log(nuevoProducto);
    } else{
        alert("Por favor,ingresar un numero decimal valido");
    }
}

while(true){
    agregarProducto();
    
    let agregarMas = prompt("¿Desea agregar otro producto? si/no").toLowerCase();
    if(agregarMas !== "si"){
        break
    }
}

console.log("valor total: " + precioFinal);