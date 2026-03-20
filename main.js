/**
 * PROYECTO: NBA Dynamic Hub
 */

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const menu = document.getElementById("menu");

    // 1. ESTRUCTURA DE DATOS: Array de objetos (Jugadores)
    const jugadores = [
        { nombre: "LeBron James", equipo: "LA Lakers", pos: "Alero", puntos: 27.2 },
        { nombre: "Stephen Curry", equipo: "GS Warriors", pos: "Base", puntos: 24.8 },
        { nombre: "Kevin Durant", equipo: "PHX Suns", pos: "Alero", puntos: 27.3 },
        { nombre: "Luka Doncic", equipo: "DAL Mavericks", pos: "Base", puntos: 28.7 }
    ];

    // 2. ESTRUCTURA DE DATOS: Map para la navegación
    const secciones = new Map([
        ["inicio", "Bienvenidos a la NBA"],
        ["jugadores", "Estadísticas Reales"],
        ["multimedia", "Mejores Jugadas"],
        ["contacto", "Tu Voto Cuenta"]
    ]);

    // --- GENERACIÓN DEL MENÚ (Uso de bucle FOR...OF) ---
    for (const [id, titulo] of secciones) {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" data-section="${id}">${id.toUpperCase()}</a>`;
        menu.appendChild(li);
    }

    // --- FUNCIÓN PRINCIPAL DE RENDERIZADO (Uso de SWITCH) ---
    function navegar(seccionId) {
        app.innerHTML = ""; // Limpiar contenido actual

        switch (seccionId) {
            case "inicio":
                renderInicio();
                break;
            case "jugadores":
                renderJugadores();
                break;
            case "multimedia":
                renderMultimedia();
                break;
            case "contacto":
                renderContacto();
                break;
            default:
                app.innerHTML = "<h1>404 - Sección no encontrada</h1>";
        }
    }

    // --- FUNCIONES DE "PINTADO" (Mínimo HTML en origen) ---

    function renderInicio() {
        const content = `
            <h1>Los Mejores del Basketball</h1>
            <p>Explora la historia y estadísticas de las leyendas vivas.</p>
            <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop" alt="Cancha">
        `;
        app.innerHTML = content;
    }

    function renderJugadores() {
        let tablaHTML = `<h2>Estadísticas</h2>
                         <table>
                            <thead>
                                <tr><th>Nombre</th><th>Equipo</th><th>Posición</th><th>PPG</th></tr>
                            </thead>
                            <tbody>`;
        
        // Uso de bucle FOR para recorrer el ARRAY
        for (let i = 0; i < jugadores.length; i++) {
            tablaHTML += `
                <tr>
                    <td>${jugadores[i].nombre}</td>
                    <td>${jugadores[i].equipo}</td>
                    <td>${jugadores[i].pos}</td>
                    <td>${jugadores[i].puntos}</td>
                </tr>`;
        }
        
        tablaHTML += `</tbody></table>`;
        app.innerHTML = tablaHTML;
    }

    function renderMultimedia() {
        app.innerHTML = `
            <h2>Highlights</h2>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/Y9uHYYftdV0" frameborder="0" allowfullscreen></iframe>
        `;
    }

    function renderContacto() {
        app.innerHTML = `
            <h2>Vota por tu MVP</h2>
            <form id="votoForm">
                <input type="text" id="nombre" placeholder="Tu nombre" required><br><br>
                <select id="jugador_favorito"></select><br><br>
                <button type="submit">Enviar Voto</button>
            </form>
        `;

        // Llenar el select dinámicamente usando WHILE (Requisito)
        const select = document.getElementById("jugador_favorito");
        let count = 0;
        while (count < jugadores.length) {
            const opt = document.createElement("option");
            opt.value = jugadores[count].nombre;
            opt.textContent = jugadores[count].nombre;
            select.appendChild(opt);
            count++;
        }

        // Manejo del formulario con IF
        document.getElementById("votoForm").onsubmit = (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value;
            if (nombre.length > 2) {
                alert(`¡Gracias ${nombre}! Voto registrado.`);
            } else {
                alert("Por favor, introduce un nombre válido.");
            }
        };
    }

    // --- GESTIÓN DE EVENTOS (Navegación sin recarga) ---
    menu.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            e.preventDefault();
            const seccionDestino = e.target.getAttribute("data-section");
            navegar(seccionDestino);
        }
    });

    // Carga inicial
    navegar("inicio");

    // Actualizar el año en el footer automáticamente
const yearSpan = document.getElementById("year-counter");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
});
