let productos = [];

async function cargarProductos() {

    try {

        const respuesta = await fetch("./productos.json");
        productos = await respuesta.json();

        mostrarProductos(productos);

    } catch (error) {

        console.error("Error cargando productos:", error);

    }

}

function mostrarProductos(lista) {

    const listaHombre = document.getElementById("productos-hombre");
    const listaMujer = document.getElementById("productos-mujer");

    listaHombre.innerHTML = "";
    listaMujer.innerHTML = "";

    lista.forEach(producto => {

        const card = `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

            <div class="card card-product h-100">

                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">

                <div class="card-body">

                    <h6 class="text-secondary">
                        ${producto.marca}
                    </h6>

                    <h5>
                        ${producto.nombre}
                    </h5>

                    <p>
                        <strong>Color:</strong> ${producto.color}
                    </p>

                    <div class="mt-3">

                        <small class="text-secondary">
                            Tallas
                        </small>

                        <div class="tallas mt-2">

                            <span class="${producto.tallas.includes("S") ? "talla-on" : "talla-off"}">S</span>

                            <span class="${producto.tallas.includes("M") ? "talla-on" : "talla-off"}">M</span>

                            <span class="${producto.tallas.includes("L") ? "talla-on" : "talla-off"}">L</span>

                            <span class="${producto.tallas.includes("XL") ? "talla-on" : "talla-off"}">XL</span>

                        </div>

                    </div>

                    <p class="mt-3">

                        ${producto.disponible ? "🟢 Disponible" : "🔴 Agotado"}

                    </p>

                    <h4 class="price">

                        $${producto.precio} MXN

                    </h4>

                    <a
                        href="https://www.instagram.com/bearfit_mx/"
                        target="_blank"
                        class="btn btn-pink w-100">

                        Pedir por DM

                    </a>

                </div>

            </div>

        </div>
        `;

        if (producto.categoria === "mujer") {

            listaMujer.insertAdjacentHTML("beforeend", card);

        } else {

            listaHombre.insertAdjacentHTML("beforeend", card);

        }

    });

}

function filtrarProductos(tipo, boton) {

    document.querySelectorAll(".filtro-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    boton.classList.add("active");

    let listaFiltrada = [];

    if (tipo === "todos") {

        listaFiltrada = productos;

    }

    if (tipo === "disponibles") {

        listaFiltrada = productos.filter(p => p.disponible);

    }

    if (tipo === "agotados") {

        listaFiltrada = productos.filter(p => !p.disponible);

    }

    mostrarProductos(listaFiltrada);

}

document.addEventListener("DOMContentLoaded", cargarProductos);
