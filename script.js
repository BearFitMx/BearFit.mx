async function cargarProductos() {

    try {

        const respuesta = await fetch("./productos.json");
        const productos = await respuesta.json();

        const listaHombre = document.getElementById("productos-hombre");
        const listaMujer = document.getElementById("productos-mujer");

        listaHombre.innerHTML = "";
        listaMujer.innerHTML = "";

        productos.forEach(producto => {

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
                                Color: ${producto.color}
                            </p>

                            <p>
                                Tallas: ${producto.tallas.join(", ")}
                            </p>

                            <p>
                                ${producto.disponible ? "🟢 Disponible" : "🔴 Agotado"}
                            </p>

                            <h4 class="price">
                                $${producto.precio} MXN
                            </h4>

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

            if (producto.categoria === "mujer") {

                listaMujer.insertAdjacentHTML("beforeend", card);

            } else {

                listaHombre.insertAdjacentHTML("beforeend", card);

            }

        });

    } catch (error) {

        console.error(error);

    }

}

cargarProductos();
