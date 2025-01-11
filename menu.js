let xmlDoc = null;
let jsonSubmenu = null;

// Cargar el archivo XML
function cargarXML(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "menus.xml", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const parser = new DOMParser();
            xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
            callback();
        } else {
            console.error("Error al cargar el archivo XML.");
        }
    };
    xhr.send();
}

// Cargar el archivo JSON para los submenús
function cargarJSON(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submenu.json", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            jsonSubmenu = JSON.parse(xhr.responseText);
            callback();
        } else {
            console.error("Error al cargar el archivo JSON.");
        }
    };
    xhr.send();
}

// Actualizar menú
function actualizarMenu(lenguaje) {
    if (!xmlDoc || !jsonSubmenu) return;

    const menu = document.getElementById("menu");
    menu.innerHTML = ""; // Limpiar menú

    const items = xmlDoc.querySelectorAll("menu > item");
    items.forEach(item => {
        const texto = item.querySelector(lenguaje)?.textContent;
        const link = item.querySelector("link")?.textContent;

        if (texto && link) {
            const li = document.createElement("li");
            li.classList.add("nav-item");

            // Verificar si el ítem tiene submenú
            const submenu = jsonSubmenu[item.id];
            if (submenu) {
                li.classList.add("dropdown");
                li.innerHTML = `
                    <a class="nav-link dropdown-toggle btn btn-outline-success" href="${link}" role="button" data-bs-toggle="dropdown">${texto}</a>
                    <ul class="dropdown-menu">
                        ${procesarSubmenu(submenu, lenguaje)}
                    </ul>
                `;
            } else {
                li.innerHTML = `<a class="nav-link btn btn-outline-success" href="${link}">${texto}</a>`;
            }

            menu.appendChild(li);
        }
    });
}

// Procesar submenú
function procesarSubmenu(submenu, lenguaje) {
    return submenu
        .map(subitem => {
            const subtexto = subitem[lenguaje];
            const sublink = subitem.link;
            return subtexto && sublink ? `<li><a class="dropdown-item" href="${sublink}">${subtexto}</a></li>` : '';
        })
        .join('');
}

// Actualizar carrusel
function actualizarCarrusel(lenguaje) {
    if (!xmlDoc) return;

    const itemsCarrusel = xmlDoc.querySelectorAll("carrusel > item");
    itemsCarrusel.forEach((item, index) => {
        const id = item.getAttribute("id"); // Obtener ID del item
        const titulo = item.querySelector(`${lenguaje} > titulo`)?.textContent;
        const descripcion = item.querySelector(`${lenguaje} > descripcion`)?.textContent;

        // Identificar si es un video o una imagen
        if (id.startsWith("video")) {
            // Actualizar título y descripción del video
            const tituloVideo = document.getElementById(`titulo-video${index + 1}`);
            const descripcionVideo = document.getElementById(`descripcion-video${index + 1}`);

            if (tituloVideo) tituloVideo.textContent = titulo || "";
            if (descripcionVideo) descripcionVideo.textContent = descripcion || "";
        } else {
            // Actualizar título y descripción de imágenes
            const tituloElemento = document.getElementById(`titulo${index + 1}`);
            const descripcionElemento = document.getElementById(`descripcion${index + 1}`);
            if (tituloElemento) tituloElemento.textContent = titulo || "";
            if (descripcionElemento) descripcionElemento.textContent = descripcion || "";
        }
    });
}

// Actualizar sección de beneficios
function actualizarBeneficios(lenguaje) {
    if (!xmlDoc) return;

    const beneficios = xmlDoc.querySelector(`beneficios > ${lenguaje}`);
    if (!beneficios) return;

    // Actualizar título y descripción principal
    const titulo = beneficios.querySelector("titulo")?.textContent;
    const descripcion = beneficios.querySelector("descripcion")?.textContent;
    document.getElementById("beneficios-titulo").textContent = titulo || "";
    document.getElementById("beneficios-descripcion").textContent = descripcion || "";

    // Actualizar tarjetas
    for (let i = 1; i <= 3; i++) {
        const card = beneficios.querySelector(`card${i}`);
        if (card) {
            const cardTitulo = card.querySelector("titulo")?.textContent;
            const cardDescripcion = card.querySelector("descripcion")?.textContent;
            document.getElementById(`beneficios-card${i}-titulo`).textContent = cardTitulo || "";
            document.getElementById(`beneficios-card${i}-descripcion`).textContent = cardDescripcion || "";
        }
    }
}
//
// Actualizar la sección "¿Listo para empezar?"
function actualizarListo(lenguaje) {
    if (!xmlDoc) return;

    const listo = xmlDoc.querySelector(`listo > ${lenguaje}`);
    if (listo) {
        const titulo = listo.querySelector("titulo")?.textContent;
        const descripcion = listo.querySelector("descripcion")?.textContent;
        const boton = listo.querySelector("boton")?.textContent;

        document.getElementById("listo-titulo").textContent = titulo || "";
        document.getElementById("listo-descripcion").textContent = descripcion || "";
        document.getElementById("listo-boton").textContent = boton || "";
    }
}
// Actualizar la sección "¿Listo para empezar?"
function actualizarFooter(lenguaje) {
    if (!xmlDoc) return;

    const footerTexto = xmlDoc.querySelector(`footer > ${lenguaje}`)?.textContent;
    if (footerTexto) {
        document.getElementById("footer-texto").textContent = footerTexto;
    }
}


// Cambiar idioma y actualizar el contenido
function cambiarLenguaje(lenguaje) {
    if (!xmlDoc || !jsonSubmenu) return;

    // Actualizar menú
    actualizarMenu(lenguaje);

    // Actualizar carrusel
    actualizarCarrusel(lenguaje);

    // Actualizar beneficios
    actualizarBeneficios(lenguaje);

    // Actualizar sección "¿Listo para empezar?"
    actualizarListo(lenguaje);
    
    // Actualizar footer
    actualizarFooter(lenguaje);


    // Actualizar contenido principal
    const Tcontenido = xmlDoc.querySelector(`text[id="Tcontenido"] ${lenguaje}`)?.textContent;
    if (Tcontenido) {
        document.getElementById("Tcontenido").textContent = Tcontenido;
    }
    
}


// Inicializar la página
function inicializarPagina() {
    cargarXML(() => {
        cargarJSON(() => {
            cambiarLenguaje("es"); // Idioma por defecto
        });
    });

    // Manejar evento de cambio de idioma
    document.getElementById("idioma").addEventListener("change", function (event) {
        cambiarLenguaje(event.target.value);
    });
}

// Llamar a la inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarPagina);
