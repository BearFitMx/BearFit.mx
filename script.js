fetch("productos.json")
.then(res => res.json())
.then(productos => {

const lista = document.getElementById("product-list");

productos.forEach(producto => {

lista.innerHTML += `

<div class="col-lg-3 col-md-4 col-sm-6 mb-4">

<div class="card-product">

<img src="${producto.imagen}" alt="${producto.nombre}">

<div class="card-body">

<h6 class="text-secondary mb-1">
${producto.marca}
</h6>

<h5 class="fw-bold">
${producto.nombre}
</h5>

<p class="mb-2">
Color: ${producto.color}
</p>

<p class="mb-2">
Tallas: ${producto.tallas.join(" · ")}
</p>

<p class="mb-2">
${producto.disponible ? "🟢 Disponible" : "🔴 Agotado"}
</p>

<div class="price mb-3">

$${producto.precio} MXN

</div>

<a
class="btn btn-pink w-100"
target="_blank"
href="https://www.instagram.com/bearfit_mx/">

Ver producto

</a>

</div>

</div>

</div>

`;

});

});
