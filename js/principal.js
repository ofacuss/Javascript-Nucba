// 1. SELECCIÓN DE ELEMENTOS (IDs actualizados al español)
const contenedorProductos = document.querySelector("#productos");
const modalCarrito = document.querySelector("#modal-carrito");
const iconoCarrito = document.querySelector(".icono-carrito");
const contenedorCarrito = document.querySelector("#items-carrito");
const precioTotal = document.querySelector("#precio-total");
const botonFinalizar = document.querySelector("#boton-finalizar"); // Coincide con el HTML
const botonesFiltro = document.querySelectorAll(".boton-filtro");

// 2. ESTADO DEL CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito_2026")) || [];

// 3. FUNCIONES DE PERSISTENCIA
const guardarLocalStorage = () => {
    localStorage.setItem("carrito_2026", JSON.stringify(carrito));
};

const actualizarContadorCarrito = () => {
    const contador = document.querySelector("#contador-carrito");
    if (contador) {
        const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.textContent = totalArticulos;
    }
};

// 4. RENDERIZADO (Usando clases del CSS en español)
const renderizarProductos = (listaProductos) => {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = listaProductos.map(producto => `
        <div class="tarjeta-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="tarjeta-info">
                <h3>${producto.nombre}</h3>
                <p class="categoria">${producto.categoria.toUpperCase()}</p>
                <span class="precio">$${producto.precio}</span>
                <button class="boton-agregar" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        </div>
    `).join("");
};

const renderizarCarrito = () => {
    if (!contenedorCarrito) return;
    if (!carrito.length) {
        contenedorCarrito.innerHTML = `<p class="vacio-msj">Tu carrito está vacío.</p>`;
        precioTotal.innerText = "0";
        return;
    }

    contenedorCarrito.innerHTML = carrito.map(item => `
        <div class="item-carrito">
            <div class="item-info">
                <h4>${item.nombre}</h4>
                <p>${item.cantidad} x $${item.precio}</p>
            </div>
        </div>
    `).join("");

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    precioTotal.innerText = total.toFixed(2);
};

// 5. LÓGICA
const alternarCarrito = () => modalCarrito?.classList.toggle("oculto");

const agregarAlCarrito = (evento) => {
    if (!evento.target.classList.contains("boton-agregar")) return;
    
    const id = parseInt(evento.target.dataset.id);
    const producto = datosProductos.find(p => p.id === id);
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarLocalStorage();
    renderizarCarrito();
    actualizarContadorCarrito();
};

// 7. FINALIZAR COMPRA (Corregido con validación if)
if (botonFinalizar) {
    botonFinalizar.addEventListener("click", () => {
        if (!carrito.length) return alert("¡El carrito está vacío!");
        
        if (confirm("¿Deseas confirmar tu compra de videojuegos?")) {
            alert("¡Gracias por tu compra! Te enviaremos los códigos por mail.");
            carrito = [];
            guardarLocalStorage();
            renderizarCarrito();
            actualizarContadorCarrito();
            alternarCarrito();
        }
    });
}

// 8. EVENT LISTENERS
iconoCarrito?.addEventListener("click", alternarCarrito);
contenedorProductos?.addEventListener("click", agregarAlCarrito);

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const cat = e.target.dataset.categoria;
        botonesFiltro.forEach(b => b.classList.remove("activo"));
        e.target.classList.add("activo");

        const filtrados = cat === "todos" ? datosProductos : datosProductos.filter(p => p.categoria === cat);
        renderizarProductos(filtrados);
    });
});

// ARRANQUE
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(datosProductos);
    renderizarCarrito();
    actualizarContadorCarrito();
});
