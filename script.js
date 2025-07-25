/* ========================================
   CLARA VISION - CHATBOT FUNCIONAL
   ======================================== */

// Inicialización del sitio cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema, navegación, scroll y contadores
    initThemeToggle();
    initMobileNavigation();
    initSmoothScrolling();
    initCounters();
    initEyeCareModal();
    // Inicializar chatbot
    try {
        window.chatBot = new ChatBot();
    } catch (error) {
        console.error('❌ ERROR AL CREAR CHATBOT:', error);
    }
});

// Componentes principales del sitio
function initSiteComponents() {
    initThemeToggle();
    initMobileNavigation();
    initSmoothScrolling();
}

// Toggle de tema oscuro/claro
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        console.log(`🌓 Tema cambiado a: ${newTheme}`);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Navegación móvil
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

// Scroll suave y soporte para botones personalizados
function initSmoothScrolling() {
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
    // Botones personalizados
    window.scrollToSection = function(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
}

/* ========================================
   CLASE CHATBOT PRINCIPAL
   ======================================== */

class ChatBot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            'lentes': '👓 Ofrecemos una amplia variedad de lentes: marcos modernos, lentes de sol, lentes de contacto y lentes graduados. ¿Qué tipo te interesa?',
            'contacto': '📞 Nos puedes contactar al teléfono (555) 123-4567 o visitarnos en nuestra dirección. También puedes escribirnos por WhatsApp.',
            'horarios': '🕒 Nuestros horarios son: Lunes a Viernes de 9:00 AM a 6:00 PM, Sábados de 9:00 AM a 2:00 PM. Domingos cerrado.',
            'precios': '💰 Manejamos precios accesibles y promociones especiales. Te invitamos a visitarnos para una cotización personalizada.',
            'ubicacion': '📍 Nos ubicamos en el centro de la ciudad. Puedes encontrarnos fácilmente en nuestra dirección principal.',
            'cita': '📅 Para agendar una cita puedes llamarnos o visitarnos directamente. Atendemos con y sin cita previa.',
            'graduacion': '👁️ Realizamos exámenes de la vista completos con equipo moderno. Agenda tu cita para un chequeo profesional.',
            'reparaciones': '🔧 Sí, realizamos reparaciones de marcos y ajustes. Trae tus lentes y te ayudamos a dejarlos como nuevos.',
            'garantia': '✅ Todos nuestros productos incluyen garantía. Los marcos tienen garantía contra defectos de fabricación.',
            'promociones': '🎉 Tenemos promociones especiales todo el año. ¡Pregunta por nuestras ofertas actuales!'
        };
        
        this.init();
    }

    init() {
        console.log('🤖 Inicializando chatbot...');
        
        const setupSuccess = this.setupElements();
        if (!setupSuccess) {
            console.error('❌ Error en configuración del chatbot');
            return;
        }
        
        this.attachEventListeners();
        this.showWelcomeMessage();
        console.log('✅ Chatbot inicializado correctamente');
    }

    setupElements() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.closeBtn = document.getElementById('chatbot-close');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.suggestions = document.getElementById('chatbot-suggestions');
        this.typing = document.getElementById('chatbot-typing');
        this.notification = document.getElementById('chatbot-notification');
        
        if (!this.toggle || !this.window) {
            console.error('❌ Elementos críticos del chatbot no encontrados');
            return false;
        }
        
        return true;
    }

    attachEventListeners() {
        if (!this.toggle) {
            console.error('❌ No se puede configurar event listeners');
            return;
        }

        // Toggle principal del chatbot
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleChat();
        });

        // Click en la imagen también
        const chatbotImg = this.toggle.querySelector('.chatbot-toggle-img');
        if (chatbotImg) {
            chatbotImg.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleChat();
            });
        }

        // Cerrar chatbot
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeChat());
        }

        // Enviar mensaje
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            this.input.addEventListener('input', () => {
                if (this.sendBtn) {
                    this.sendBtn.disabled = this.input.value.trim() === '';
                }
            });
        }

        // Sugerencias
        if (this.suggestions) {
            this.suggestions.addEventListener('click', (e) => {
                if (e.target.classList.contains('suggestion-chip')) {
                    const message = e.target.dataset.message;
                    this.sendUserMessage(message);
                }
            });
        }

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.chatbot-container')) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        
        if (this.window) {
            this.window.classList.add('active');
            
            // Posicionamiento móvil especial
            if (window.innerWidth <= 768) {
                this.window.style.setProperty('right', 'auto', 'important');
                this.window.style.setProperty('left', '20px', 'important');
                this.window.style.setProperty('transform', 'none', 'important');
            }
        }

        // Cambiar icono a X
        if (this.toggle) {
            this.toggle.innerHTML = '<i class="fas fa-times" style="color: white; font-size: 1.2rem;"></i>';
        }

        // Ocultar notificación
        if (this.notification) {
            this.notification.style.display = 'none';
        }

        // Focus en input
        setTimeout(() => {
            if (this.input) {
                this.input.focus();
            }
        }, 300);
    }

    closeChat() {
        this.isOpen = false;
        
        if (this.window) {
            this.window.classList.remove('active');
            
            // Limpiar estilos móviles
            this.window.style.removeProperty('right');
            this.window.style.removeProperty('left');
            this.window.style.removeProperty('transform');
        }

        // Restaurar imagen original
        if (this.toggle) {
            this.toggle.innerHTML = '<img src="Imgchatbot.png" alt="Asistente Clara" class="chatbot-toggle-img">';
        }
    }

    sendMessage() {
        if (!this.input) return;
        
        const message = this.input.value.trim();
        if (!message) return;
        
        this.sendUserMessage(message);
        this.input.value = '';
        
        if (this.sendBtn) {
            this.sendBtn.disabled = true;
        }
    }

    sendUserMessage(message) {
        // Agregar mensaje del usuario
        this.addMessage(message, 'user');
        
        // Simular typing
        this.showTyping();
        
        // Responder después de un delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        if (!this.messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    getResponse(message) {
        const msg = message.toLowerCase();
        
        // Buscar respuesta por palabras clave
        for (const [key, response] of Object.entries(this.responses)) {
            if (msg.includes(key) || msg.includes(key.replace('-', ' '))) {
                return response;
            }
        }
        
        // Respuestas por contexto
        if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas')) {
            return '¡Hola! 👋 Soy Clara, tu asistente virtual de Óptica Clara Visión. ¿En qué puedo ayudarte hoy?';
        }
        
        if (msg.includes('gracias') || msg.includes('thanks')) {
            return '¡De nada! 😊 Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?';
        }
        
        if (msg.includes('adios') || msg.includes('bye') || msg.includes('chao')) {
            return '¡Hasta pronto! 👋 Gracias por contactar a Óptica Clara Visión. ¡Que tengas un excelente día!';
        }
        
        // Respuesta por defecto
        return 'Entiendo tu consulta. 🤔 Te puedo ayudar con información sobre nuestros lentes, horarios, precios, ubicación y servicios. ¿Sobre qué te gustaría saber más?';
    }

    showTyping() {
        if (this.typing) {
            this.typing.style.display = 'flex';
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    hideTyping() {
        if (this.typing) {
            this.typing.style.display = 'none';
        }
    }

    showWelcomeMessage() {
        // Mostrar notificación después de unos segundos
        setTimeout(() => {
            if (!this.isOpen && this.notification) {
                this.notification.style.display = 'flex';
                
                // Auto-ocultar después de 10 segundos
                setTimeout(() => {
                    if (this.notification && !this.isOpen) {
                        this.notification.style.display = 'none';
                    }
                }, 10000);
            }
        }, 3000);
    }
}

/* ========================================
   FUNCIONES AUXILIARES
   ======================================== */

// Función para debugging
function debugChatbot() {
    if (window.chatBot) {
        console.log('🔍 Estado del chatbot:');
        console.log('   Abierto:', window.chatBot.isOpen);
        console.log('   Toggle:', !!window.chatBot.toggle);
        console.log('   Window:', !!window.chatBot.window);
        console.log('   Ancho ventana:', window.innerWidth);
    } else {
        console.log('❌ Chatbot no encontrado');
    }
}

// Función para forzar apertura del chatbot
function openChatbot() {
    if (window.chatBot) {
        window.chatBot.openChat();
    }
}

// Función para forzar cierre del chatbot
function closeChatbot() {
    if (window.chatBot) {
        window.chatBot.closeChat();
    }
}

// ========================================
// FUNCIONALIDADES ADICIONALES
// ========================================

// 1. CONTADORES ANIMADOS
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        
        if (current >= target) return;
        
        const increment = target / 200; // Velocidad de animación
        const timer = setInterval(() => {
            const currentValue = +counter.innerText;
            
            if (currentValue < target) {
                counter.innerText = Math.ceil(currentValue + increment);
            } else {
                counter.innerText = target;
                
                // Agregar símbolo según el tipo
                if (target === 15) {
                    counter.innerText = target + '+';
                } else if (target === 5000) {
                    counter.innerText = target + '+';
                } else if (target === 50) {
                    counter.innerText = target + '+';
                } else if (target === 100) {
                    counter.innerText = target + '%';
                }
                
                clearInterval(timer);
            }
        }, 10);
    });
}

// Inicializar contadores cuando la sección sea visible
function initCounters() {
    const statsSection = document.querySelector('.about');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// 2. MODAL DE CUIDADO VISUAL
function showEyeCareModal() {
    const modal = document.getElementById('eye-care-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeEyeCareModal() {
    const modal = document.getElementById('eye-care-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Marcar como visto para no mostrar en futuras visitas
        localStorage.setItem('clara-vision-modal-shown', 'true');
    }
}

// Mostrar modal al cargar la página (solo la primera vez)
function initEyeCareModal() {
    const hasSeenModal = localStorage.getItem('clara-vision-modal-shown');
    
    if (!hasSeenModal) {
        setTimeout(() => {
            showEyeCareModal();
        }, 2000); // Mostrar después de 2 segundos
    }
}

// 3. GOOGLE MAPS
function openGoogleMaps() {
    const address = "Bv. España 327, Villa María, Córdoba, Argentina";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Abrir en nueva pestaña
    window.open(googleMapsUrl, '_blank');
}

// Ya no se usa initSiteComponents, todo se inicializa arriba correctamente

console.log('🤖 Clara Vision - Chatbot Script Cargado');
console.log('💡 Comandos disponibles: debugChatbot(), openChatbot(), closeChatbot()');
console.log('✨ Funcionalidades adicionales: contadores animados, modal de cuidado visual, Google Maps');
