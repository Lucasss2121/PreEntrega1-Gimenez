let producto;
let precio;
let agregarProducto;
let precioFinal = 0;

function productos(){
    producto = prompt("Ingrese un producto");
    precio =parseFloat(prompt ("Ingrese el precio del producto"));
    if(!isNaN(precio)){
        precioFinal += precio;
        console.log(producto,precio);
    } else{
        alert("Por favor,ingresar un numero decimal valido");
    }
    agregarProducto = prompt("¿Desea agregar otro producto? si/no").toLowerCase();
}

while(true){
    productos()

    if(agregarProducto !== "si"){
        break
    }
}

console.log("valor total: " + precioFinal)