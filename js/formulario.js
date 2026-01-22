// formulario.js
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formulario-contacto");
    const mensajeExito = document.querySelector("#exito-formulario");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            // 1. Capturar los valores de los campos (usando los nuevos IDs en español)
            const nombre = document.querySelector("#nombre").value.trim();
            const correo = document.querySelector("#correo").value.trim();
            const mensaje = document.querySelector("#mensaje").value.trim();
            
            // 2. Capturar los elementos de error
            const errores = formulario.querySelectorAll(".msj-error");
            errores.forEach(err => err.textContent = ""); // Limpiar errores previos

            let formularioValido = true;

            // 3. Validación del Nombre
            if (nombre.length < 3) {
                mostrarError("#nombre", "El nombre debe tener al menos 3 caracteres.");
                formularioValido = false;
            }

            // 4. Validación del Correo (Regex para 2026)
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(correo)) {
                mostrarError("#correo", "Por favor, ingresa un correo electrónico válido.");
                formularioValido = false;
            }

            // 5. Validación del Mensaje
            if (mensaje.length < 10) {
                mostrarError("#mensaje", "El mensaje es muy corto (mínimo 10 caracteres).");
                formularioValido = false;
            }

            // 6. Envío final
            if (formularioValido) {
                console.log("Datos validados para GameStore 2026:", { nombre, correo, mensaje });
                
                mensajeExito.classList.remove("oculto");
                formulario.reset();

                // Ocultar mensaje de éxito después de 4 segundos
                setTimeout(() => {
                    mensajeExito.classList.add("oculto");
                }, 4000);
            }
        });
    }

    // Función auxiliar para mostrar errores debajo de los inputs
    function mostrarError(selector, mensaje) {
        const elemento = document.querySelector(selector);
        const contenedorPadre = elemento.closest(".control-formulario");
        const smallError = contenedorPadre.querySelector(".msj-error");
        if (smallError) {
            smallError.textContent = mensaje;
        }
    }
});
