document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INICIALIZAR ANIMACIONES DE SCROLL (AOS)
    AOS.init({
        once: true,
        offset: 80, 
        duration: 800
    });

    // 2. SISTEMA DE MULTI-IDIOMA
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('.translatable');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedLang = btn.getAttribute('data-lang');

            translatableElements.forEach(el => {
                const newText = el.getAttribute(`data-${selectedLang}`);
                if (newText) {
                    el.innerHTML = newText;
                }
            });
        });
    });

    // 3. EFECTO DEL MENÚ AL HACER SCROLL
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 17, 32, 0.98)';
            navbar.style.padding = '10px 50px';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(11, 17, 32, 0.85)';
            navbar.style.padding = '15px 50px';
            navbar.style.boxShadow = 'none';
        }
    });
});

// ========================================================
//   LÓGICA DEL MODAL (STAFF TÉCNICO)
// ========================================================

const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');

// Función que se ejecuta al hacer click en una tarjeta de Staff
function abrirModal(elemento) {
    // 1. Extraemos los datos de la tarjeta clickeada
    const mediaHTML = elemento.querySelector('.staff-media').outerHTML;
    const nombre = elemento.querySelector('h3').innerText;
    const puesto = elemento.querySelector('h4').innerText;
    const detallesHTML = elemento.querySelector('.staff-detalles').innerHTML;

    // 2. Construimos el contenido del Modal
    modalBody.innerHTML = `
        <div class="modal-header-dinamico">
            ${mediaHTML}
            <div>
                <h3 style="font-size: 24px; color: #fff; margin-bottom: 5px;">${nombre}</h3>
                <h4 style="color: #10b981; font-weight: normal;">${puesto}</h4>
            </div>
        </div>
        <div class="modal-info-dinamico">
            ${detallesHTML}
        </div>
    `;

    // 3. Mostramos el modal
    modalOverlay.classList.add('active');
    
    // Evitar que el body haga scroll mientras el modal está abierto
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function cerrarModal() {
    modalOverlay.classList.remove('active');
    
    // Restaurar el scroll de la página
    document.body.style.overflow = 'auto';
    
    // Opcional: limpiar el contenido tras la animación para que los videos se paren
    setTimeout(() => {
        modalBody.innerHTML = '';
    }, 300);
}

// Cerrar con la tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modalOverlay.classList.contains('active')) {
        cerrarModal();
    }
});