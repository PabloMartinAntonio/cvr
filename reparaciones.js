// reparaciones.js - Funcionalidad para la página de reparaciones
// Manejo de temas, dropdown, modales y WhatsApp

document.addEventListener('DOMContentLoaded', function() {
    // ========== SISTEMA DE TEMAS ==========
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    } else {
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // Cambio de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                if (themeIcon) {
                    themeIcon.className = 'fas fa-moon';
                }
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                if (themeIcon) {
                    themeIcon.className = 'fas fa-sun';
                }
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ========== DROPDOWN MENU ==========
    const dropdownNav = document.querySelector('.dropdown-nav');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');

    if (dropdownNav && dropdownBtn && dropdownContent) {
        // Hover effects para desktop
        dropdownNav.addEventListener('mouseenter', function() {
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
            dropdownContent.style.transform = 'translateY(0)';
            if (dropdownArrow) {
                dropdownArrow.style.transform = 'rotate(180deg)';
            }
        });

        dropdownNav.addEventListener('mouseleave', function() {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.visibility = 'hidden';
            dropdownContent.style.transform = 'translateY(-10px)';
            if (dropdownArrow) {
                dropdownArrow.style.transform = 'rotate(0deg)';
            }
        });

        // Click para móviles
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = dropdownContent.style.opacity === '1';
            
            if (isOpen) {
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.transform = 'translateY(-10px)';
                if (dropdownArrow) {
                    dropdownArrow.style.transform = 'rotate(0deg)';
                }
            } else {
                dropdownContent.style.opacity = '1';
                dropdownContent.style.visibility = 'visible';
                dropdownContent.style.transform = 'translateY(0)';
                if (dropdownArrow) {
                    dropdownArrow.style.transform = 'rotate(180deg)';
                }
            }
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!dropdownNav.contains(e.target)) {
                dropdownContent.style.opacity = '0';
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.transform = 'translateY(-10px)';
                if (dropdownArrow) {
                    dropdownArrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // ========== ANIMACIONES DE ENTRADA ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observar tarjetas de servicios
    document.querySelectorAll('.reparacion-card').forEach(card => {
        observer.observe(card);
    });

    // ========== EFECTOS DE HOVER EN TARJETAS ==========
    document.querySelectorAll('.reparacion-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ========== SISTEMA DE MODALES ==========
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animación de entrada
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        
        // Animación de salida
        modalContent.style.transform = 'scale(0.7)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="flex"]');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// ========== WHATSAPP INTEGRATION ==========
function contactWhatsApp(service) {
    const phoneNumber = '573001234567'; // Reemplazar con el número real
    let message = '';
    
    // Mensajes personalizados según el servicio
    const messages = {
        'ajuste': '¡Hola! Me interesa el servicio de *Ajuste de Monturas*. ¿Podrían ayudarme con información sobre tiempos y precios?',
        'cristales': '¡Hola! Necesito el servicio de *Cambio de Cristales*. ¿Podrían brindarme información sobre los tipos disponibles y precios?',
        'limpieza': '¡Hola! Me interesa el servicio de *Limpieza Profunda Ultrasónica*. ¿Cuándo podría llevarlo?',
        'mantenimiento': '¡Hola! Quiero programar un *Mantenimiento Preventivo* para mis lentes. ¿Cuál sería el mejor momento?',
        'consulta': '¡Hola! Tengo una consulta sobre los servicios de reparación que ofrecen. ¿Podrían ayudarme?'
    };
    
    message = messages[service] || messages['consulta'];
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir en nueva ventana
    window.open(whatsappURL, '_blank');
}

// ========== EFECTOS ADICIONALES ==========
// Efecto de partículas en el fondo (si se desea agregar más tarde)
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Inicializar partículas si el contenedor existe
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== LOADING STATES ==========
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    button.disabled = true;
    
    // Restaurar después de 2 segundos (simulación)
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Aplicar loading a botones de servicio
document.querySelectorAll('.btn-service').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.hasAttribute('onclick')) {
            showLoading(this);
        }
    });
});

// ========== ACCESSIBILITY IMPROVEMENTS ==========
// Manejo de navegación por teclado para modales
document.addEventListener('keydown', function(e) {
    const openModal = document.querySelector('.modal[style*="flex"]');
    if (openModal && e.key === 'Tab') {
        const focusableElements = openModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Focus trap para modales
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

// Aplicar focus trap cuando se abre un modal
const originalOpenModal = window.openModal;
window.openModal = function(modalId) {
    originalOpenModal(modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        setTimeout(() => trapFocus(modal), 100);
    }
};

console.log('🔧 Reparaciones.js cargado correctamente');
