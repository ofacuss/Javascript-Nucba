// Usamos DOMContentLoaded para asegurar que el HTML esté cargado y no de error "null"
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Selectores actualizados al HTML en español
    const botonMenu = document.querySelector("#menu-movil"); 
    const enlacesNavegacion = document.querySelector(".enlaces-nav");
    const enlaces = document.querySelectorAll(".enlaces-nav li a");

    // Verificación de seguridad: solo ejecutar si los elementos existen
    if (botonMenu && enlacesNavegacion) {
        
        // 2. Funciones con clases actualizadas al CSS en español
        const alternarMenu = () => {
            enlacesNavegacion.classList.toggle("activo"); // Antes "active"
            botonMenu.classList.toggle("abierto");      // Antes "open"
        };

        const cerrarMenu = () => {
            enlacesNavegacion.classList.remove("activo");
            botonMenu.classList.remove("abierto");
        };

        // 3. Escuchadores de Eventos
        botonMenu.addEventListener("click", (evento) => {
            evento.stopPropagation(); // Evita que el clic se propague al document
            alternarMenu();
        });

        // Cerrar al clickear un enlace (requisito de buena UX)
        enlaces.forEach(enlace => {
            enlace.addEventListener("click", cerrarMenu);
        });

        // Cerrar al clickear fuera del menú
        document.addEventListener("click", (evento) => {
            const esClicFuera = !enlacesNavegacion.contains(evento.target) && !botonMenu.contains(evento.target);
            
            if (esClicFuera && enlacesNavegacion.classList.contains("activo")) {
                cerrarMenu();
            }
        });
    }
});

