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

function crearCard(producto) {

    const esProximamente = producto.categoria === "proximamente";

    const estado = esProximamente
        ? `
            <p class="mt-3 text-pink fw-bold">
                Próximamente
            </p>
        `
        : `
            <p class="mt-3">
                ${producto.disponible ? "🟢 Disponible" : "🔴 Agotado"}
            </p>
        `;

    const boton = esProximamente
        ? `
            <a href="https://www.instagram.com/bearfit_mx/"
               target="_blank"
               class="btn btn-pink w-100">

                Apartar por DM

            </a>
        `
        : `
            <a href="https://www.instagram.com/bearfit_mx/"
               target="_blank"
               class="btn btn-pink w-100">

                Pedir por DM

            </a>
        `;

    return `

    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

        <div class="card card-product h-100">

            <img
                src="${producto.imagen}"
                class="card-img-top"
                alt="${producto.nombre}">

            <div class="card-body">

                <h6 class="text-secondary">
                    ${producto.marca}
                </h6>

                <h5>
                    ${producto.nombre}
                </h5>

                ${esProximamente ? "" : `
                <p>
                    <strong>Color:</strong> ${producto.color}
                </p>
                `}

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

                ${estado}

                <h4 class="price">

                    $${producto.precio} MXN

                </h4>

                ${boton}

            </div>

        </div>

    </div>

    `;

}

function mostrarProductos(lista) {

    const hombre = document.getElementById("productos-hombre");
    const mujer = document.getElementById("productos-mujer");
    const proximamente = document.getElementById("productos-proximamente");

    hombre.innerHTML = "";
    mujer.innerHTML = "";

    if (proximamente) {
        proximamente.innerHTML = "";
    }

    lista.forEach(producto => {

        const card = crearCard(producto);

        if (producto.categoria === "hombre") {

            hombre.insertAdjacentHTML("beforeend", card);

        }

        else if (producto.categoria === "mujer") {

            mujer.insertAdjacentHTML("beforeend", card);

        }

        else if (producto.categoria === "proximamente" && proximamente) {

            proximamente.insertAdjacentHTML("beforeend", card);

        }

    });

}

function filtrarProductos(tipo, boton) {

    document.querySelectorAll(".filtro-btn").forEach(btn => {

        btn.classList.remove("active");
        btn.classList.remove("btn-pink");
        btn.classList.add("btn-outline-light");

    });

    boton.classList.remove("btn-outline-light");
    boton.classList.add("btn-pink");
    boton.classList.add("active");

    let lista = [];

    if (tipo === "todos") {

        lista = productos;

    }

    else if (tipo === "disponibles") {

        lista = productos.filter(producto => {

            return producto.categoria === "proximamente" || producto.disponible;

        });

    }

    else {

        lista = productos.filter(producto => {

            return producto.categoria === "proximamente" || !producto.disponible;

        });

    }

    mostrarProductos(lista);

}

document.addEventListener("DOMContentLoaded", cargarProductos);
