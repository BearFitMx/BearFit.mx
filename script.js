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
    const listaProximamente = document.getElementById("productos-proximamente");

    listaHombre.innerHTML = "";
    listaMujer.innerHTML = "";
    listaProximamente.innerHTML = "";

    lista.forEach(producto => {

        let estado = "";
        let boton = "";

        if (producto.categoria === "proximamente") {

            estado = `
                <p class="mt-3 text-pink fw-bold">
                    Próximamente
                </p>
            `;

            boton = `
                <a href="https://www.instagram.com/bearfit_mx/"
                   target="_blank"
                   class="btn btn-pink w-100">

                    Apartar por DM

                </a>
            `;

        } else {

            estado = `
                <p class="mt-3">

                    ${producto.disponible ? "🟢 Disponible" : "🔴 Agotado"}

                </p>
            `;

            boton = `
                <a href="https://www.instagram.com/bearfit_mx/"
                   target="_blank"
                   class="btn btn-pink w-100">

                    Pedir por DM

                </a>
            `;

        }

        const card = `

        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

            <div class="card card-product h-100">

                <img src="${producto.imagen}"
                     class="card-img-top"
                     alt="${producto.nombre}">

                <div class="card-body">

                    <h6 class="text-secondary">

                        ${producto.marca}

                    </h6>

                    <h5>

                        ${producto.nombre}

                    </h5>

                    <p>

                        <strong>Color:</strong>

                        ${producto.color}

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

                    ${estado}

                    <h4 class="price">

                        $${producto.precio} MXN

                    </h4>

                    ${boton}

                </div>

            </div>

        </div>

        `;

        if (producto.categoria === "hombre") {

            listaHombre.insertAdjacentHTML("beforeend", card);

        } else if (producto.categoria === "mujer") {

            listaMujer.insertAdjacentHTML("beforeend", card);

        } else if (producto.categoria === "proximamente") {

            listaProximamente.insertAdjacentHTML("beforeend", card);

        }

    });
function filtrarProductos(tipo, boton) {

    document.querySelectorAll(".filtro-btn").forEach(btn => {

        btn.classList.remove("active");
        btn.classList.remove("btn-pink");
        btn.classList.add("btn-outline-light");

    });

    boton.classList.remove("btn-outline-light");
    boton.classList.add("btn-pink");
    boton.classList.add("active");

    let listaFiltrada = [];

    if (tipo === "todos") {

        listaFiltrada = productos.filter(
            p => p.categoria !== "proximamente"
        );

    } else if (tipo === "disponibles") {

        listaFiltrada = productos.filter(
            p => p.categoria !== "proximamente" && p.disponible
        );

    } else {

        listaFiltrada = productos.filter(
            p => p.categoria !== "proximamente" && !p.disponible
        );

    }

    mostrarProductos([
        ...listaFiltrada,
        ...productos.filter(p => p.categoria === "proximamente")
    ]);

}

document.addEventListener("DOMContentLoaded", cargarProductos);
