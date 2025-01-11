
i18next.init({
    lng: 'es', 
    resources: {
        es: {
            translation: {
                "Ititulo1": "Descripción de la encuesta sobre destinos turísticos",
                "Iparrafo1": "La Encuesta sobre Destinos Turísticos tiene como objetivo principal conocer las preferencias y experiencias de los viajeros en relación con diferentes destinos turísticos...",
                "Ititulo2": "Importancia de compartir opiniones",
                "Iparrafo2": "Compartir opiniones sobre los destinos turísticos es una práctica fundamental tanto para quienes desean descubrir nuevos lugares como para quienes buscan mejorar sus experiencias...",
                "Ititulo3": "Propósito de la encuesta",
                "Iparrafo3": "El propósito principal de la encuesta es recoger información genuina y relevante para mejorar los servicios turísticos...",
                "ipregunta": "Preguntas frecuentes",
                "ipregunta1": "¿Quién puede participar en la encuesta?",
                "inipregunta3": "La encuesta es breve y se puede completar en aproximadamente 5-10 minutos.",
                "inipregunta4": "¿Mis respuestas son confidenciales?",
                "inipregunta5": "Sí, todas las respuestas se mantienen confidenciales...",
                "inipregunta6": "¿Cómo se utilizarán los resultados de la encuesta?",
                "inipregunta7": "Los resultados ayudarán a mejorar la calidad del turismo..."
            }
        },
        en: {
            translation: {
                "Ititulo1": "Description of the survey on tourist destinations",
                "Iparrafo1": "The Tourist Destinations Survey aims to know the preferences and experiences of travelers regarding different tourist destinations...",
                "Ititulo2": "Importance of sharing opinions",
                "Iparrafo2": "Sharing opinions about tourist destinations is essential for those who want to discover new places or improve their travel experiences...",
                "Ititulo3": "Purpose of the survey",
                "Iparrafo3": "The main purpose of the survey is to collect genuine and relevant information to improve tourism services...",
                "ipregunta": "Frequently Asked Questions",
                "ipregunta1": "Who can participate in the survey?",
                "inipregunta3": "The survey is short and can be completed in about 5-10 minutes.",
                "inipregunta4": "Are my responses confidential?",
                "inipregunta5": "Yes, all responses are kept confidential...",
                "inipregunta6": "How will the survey results be used?",
                "inipregunta7": "The results will help improve the quality of tourism..."
            }
            
        }
    }
});

// Función para actualizar el contenido según el idioma seleccionado
function actualizarContenido() {
    // Actualizar los textos
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
        const key = element.getAttribute("data-i18n");
        element.innerText = i18next.t(key);
    });
}

// Cambiar idioma
document.getElementById('idioma').addEventListener('change', function(event) {
    const idioma = event.target.value;
    i18next.changeLanguage(idioma, function() {
        actualizarContenido(); // Actualizar el contenido al cambiar de idioma
    });
});

// Inicializar el contenido al cargar la página
window.onload = function() {
    actualizarContenido(); // Inicializar el contenido con el idioma por defecto (español)
};
