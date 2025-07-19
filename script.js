/* ========================================
   PROFESSIONAL JAVASCRIPT ARCHITECTURE
   ======================================== */

// Performance and UX optimizations
class SiteController {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        this.initHeader();
        this.initThemeToggle();
        this.initSmoothScrolling();
        this.initIntersectionObserver();
        this.initLazyLoading();
        this.initPerformanceOptimizations();
        this.initAccessibility();
    }

    // Professional Header with scroll effects
    initHeader() {
        const header = document.querySelector('.header');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        // Header scroll effects
        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll - immediately when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 10) {
                header.classList.add('hidden');
            } else if (currentScrollY < lastScrollY) {
                header.classList.remove('hidden');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        // Throttled scroll listener
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        }

        // Active link highlighting
        this.updateActiveNavLinks();
    }

    // Smooth scrolling with better performance
    initSmoothScrolling() {
        // Handle anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            this.smoothScrollTo(href);
        });
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (!element) return;

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update URL without triggering scroll
        if (history.pushState) {
            history.pushState(null, null, target);
        }
    }

    // Intersection Observer for animations and active states
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Animate elements on scroll
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    animateObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.card, .section-header, .feature-item').forEach(el => {
            animateObserver.observe(el);
        });

        // Active section highlighting in navigation
        const sections = document.querySelectorAll('section[id]');
        if (sections.length > 0) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.updateActiveNavLinks(entry.target.id);
                    }
                });
            }, { threshold: 0.5 });

            sections.forEach(section => sectionObserver.observe(section));
        }
    }

    // Lazy loading for images and videos
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                img.classList.add('loading');
                imageObserver.observe(img);
            });
        }
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });

        // Preload pages on hover (for better UX)
        this.initPagePreloading();
    }

    preloadCriticalResources() {
        const criticalImages = [
            'logo.png',
            'sinfondo.png',
            'conlogo.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    initPagePreloading() {
        const internalLinks = document.querySelectorAll('a[href]:not([href^="http"]):not([href^="#"]):not([href^="tel"]):not([href^="mailto"])');
        
        internalLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                this.preloadPage(href);
            }, { once: true });
        });
    }

    preloadPage(href) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    }

    // Accessibility improvements
    initAccessibility() {
        // Enhanced keyboard navigation
        this.initKeyboardNavigation();
        
        // Focus management
        this.initFocusManagement();
        
        // Screen reader improvements
        this.initAriaLive();
    }

    initKeyboardNavigation() {
        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const navToggle = document.querySelector('.nav-toggle.active');
                const navMenu = document.querySelector('.nav-menu.active');
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
                
                // Close any open modals
                const openModal = document.querySelector('.modal.show');
                if (openModal && window.closeEyeCareModal) {
                    window.closeEyeCareModal();
                }
            }
        });

        // Tab trap for modals
        this.initModalTabTrap();
    }

    initModalTabTrap() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal.show');
                if (modal) {
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    if (focusableElements.length === 0) return;
                    
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
            }
        });
    }

    initFocusManagement() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-500);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    initAriaLive() {
        // Create aria-live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(liveRegion);
        
        window.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };
    }

    updateActiveNavLinks(activeSection = null) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (activeSection) {
                const href = link.getAttribute('href');
                if (href === `#${activeSection}` || 
                    (href.includes('.html') && href.includes(activeSection))) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Theme Toggle functionality
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        if (!themeToggle) return;

        // Check for saved theme preference or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeIcon = document.getElementById('theme-icon');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (!themeIcon) return;
        
        if (themeToggle) {
            themeToggle.classList.add('rotating');
            setTimeout(() => {
                themeToggle.classList.remove('rotating');
            }, 600);
        }
        
        if (theme === 'light') {
            // Modo claro: usar anteojos normales (transparentes/claros)
            themeIcon.className = 'fas fa-glasses';
        } else {
            // Modo oscuro: usar anteojos de sol (oscuros)
            themeIcon.className = 'fas fa-low-vision';
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 1024) {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        }

        // Recalculate any layout-dependent features
        this.updateActiveNavLinks();
    }
}

// Initialize the site controller
new SiteController();

// Global utility functions for backward compatibility
window.scrollToSection = function(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Enhanced form handling
class FormHandler {
    constructor() {
        this.initForms();
    }

    initForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => this.enhanceForm(form));
    }

    enhanceForm(form) {
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Enhanced form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        let isValid = true;
        let message = '';

        // Required field validation
        if (required && !value) {
            isValid = false;
            message = 'Este campo es obligatorio';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Ingresa un email válido';
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Ingresa un teléfono válido';
            }
        }

        this.showFieldFeedback(field, isValid, message);
        return isValid;
    }

    showFieldFeedback(field, isValid, message) {
        // Remove existing feedback
        const existingFeedback = field.parentNode.querySelector('.field-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        // Add field state classes
        field.classList.toggle('field-error', !isValid);
        field.classList.toggle('field-success', isValid && field.value.trim());

        // Add feedback message for errors
        if (!isValid && message) {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback field-error-message';
            feedback.textContent = message;
            feedback.style.cssText = `
                color: var(--error);
                font-size: var(--font-size-sm);
                margin-top: var(--space-1);
                display: flex;
                align-items: center;
                gap: var(--space-1);
            `;
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-exclamation-circle';
            feedback.insertBefore(icon, feedback.firstChild);
            
            field.parentNode.appendChild(feedback);
        }
    }

    clearFieldError(field) {
        field.classList.remove('field-error');
        const errorMessage = field.parentNode.querySelector('.field-error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleFormSubmission(form) {
        // Validate all fields
        const fields = form.querySelectorAll('input, select, textarea');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            // Focus first invalid field
            const firstError = form.querySelector('.field-error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                this.showFormSuccess(form);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    }

    showFormSuccess(form) {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div style="
                background: var(--success);
                color: white;
                padding: var(--space-4);
                border-radius: var(--radius-lg);
                margin: var(--space-4) 0;
                display: flex;
                align-items: center;
                gap: var(--space-2);
                animation: slideIn 0.3s ease-out;
            ">
                <i class="fas fa-check-circle"></i>
                <span>¡Mensaje enviado con éxito! Te contactaremos pronto.</span>
            </div>
        `;

        form.appendChild(successMessage);

        // Clear form
        form.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);

        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Formulario enviado con éxito');
        }
    }
}

// Initialize form handler
new FormHandler();

// Contact Form Auto-Selection
function goToContactForm(motivo) {
    // Si estamos en la página principal, hacer scroll y seleccionar motivo
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        scrollToSection('contacto');
        setTimeout(() => {
            const asuntoSelect = document.getElementById('asunto');
            if (asuntoSelect) {
                asuntoSelect.value = motivo;
                asuntoSelect.dispatchEvent(new Event('change', { bubbles: true }));
                // Destacar el formulario brevemente
                const form = asuntoSelect.closest('form');
                if (form) {
                    form.style.transform = 'scale(1.02)';
                    form.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        form.style.transform = 'scale(1)';
                    }, 500);
                }
            }
        }, 1000); // Esperar a que termine el scroll
    } else {
        // Si estamos en otra página, redirigir al index con parámetros
        window.location.href = `index.html#contacto?motivo=${motivo}`;
    }
}

// Función para manejar parámetros de URL al cargar la página
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    
    // Buscar motivo en el hash (formato: #contacto?motivo=valor)
    if (hash.includes('contacto') && hash.includes('motivo=')) {
        const motivoMatch = hash.match(/motivo=([^&]+)/);
        if (motivoMatch) {
            const motivo = motivoMatch[1];
            setTimeout(() => {
                scrollToSection('contacto');
                setTimeout(() => {
                    const asuntoSelect = document.getElementById('asunto');
                    if (asuntoSelect) {
                        asuntoSelect.value = motivo;
                        asuntoSelect.dispatchEvent(new Event('change', { bubbles: true }));
                        // Destacar el formulario
                        const form = asuntoSelect.closest('form');
                        if (form) {
                            form.style.transform = 'scale(1.02)';
                            form.style.transition = 'transform 0.3s ease';
                            form.style.boxShadow = '0 0 20px rgba(0, 151, 178, 0.3)';
                            setTimeout(() => {
                                form.style.transform = 'scale(1)';
                                form.style.boxShadow = '';
                            }, 1000);
                        }
                    }
                }, 1000);
            }, 500);
        }
    }
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';

        if (window.scrollY > 100) {
            header.style.background = isDark ? '#1e293b' : '#ffffff';
            header.style.backdropFilter = 'none';
        } else {
            header.style.background = 'var(--header-bg)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const submitBtn = form.querySelector('.btn-submit');
    const submitText = submitBtn.querySelector('.submit-text');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            asunto: formData.get('asunto'),
            mensaje: formData.get('mensaje')
        };

        // Validate form
        if (!data.nombre || !data.apellido || !data.asunto || !data.mensaje) {
            showMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitText.innerHTML = '<i class="loading"></i> Enviando...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showMessage('¡Mensaje enviado! Te contactaremos pronto.', 'success');
                form.reset();
            } else {
                showMessage('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión. Verifica tu internet e inténtalo de nuevo.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitText.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        }
    });
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';

    // Insert after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .product-card, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Active navigation link
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;

            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Statistics counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const animateValue = (element, start, end, duration) => {
        const increment = end / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }

            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent);

                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    animateValue(element, 0, finalValue, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Parallax effect for hero section
function initParallax() {
    const heroImage = document.querySelector('.hero-image img');

    // Evita que afecte al logo y a imágenes específicas como conlogo.png
    if (heroImage && !heroImage.classList.contains('logo-normal') && !heroImage.src.includes('conlogo.png')) {
        const heroImageContainer = document.querySelector('.hero-image');
        
        // Solo aplicar parallax si la imagen no tiene position fixed
        if (heroImageContainer && getComputedStyle(heroImageContainer).position !== 'fixed') {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;

                heroImage.style.transform = `translateY(${parallax}px)`;
            });
        }
    }
}

// Loading state management
function showLoading() {
    document.body.style.overflow = 'hidden';

    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="text-align: center;">
                <div class="loading" style="width: 40px; height: 40px; border-width: 4px; margin-bottom: 1rem;"></div>
                <p style="color: var(--text-secondary);">Cargando...</p>
            </div>
        </div>
    `;

    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoading();

    initMobileNav();
    initHeaderScroll();
    initContactForm();
    initScrollAnimations();
    initActiveNav();
    initStatsCounter();
    initParallax();
    handleURLParameters();

    setTimeout(hideLoading, 1000);
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 ¡Vuelve pronto! - Óptica Clara Visión';
    } else {
        document.title = 'Óptica Clara Visión - Cuidado Visual Profesional';
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.background = 'var(--background-alt)';
            this.alt = 'Imagen no disponible';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) navMenu.classList.remove('active');
    }
});

// Global utility functions
window.scrollToSection = scrollToSection;

// Service Worker registration (if needed for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you add a service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 480) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function() {
                // Cierra otros acordeones
                document.querySelectorAll('.service-card').forEach(c => {
                    if (c !== card) c.classList.remove('active');
                });
                // Toggle el actual
                card.classList.toggle('active');
            });
        });
    }
});

// ===== MODAL FUNCTIONALITY =====

// Datos de productos para los modales
const productData = {
    clasico: {
        title: "Lente Clásico",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Acetato Premium",
            peso: "18g",
            tipo: "Monofocal/Progresivo",
            garantia: "2 años"
        },
        features: [
            "Marco resistente y duradero",
            "Diseño atemporal y elegante",
            "Adaptable a cualquier rostro",
            "Disponible en múltiples colores",
            "Cristales anti-reflejantes incluidos",
            "Ajuste profesional gratuito"
        ],
        description: "Nuestro modelo clásico combina tradición y calidad. Diseñado para personas que valoran la elegancia atemporal, estos lentes ofrecen comodidad excepcional y durabilidad garantizada.",
        price: "Desde $2,500"
    },
    moderno: {
        title: "Lente Moderno",
        image: "https://images.unsplash.com/photo-1556306645-d6ee0323e57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Titanio",
            peso: "12g",
            tipo: "Multifocal",
            garantia: "3 años"
        },
        features: [
            "Marco ultra-liviano de titanio",
            "Tecnología anti-azul integrada",
            "Diseño minimalista contemporáneo",
            "Resistente a la corrosión",
            "Bisagras reforzadas",
            "Cristales fotocromáticos disponibles"
        ],
        description: "La perfecta fusión entre tecnología y estilo. Ideales para profesionales modernos que buscan funcionalidad sin comprometer la estética.",
        price: "Desde $3,200"
    },
    deportivo: {
        title: "Lente Deportivo",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "TR90",
            peso: "15g",
            tipo: "Deportivo",
            garantia: "2 años"
        },
        features: [
            "Material TR90 ultra-flexible",
            "Resistente a impactos",
            "Protección UV 100%",
            "Antideslizante en nariz y patillas",
            "Diseño aerodinámico",
            "Colores vibrantes disponibles"
        ],
        description: "Especialmente diseñados para personas activas. Combinan protección, comodidad y estilo para acompañarte en todas tus actividades deportivas.",
        price: "Desde $2,800"
    },
    vintage: {
        title: "Lente Vintage",
        image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Acetato Clásico",
            peso: "22g",
            tipo: "Redondo/Aviador",
            garantia: "2 años"
        },
        features: [
            "Inspiración retro auténtica",
            "Acabados artesanales únicos",
            "Formas geométricas clásicas",
            "Colores earth tone",
            "Detalles metálicos dorados",
            "Edición limitada"
        ],
        description: "Revive la elegancia de décadas pasadas con estos diseños únicos. Perfectos para quienes aprecian el estilo retro con un toque contemporáneo.",
        price: "Desde $3,500"
    },
    ejecutivo: {
        title: "Lente Ejecutivo",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Titanio Premium",
            peso: "14g",
            tipo: "Progresivo Premium",
            garantia: "5 años"
        },
        features: [
            "Materiales de lujo exclusivos",
            "Tecnología progresiva avanzada",
            "Diseño ejecutivo sofisticado",
            "Tratamientos premium incluidos",
            "Estuche de cuero genuino",
            "Servicio VIP personalizado"
        ],
        description: "La máxima expresión en lentes de lujo. Diseñados para ejecutivos y profesionales que exigen lo mejor en calidad, tecnología y prestigio.",
        price: "Desde $5,500"
    },
    juvenil: {
        title: "Lente Juvenil",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Plástico Flexible",
            peso: "16g",
            tipo: "Juvenil",
            garantia: "2 años"
        },
        features: [
            "Diseños trendy y frescos",
            "Colores vibrantes únicos",
            "Extra resistente para uso diario",
            "Protección total para estudiantes",
            "Ajuste cómodo todo el día",
            "Precio accesible para jóvenes"
        ],
        description: "Expresión y personalidad para los más jóvenes. Diseños frescos que combinan diversión, comodidad y protección visual adecuada para el estudio.",
        price: "Desde $1,800"
    },
    // ===== LENTES DE SOL PRODUCTS =====
    'aviador': {
        title: "Aviador Premium",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Titanio Premium",
            peso: "16g",
            tipo: "Aviador Polarizado",
            garantia: "3 años"
        },
        features: [
            "Lentes polarizadas de alta definición",
            "Marco de titanio ultraliviano",
            "Protección UV400 total",
            "Diseño atemporal clásico",
            "Bisagras reforzadas premium",
            "Estuche de cuero incluido"
        ],
        description: "El clásico aviador reimaginado con materiales premium. Marcos de titanio que combinan durabilidad excepcional con peso mínimo, ideal para uso prolongado con estilo atemporal.",
        price: "Desde $4,200"
    },
    'ejecutivo-sol': {
        title: "Ejecutivo Elite",
        image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Acetato Italiano",
            peso: "18g",
            tipo: "Rectangular Elegante",
            garantia: "3 años"
        },
        features: [
            "Acetato italiano de primera calidad",
            "Lentes antirreflejantes avanzadas",
            "Diseño ejecutivo sofisticado",
            "Tratamiento oleofóbico",
            "Ajuste ergonómico perfecto",
            "Certificación de calidad europea"
        ],
        description: "Sofisticación para el ejecutivo moderno. Cada detalle está pensado para proyectar éxito y elegancia en reuniones importantes y eventos corporativos.",
        price: "Desde $3,800"
    },
    'deportivo-sol': {
        title: "Deportivo Pro",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "TR90 Flexble",
            peso: "14g",
            tipo: "Deportivo Wrap",
            garantia: "2 años"
        },
        features: [
            "Material TR90 ultra-resistente",
            "Tecnología anti-impacto certificada",
            "Grip antideslizante en nariz y patillas",
            "Ventilación optimizada anti-empañe",
            "Lentes intercambiables disponibles",
            "Resistente a temperaturas extremas"
        ],
        description: "Diseñados para atletas de alto rendimiento. Combinan protección máxima con comodidad excepcional para acompañarte en tus actividades más exigentes.",
        price: "Desde $3,200"
    },
    'vintage-sol': {
        title: "Vintage Luxury",
        image: "https://images.unsplash.com/photo-1556306645-d6ee0323e57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Acetato Artesanal",
            peso: "20g",
            tipo: "Retro Round",
            garantia: "3 años"
        },
        features: [
            "Fabricación artesanal única",
            "Cristales minerales de alta calidad",
            "Acabados en tonos earth exclusivos",
            "Detalles metálicos dorados",
            "Inspiración vintage auténtica",
            "Pieza de colección limitada"
        ],
        description: "Revive la elegancia de décadas pasadas con esta pieza única. Combina la nostalgia del diseño retro con la tecnología de protección más avanzada.",
        price: "Desde $4,800"
    },
    'femenino-sol': {
        title: "Femenino Elegance",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Acetato con Swarovski",
            peso: "17g",
            tipo: "Cat-Eye Elegante",
            garantia: "3 años"
        },
        features: [
            "Cristales Swarovski genuinos",
            "Formas orgánicas femeninas",
            "Colores exclusivos de temporada",
            "Diseño que realza las facciones",
            "Acabados nacarados únicos",
            "Edición especial para damas"
        ],
        description: "Diseños exclusivos que celebran la feminidad. Cada par es una obra de arte que combina elegancia sofisticada con detalles únicos y brillantes.",
        price: "Desde $5,200"
    },
    'limitada-sol': {
        title: "Edición Limitada",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        specs: {
            material: "Materiales Exóticos",
            peso: "19g",
            tipo: "Avant-garde",
            garantia: "5 años"
        },
        features: [
            "Pieza numerada con certificado",
            "Materiales exóticos exclusivos",
            "Diseño de vanguardia único",
            "Tecnología experimental avanzada",
            "Colección museum-quality",
            "Inversión en arte portable"
        ],
        description: "La máxima expresión del diseño y la innovación. Cada pieza es única, numerada y viene con certificado de autenticidad. Una verdadera obra de arte.",
        price: "Desde $8,500"
    }
};

// Función para abrir modal
function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const product = productData[productId];
    
    if (!modal || !product) return;
    
    // Actualizar contenido del modal
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.title;
    
    // Actualizar especificaciones
    document.getElementById('specMaterial').textContent = product.specs.material;
    document.getElementById('specWeight').textContent = product.specs.peso;
    document.getElementById('specType').textContent = product.specs.tipo;
    document.getElementById('specWarranty').textContent = product.specs.garantia;
    
    // Actualizar características
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');
    
    // Actualizar descripción
    document.getElementById('modalDescription').textContent = product.description;
    
    // Actualizar precio
    document.getElementById('modalPrice').textContent = product.price;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll en el fondo
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

// Event listeners para cerrar modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
    if (modal) {
        // Cerrar con botón X
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});

// ===== END MODAL FUNCTIONALITY =====

// ===== GOOGLE MAPS FUNCTIONALITY =====
function openGoogleMaps() {
    const address = "Bv. España 327, Villa María, Córdoba, Argentina";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Abrir en una nueva pestaña
    window.open(googleMapsUrl, '_blank');
}

// ===== EYE CARE MODAL FUNCTIONALITY =====
function showEyeCareModal() {
    const modal = document.getElementById('eye-care-modal');
    
    // Mostrar el modal y aplicar la animación
    modal.style.display = 'flex';
    
    // Pequeño delay para que se aplique el display antes de la transición
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Cerrar modal al hacer click en el overlay (fuera del contenido)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeEyeCareModal();
        }
    });
}

function resetEyeCareModal() {
    localStorage.removeItem('eyeCareFirstVisit');
    localStorage.removeItem('eyeCareLastClosed');
    console.log('Modal system reset. Refresh the page to see the modal again.');
}

function closeEyeCareModal() {
    const modal = document.getElementById('eye-care-modal');
    
    // Agregar clase de fade-out
    modal.classList.add('fade-out');
    
    // Después de la animación, ocultar completamente
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('show', 'fade-out');
    }, 400); // Tiempo de la transición CSS
    
    // Guardar timestamp de cuándo se cerró el modal
    const currentTime = new Date().getTime();
    localStorage.setItem('eyeCareLastClosed', currentTime.toString());
}

// Eye Care Modal Auto-show Logic
function initEyeCareModal() {
    // Verificar si es la primera vez que visita el sitio
    const firstVisit = localStorage.getItem('eyeCareFirstVisit');
    const lastClosed = localStorage.getItem('eyeCareLastClosed');
    const currentTime = new Date().getTime();
    
    let shouldShowModal = false;
    
    // Si es la primera visita, mostrar el modal
    if (!firstVisit) {
        shouldShowModal = true;
        localStorage.setItem('eyeCareFirstVisit', 'true');
    }
    // Si ya se cerró antes, verificar si han pasado 5 minutos (300000 ms)
    else if (lastClosed) {
        const timeSinceClose = currentTime - parseInt(lastClosed);
        if (timeSinceClose >= 300000) { // 5 minutos = 300000 ms
            shouldShowModal = true;
        }
    }
    
    // Mostrar el modal si se cumple alguna condición
    if (shouldShowModal) {
        setTimeout(() => {
            showEyeCareModal();
        }, 1000); // Delay de 1 segundo para que se cargue completamente la página
    }
        
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEyeCareModal();
        }
    });
}

// ===== SERVICE WORKER REGISTRATION =====
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Error al registrar Service Worker:', error);
                });
        });
    }
}

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const metrics = {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime,
                    firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime
                };
                
                // Send metrics to service worker
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'PERFORMANCE_METRICS',
                        metrics: metrics
                    });
                }
                
                console.log('Performance Metrics:', metrics);
            }, 0);
        });
    }
}

// Initialize all HTML functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initEyeCareModal();
    initServiceWorker();
    initPerformanceMonitoring();
    initWhatsApp();
});

// WhatsApp functionality
function initWhatsApp() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Phone number (to be configured)
            const phoneNumber = '5491123456789'; // Replace with actual number
            const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre los servicios de Clara Visión.');
            
            // WhatsApp URL
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
        });
    }
}