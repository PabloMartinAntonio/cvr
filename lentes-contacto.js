/* =============================================== */
/* LENTES DE CONTACTO - PÁGINA PRÓXIMAMENTE     */
/* =============================================== */

// State management
let isDropdownOpen = false;
let progressAnimated = false;

// ===============================================
// INITIALIZATION
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🟢 Lentes de Contacto - Próximamente: Iniciando aplicación...');
    
    try {
        initializeTheme();
        initializeDropdownNavigation();
        initializeProgressBar();
        initializeWhatsAppButton();
        initializeContactButton();
        initializeAnimations();
        console.log('✅ Lentes de Contacto - Próximamente: Todas las funciones inicializadas correctamente');
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
    }
});

// ===============================================
// THEME MANAGEMENT
// ===============================================

function initializeTheme() {
    console.log('🔧 Inicializando sistema de temas...');
    
    try {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
            console.log('✅ Event listener del tema configurado correctamente');
        } else {
            console.warn('⚠️ Botón de cambio de tema no encontrado');
        }
    } catch (error) {
        console.error('❌ Error inicializando temas:', error);
    }
}

function toggleTheme() {
    console.log('🎨 Cambiando tema...');
    
    try {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        console.log(`✅ Tema cambiado de ${currentTheme} a ${newTheme}`);
    } catch (error) {
        console.error('❌ Error cambiando tema:', error);
    }
}

function applyTheme(theme) {
    console.log(`🎨 Aplicando tema: ${theme}`);
    
    try {
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeIcon = document.querySelector('#theme-toggle i');
        const themeText = document.querySelector('#theme-toggle span');
        
        if (themeIcon && themeText) {
            if (theme === 'light') {
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Modo Oscuro';
            } else {
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Modo Claro';
            }
        }
        
        console.log(`✅ Tema ${theme} aplicado correctamente`);
    } catch (error) {
        console.error('❌ Error aplicando tema:', error);
    }
}

// ===============================================
// DROPDOWN NAVIGATION
// ===============================================

function initializeDropdownNavigation() {
    console.log('🧭 Inicializando navegación dropdown...');
    
    try {
        const dropdownBtn = document.querySelector('.dropdown-btn');
        const dropdownContent = document.querySelector('.dropdown-content');
        const dropdownNav = document.querySelector('.dropdown-nav');
        
        if (!dropdownBtn || !dropdownContent || !dropdownNav) {
            console.warn('⚠️ Elementos del dropdown no encontrados');
            return;
        }
        
        // Desktop hover behavior
        dropdownNav.addEventListener('mouseenter', showDropdown);
        dropdownNav.addEventListener('mouseleave', hideDropdown);
        
        // Mobile click behavior
        dropdownBtn.addEventListener('click', toggleDropdown);
        
        // Click outside to close
        document.addEventListener('click', function(event) {
            if (!dropdownNav.contains(event.target)) {
                hideDropdown();
            }
        });
        
        console.log('✅ Navegación dropdown configurada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando dropdown:', error);
    }
}

function showDropdown() {
    console.log('📋 Mostrando dropdown');
    isDropdownOpen = true;
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    if (dropdownContent) {
        dropdownContent.style.opacity = '1';
        dropdownContent.style.visibility = 'visible';
        dropdownContent.style.transform = 'translateY(0)';
    }
    
    if (dropdownArrow) {
        dropdownArrow.style.transform = 'rotate(180deg)';
    }
}

function hideDropdown() {
    console.log('📋 Ocultando dropdown');
    isDropdownOpen = false;
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    if (dropdownContent) {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.transform = 'translateY(-10px)';
    }
    
    if (dropdownArrow) {
        dropdownArrow.style.transform = 'rotate(0deg)';
    }
}

function toggleDropdown() {
    console.log('📋 Alternando dropdown');
    if (isDropdownOpen) {
        hideDropdown();
    } else {
        showDropdown();
    }
}

// ===============================================
// PROGRESS BAR
// ===============================================

function initializeProgressBar() {
    console.log('📊 Inicializando barra de progreso...');
    
    try {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            console.warn('⚠️ Barra de progreso no encontrada');
            return;
        }
        
        // Usar Intersection Observer para animar cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !progressAnimated) {
                    animateProgressBar();
                    progressAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(progressBar);
        console.log('✅ Barra de progreso configurada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando barra de progreso:', error);
    }
}

function animateProgressBar() {
    console.log('📊 Animando barra de progreso al 75%');
    
    try {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (!progressFill || !progressText) {
            console.error('❌ Elementos de progreso no encontrados');
            return;
        }
        
        // Animar el ancho de la barra
        setTimeout(() => {
            progressFill.style.width = '75%';
        }, 500);
        
        // Animar el contador de porcentaje
        let currentProgress = 0;
        const targetProgress = 75;
        const increment = 1;
        const duration = 2000; // 2 segundos
        const intervalTime = duration / targetProgress;
        
        const progressInterval = setInterval(() => {
            currentProgress += increment;
            progressText.textContent = currentProgress + '%';
            
            if (currentProgress >= targetProgress) {
                clearInterval(progressInterval);
                progressText.textContent = '75%';
                console.log('✅ Animación de progreso completada');
            }
        }, intervalTime);
        
    } catch (error) {
        console.error('❌ Error animando barra de progreso:', error);
    }
}

// ===============================================
// WHATSAPP INTEGRATION
// ===============================================

function initializeWhatsAppButton() {
    console.log('💬 Inicializando integración de WhatsApp...');
    
    try {
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                sendWhatsAppMessage('Hola! Me interesa información sobre los lentes de contacto que tendrán disponibles próximamente. ¿Podrían informarme cuando estén listos?');
            });
            console.log('✅ Botón WhatsApp configurado correctamente');
        } else {
            console.warn('⚠️ Botón WhatsApp no encontrado');
        }
    } catch (error) {
        console.error('❌ Error inicializando WhatsApp:', error);
    }
}

function initializeContactButton() {
    console.log('📞 Inicializando botón de contacto...');
    
    try {
        const contactBtn = document.getElementById('contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                sendWhatsAppMessage('Hola! Quiero estar al tanto del lanzamiento de la sección de lentes de contacto. ¿Pueden notificarme cuando esté disponible?');
            });
            console.log('✅ Botón de contacto configurado correctamente');
        } else {
            console.warn('⚠️ Botón de contacto no encontrado');
        }
    } catch (error) {
        console.error('❌ Error inicializando botón de contacto:', error);
    }
}

function sendWhatsAppMessage(message) {
    console.log('💬 Enviando mensaje por WhatsApp:', message);
    
    try {
        const phoneNumber = '+573108281610'; // Número de Clara Visión
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        console.log('✅ Mensaje enviado por WhatsApp');
    } catch (error) {
        console.error('❌ Error enviando mensaje por WhatsApp:', error);
    }
}

// ===============================================
// ANIMATIONS AND EFFECTS
// ===============================================

function initializeAnimations() {
    console.log('✨ Inicializando animaciones...');
    
    try {
        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements for animation
            const animateElements = document.querySelectorAll('.feature-item, .contact-action');
            animateElements.forEach(el => observer.observe(el));
            
            console.log(`✅ Animaciones de scroll configuradas (${animateElements.length} elementos)`);
        } else {
            console.warn('⚠️ IntersectionObserver no soportado');
        }
        
        // Add hover effects to feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        console.log('✅ Animaciones inicializadas correctamente');
    } catch (error) {
        console.error('❌ Error inicializando animaciones:', error);
    }
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function isMobile() {
    return window.innerWidth <= 768;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===============================================
// ERROR HANDLING
// ===============================================

window.addEventListener('error', function(event) {
    console.error('❌ Error global capturado:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// ===============================================
// RESIZE HANDLER
// ===============================================

window.addEventListener('resize', debounce(function() {
    console.log('📱 Ventana redimensionada');
    
    // Close dropdown on mobile orientation change
    if (isMobile() && isDropdownOpen) {
        hideDropdown();
    }
}, 250));

// ===============================================
// PERFORMANCE MONITORING
// ===============================================

if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('⚡ Métricas de rendimiento:', {
                'Tiempo de carga DOM': Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart) + 'ms',
                'Tiempo total de carga': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms',
                'Tiempo de respuesta del servidor': Math.round(perfData.responseEnd - perfData.requestStart) + 'ms'
            });
        }, 0);
    });
}

console.log('🚀 Lentes de Contacto - Próximamente: Script cargado completamente');
}

// ===============================================
// DROPDOWN NAVIGATION
// ===============================================

function initializeDropdownNavigation() {
    console.log('🧭 Inicializando navegación dropdown...');
    
    try {
        const dropdownBtn = document.querySelector('.dropdown-btn');
        const dropdownContent = document.querySelector('.dropdown-content');
        const dropdownNav = document.querySelector('.dropdown-nav');
        
        if (!dropdownBtn || !dropdownContent || !dropdownNav) {
            console.warn('⚠️ Elementos del dropdown no encontrados');
            return;
        }
        
        // Desktop hover behavior
        dropdownNav.addEventListener('mouseenter', showDropdown);
        dropdownNav.addEventListener('mouseleave', hideDropdown);
        
        // Mobile click behavior
        dropdownBtn.addEventListener('click', toggleDropdown);
        
        // Click outside to close
        document.addEventListener('click', function(event) {
            if (!dropdownNav.contains(event.target)) {
                hideDropdown();
            }
        });
        
        console.log('✅ Navegación dropdown configurada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando dropdown:', error);
    }
}

function showDropdown() {
    console.log('📋 Mostrando dropdown');
    isDropdownOpen = true;
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    if (dropdownContent) {
        dropdownContent.style.opacity = '1';
        dropdownContent.style.visibility = 'visible';
        dropdownContent.style.transform = 'translateY(0)';
    }
    
    if (dropdownArrow) {
        dropdownArrow.style.transform = 'rotate(180deg)';
    }
}

function hideDropdown() {
    console.log('📋 Ocultando dropdown');
    isDropdownOpen = false;
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    if (dropdownContent) {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.visibility = 'hidden';
        dropdownContent.style.transform = 'translateY(-10px)';
    }
    
    if (dropdownArrow) {
        dropdownArrow.style.transform = 'rotate(0deg)';
    }
}

function toggleDropdown() {
    console.log('📋 Alternando dropdown');
    if (isDropdownOpen) {
        hideDropdown();
    } else {
        showDropdown();
    }
}

// ===============================================
// MODAL MANAGEMENT
// ===============================================

function initializeModals() {
    console.log('🔲 Inicializando sistema de modales...');
    
    try {
        // Initialize modal buttons
        const modalButtons = document.querySelectorAll('[data-modal]');
        modalButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal');
                openModal(modalId);
            });
        });
        
        // Initialize close buttons
        const closeButtons = document.querySelectorAll('.close, .modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        // Close modal on outside click
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && currentModal) {
                closeModal();
            }
        });
        
        console.log(`✅ Sistema de modales inicializado (${modalButtons.length} botones encontrados)`);
    } catch (error) {
        console.error('❌ Error inicializando modales:', error);
    }
}

function openModal(modalId) {
    console.log(`🔲 Abriendo modal: ${modalId}`);
    
    try {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error(`❌ Modal con ID '${modalId}' no encontrado`);
            return;
        }
        
        // Populate modal content if it's a product modal
        if (productData[modalId]) {
            populateProductModal(modalId, productData[modalId]);
        }
        
        // Show modal with animation
        modal.style.display = 'block';
        modal.offsetHeight; // Force reflow
        modal.classList.add('show');
        
        currentModal = modal;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        console.log(`✅ Modal ${modalId} abierto correctamente`);
    } catch (error) {
        console.error(`❌ Error abriendo modal ${modalId}:`, error);
    }
}

function closeModal() {
    console.log('🔲 Cerrando modal actual');
    
    try {
        if (!currentModal) {
            console.log('ℹ️ No hay modal activo para cerrar');
            return;
        }
        
        currentModal.classList.remove('show');
        
        setTimeout(() => {
            if (currentModal) {
                currentModal.style.display = 'none';
                currentModal = null;
                document.body.style.overflow = ''; // Restore scrolling
            }
        }, 300);
        
        console.log('✅ Modal cerrado correctamente');
    } catch (error) {
        console.error('❌ Error cerrando modal:', error);
    }
}

function populateProductModal(modalId, data) {
    console.log(`🔧 Poblando contenido del modal: ${modalId}`);
    
    try {
        const modal = document.getElementById(modalId);
        if (!modal || !data) {
            console.error('❌ Modal o datos no encontrados');
            return;
        }
        
        // Update title and subtitle
        const title = modal.querySelector('.modal-header h2');
        const subtitle = modal.querySelector('.modal-header p');
        
        if (title) title.textContent = data.title;
        if (subtitle) subtitle.textContent = data.subtitle;
        
        // Update description
        const description = modal.querySelector('.product-details p');
        if (description) description.textContent = data.description;
        
        // Update features list
        const featuresList = modal.querySelector('.product-details ul');
        if (featuresList && data.features) {
            featuresList.innerHTML = data.features.map(feature => 
                `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
            ).join('');
        }
        
        // Update brands
        const brandsList = modal.querySelector('.brands-list');
        if (brandsList && data.brands) {
            brandsList.innerHTML = data.brands.map(brand => 
                `<span class="brand-tag">${brand}</span>`
            ).join('');
        }
        
        // Update price
        const priceInfo = modal.querySelector('.price-info h4');
        if (priceInfo && data.priceRange) {
            priceInfo.textContent = data.priceRange;
        }
        
        // Update WhatsApp button
        const whatsappBtn = modal.querySelector('.whatsapp-modal');
        if (whatsappBtn && data.whatsappMessage) {
            whatsappBtn.setAttribute('data-message', data.whatsappMessage);
        }
        
        console.log(`✅ Modal ${modalId} poblado correctamente`);
    } catch (error) {
        console.error(`❌ Error poblando modal ${modalId}:`, error);
    }
}

// ===============================================
// WHATSAPP INTEGRATION
// ===============================================

function initializeWhatsAppButton() {
    console.log('💬 Inicializando integración de WhatsApp...');
    
    try {
        // Main floating WhatsApp button
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.addEventListener('click', function(e) {
                e.preventDefault();
                sendWhatsAppMessage('Hola! Me interesa información sobre lentes de contacto. ¿Podrían ayudarme?');
            });
        }
        
        // Modal WhatsApp buttons
        const whatsappModals = document.querySelectorAll('.whatsapp-modal');
        whatsappModals.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const message = this.getAttribute('data-message') || 'Hola! Me interesa información sobre lentes de contacto.';
                sendWhatsAppMessage(message);
            });
        });
        
        // CTA buttons
        const ctaButtons = document.querySelectorAll('.btn-whatsapp');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                sendWhatsAppMessage('Hola! Me gustaría agendar una consulta para lentes de contacto.');
            });
        });
        
        console.log(`✅ WhatsApp configurado (${whatsappModals.length + ctaButtons.length + 1} botones)`);
    } catch (error) {
        console.error('❌ Error inicializando WhatsApp:', error);
    }
}

function sendWhatsAppMessage(message) {
    console.log('💬 Enviando mensaje por WhatsApp:', message);
    
    try {
        const phoneNumber = '+573108281610'; // Número de Clara Visión
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        console.log('✅ Mensaje enviado por WhatsApp');
    } catch (error) {
        console.error('❌ Error enviando mensaje por WhatsApp:', error);
    }
}

// ===============================================
// ANIMATIONS AND EFFECTS
// ===============================================

function initializeAnimations() {
    console.log('✨ Inicializando animaciones...');
    
    try {
        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements for animation
            const animateElements = document.querySelectorAll('.product-card, .brand-item, .process-step, .contact-card');
            animateElements.forEach(el => observer.observe(el));
            
            console.log(`✅ Animaciones de scroll configuradas (${animateElements.length} elementos)`);
        } else {
            console.warn('⚠️ IntersectionObserver no soportado');
        }
        
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        console.log('✅ Animaciones inicializadas correctamente');
    } catch (error) {
        console.error('❌ Error inicializando animaciones:', error);
    }
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function isMobile() {
    return window.innerWidth <= 768;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===============================================
// ERROR HANDLING
// ===============================================

window.addEventListener('error', function(event) {
    console.error('❌ Error global capturado:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// ===============================================
// RESIZE HANDLER
// ===============================================

window.addEventListener('resize', debounce(function() {
    console.log('📱 Ventana redimensionada');
    
    // Close dropdown on mobile orientation change
    if (isMobile() && isDropdownOpen) {
        hideDropdown();
    }
    
    // Close modal on extreme resize
    if (currentModal && window.innerWidth < 400) {
        console.log('📱 Cerrando modal por ventana muy pequeña');
        closeModal();
    }
}, 250));

// ===============================================
// PERFORMANCE MONITORING
// ===============================================

if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('⚡ Métricas de rendimiento:', {
                'Tiempo de carga DOM': Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart) + 'ms',
                'Tiempo total de carga': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms',
                'Tiempo de respuesta del servidor': Math.round(perfData.responseEnd - perfData.requestStart) + 'ms'
            });
        }, 0);
    });
}

console.log('🚀 Lentes de Contacto JS: Script cargado completamente');
