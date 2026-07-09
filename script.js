async function cargarProductos() {

try {

const respuesta = await fetch("./productos.json");

console.log(respuesta);

const productos = await respuesta.json();

console.log(productos);

const lista = document.getElementById("product-list");

lista.innerHTML = "";

productos.forEach(producto => {

const card = `
<div class="col-lg-3 col-md-4 col-sm-6 mb-4">

<div class="card card-product h-100">

<img src="${producto.imagen}" class="card-img-top">

<div class="card-body">

<h6 class="text-secondary">${producto.marca}</h6>

<h5>${producto.nombre}</h5>

<p>Color: ${producto.color}</p>

<p>Tallas: ${producto.tallas.join(", ")}</p>

<p>${producto.disponible ? "🟢 Disponible" : "🔴 Agotado"}</p>

<h4 class="price">$${producto.precio} MXN</h4>

<a
href="https://www.instagram.com/bearfit_mx/"
target="_blank"
class="btn btn-pink w-100">

Ver producto

</a>

</div>

</div>

</div>
`;

lista.insertAdjacentHTML("beforeend", card);

});

} catch (error) {

console.error(error);

}

}

cargarProductos();
