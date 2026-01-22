
document.addEventListener("DOMContentLoaded", () => {
    
    // Selectores
    const botonMenu = document.querySelector("#menu-movil"); 
    const enlacesNavegacion = document.querySelector(".enlaces-nav");
    const enlaces = document.querySelectorAll(".enlaces-nav li a");

    // Verificación de seguridad
    if (botonMenu && enlacesNavegacion) {
        
        
        const alternarMenu = () => {
            enlacesNavegacion.classList.toggle("activo"); // Antes "active"
            botonMenu.classList.toggle("abierto");      // Antes "open"
        };

        const cerrarMenu = () => {
            enlacesNavegacion.classList.remove("activo");
            botonMenu.classList.remove("abierto");
        };

        // Escuchador
        botonMenu.addEventListener("click", (evento) => {
            evento.stopPropagation(); 
            alternarMenu();
        });

        
        enlaces.forEach(enlace => {
            enlace.addEventListener("click", cerrarMenu);
        });

       
        document.addEventListener("click", (evento) => {
            const esClicFuera = !enlacesNavegacion.contains(evento.target) && !botonMenu.contains(evento.target);
            
            if (esClicFuera && enlacesNavegacion.classList.contains("activo")) {
                cerrarMenu();
            }
        });
    }
});

