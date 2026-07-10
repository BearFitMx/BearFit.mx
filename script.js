// =====================================
// BEAR FIT
// SCRIPT V2
// =====================================

let productos = [];
let carrito = [];

// ==========================
// CARGAR PRODUCTOS
// ==========================

async function cargarProductos() {

    try {

        const respuesta = await fetch("./productos.json");

        productos = await respuesta.json();

        const carritoGuardado = localStorage.getItem("bearfit-carrito");

        if (carritoGuardado) {

            carrito = JSON.parse(carritoGuardado);

        }

        mostrarProductos(productos);

        actualizarCarrito();

    } catch (error) {

        console.error("Error cargando productos:", error);

    }

}

// ==========================
// CREAR TARJETA
// ==========================

function crearCard(producto) {

    const esProximamente = producto.categoria === "proximamente";

    let estado = "";

    let boton = "";

    if (esProximamente) {

        estado = `

            <p class="mt-3 text-pink fw-bold">

                Próximamente

            </p>

        `;

        boton = `

            <a

                href="https://www.instagram.com/bearfit_mx/"

                target="_blank"

                class="btn btn-pink w-100">

                Apartar por DM

            </a>

        `;

    }

    else {

        estado = `

            <p class="mt-3">

                ${producto.disponible ? "🟢 Disponible" : "🔴 Agotado"}

            </p>

        `;

        if (producto.disponible) {

            boton = `

                <button

                    class="btn btn-pink w-100"

                    onclick="agregarAlCarrito(${producto.id})">

                    🛒 Agregar al carrito

                </button>

            `;

        }

        else {

            boton = `

                <button

                    class="btn btn-secondary w-100"

                    disabled>

                    Agotado

                </button>

            `;

        }

    }

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

                    <strong>Color:</strong>

                    ${producto.color}

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

// ==========================
// MOSTRAR PRODUCTOS
// ==========================

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

        else if (producto.categoria === "proximamente") {

            if (proximamente) {

                proximamente.insertAdjacentHTML("beforeend", card);

            }

        }

    });

}
// ==========================
// AGREGAR AL CARRITO
// ==========================

function agregarAlCarrito(id) {

    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            tallas: producto.tallas,
            cantidad: 1

        });

    }

    guardarCarrito();

    actualizarCarrito();

}

// ==========================
// GUARDAR CARRITO
// ==========================

function guardarCarrito() {

    localStorage.setItem(

        "bearfit-carrito",

        JSON.stringify(carrito)

    );

}

// ==========================
// ACTUALIZAR CONTADOR
// ==========================

function actualizarCarrito() {

    const contador = document.getElementById("contador-carrito");

    const lista = document.getElementById("lista-carrito");

    const totalTexto = document.getElementById("total-carrito");

    contador.textContent = carrito.reduce(

        (total, item) => total + item.cantidad,

        0

    );

    lista.innerHTML = "";

    if (carrito.length === 0) {

        lista.innerHTML = `

            <p class="carrito-vacio">

                Tu carrito está vacío.

            </p>

        `;

        totalTexto.textContent = "$0 MXN";

        return;

    }

    let total = 0;
        carrito.forEach(item => {

        total += item.precio * item.cantidad;

        lista.insertAdjacentHTML("beforeend", `

            <div class="carrito-item">

                <img
                    src="${item.imagen}"
                    alt="${item.nombre}">

                <div class="carrito-info">

                    <h5>

                        ${item.nombre}

                    </h5>

                    <p>

                        Talla: ${item.tallas.filter(t => t !== "").join(", ")}

                    </p>

                    <p>

                        Cantidad: ${item.cantidad}

                    </p>

                    <p class="carrito-total">

                        $${(item.precio * item.cantidad).toLocaleString()} MXN

                    </p>

                    <button
                        class="btn-eliminar"
                        onclick="eliminarDelCarrito(${item.id})">

                        Eliminar

                    </button>

                </div>

            </div>

        `);

    });

    totalTexto.textContent =
        "$" + total.toLocaleString() + " MXN";

}

// ==========================
// ELIMINAR DEL CARRITO
// ==========================

function eliminarDelCarrito(id) {

    carrito = carrito.filter(

        item => item.id !== id

    );

    guardarCarrito();

    actualizarCarrito();

}
// ==========================
// ABRIR CARRITO
// ==========================

function abrirCarrito() {

    document
        .getElementById("carrito-panel")
        .classList.add("active");

    document
        .getElementById("overlay-carrito")
        .classList.add("active");

}

// ==========================
// CERRAR CARRITO
// ==========================

function cerrarCarrito() {

    document
        .getElementById("carrito-panel")
        .classList.remove("active");

    document
        .getElementById("overlay-carrito")
        .classList.remove("active");

}

// ==========================
// COMPRAR POR DM
// ==========================

function comprarPorDM() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }

    let mensaje =

`Hola 👋

Me gustaría comprar los siguientes productos:

`;

    let total = 0;

    carrito.forEach(item => {

        total += item.precio * item.cantidad;

        mensaje +=

`• ${item.nombre}
  Talla: ${item.tallas.filter(t => t !== "").join(", ")}
  Cantidad: ${item.cantidad}
  Precio: $${(item.precio * item.cantidad).toLocaleString()} MXN

`;

    });

    mensaje +=

`Total: $${total.toLocaleString()} MXN

Muchas gracias.`;

    const url =

`https://www.instagram.com/direct/new/`;

    window.open(url, "_blank");

    setTimeout(() => {

        navigator.clipboard.writeText(mensaje);

        alert(

`Se abrió Instagram.

El mensaje ya fue copiado al portapapeles.

Solo pégalo en el chat de Bear Fit.`);

    }, 1200);

}
// ==========================
// FILTROS
// ==========================

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

// ==========================
// EVENTOS
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    cargarProductos();

    document
        .getElementById("abrir-carrito")
        .addEventListener("click", abrirCarrito);

    document
        .getElementById("cerrar-carrito")
        .addEventListener("click", cerrarCarrito);

    document
        .getElementById("overlay-carrito")
        .addEventListener("click", cerrarCarrito);

    document
        .getElementById("comprar-dm")
        .addEventListener("click", comprarPorDM);

});
// ==========================
// UTILIDADES
// ==========================

function vaciarCarrito() {

    carrito = [];

    guardarCarrito();

    actualizarCarrito();

}

function obtenerTotalCarrito() {

    return carrito.reduce((total, item) => {

        return total + (item.precio * item.cantidad);

    }, 0);

}

function obtenerCantidadCarrito() {

    return carrito.reduce((total, item) => {

        return total + item.cantidad;

    }, 0);

}

// ==========================
// EFECTO DEL CONTADOR
// ==========================

function animarContador() {

    const contador = document.getElementById("contador-carrito");

    contador.classList.add("animate__animated");
    contador.classList.add("animate__pulse");

    setTimeout(() => {

        contador.classList.remove("animate__animated");
        contador.classList.remove("animate__pulse");

    }, 700);

}

// ==========================
// ACTUALIZAR CARRITO
// (Complemento visual)
// ==========================

const actualizarCarritoOriginal = actualizarCarrito;

actualizarCarrito = function () {

    actualizarCarritoOriginal();

    animarContador();

};

// ==========================
// ACCESIBILIDAD
// ==========================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        cerrarCarrito();

    }

});
// ==========================
// MEJORAS FINALES
// ==========================

// Evita seleccionar texto al hacer doble clic
document.addEventListener("selectstart", function (e) {

    if (e.target.closest(".btn")) {

        e.preventDefault();

    }

});

// Cierra el carrito al cambiar el tamaño si queda abierto
window.addEventListener("resize", () => {

    if (window.innerWidth > 768) return;

    cerrarCarrito();

});

// ==========================
// MENSAJE DE BIENVENIDA
// ==========================

console.log("%cBear Fit", "color:#FF6B9D;font-size:22px;font-weight:bold;");
console.log("%cStrong Together 💪", "color:white;font-size:14px;");


// ==========================
// FIN DEL SCRIPT
// ==========================
