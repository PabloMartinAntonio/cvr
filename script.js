// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (theme === 'light') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
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
            // Fondo 100% opaco según el tema activo
            header.style.background = isDark ? '#1e293b' : '#ffffff';
            header.style.backdropFilter = 'none'; // Por si quedaba algo
        } else {
            // Volver a usar la variable CSS original
            header.style.background = 'var(--header-bg)';
            header.style.backdropFilter = 'none';
        }
    });
}



// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
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

    // Evita que afecte al logo
    if (heroImage && !heroImage.classList.contains('logo-normal')) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;

            heroImage.style.transform = `translateY(${parallax}px)`;
        });
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
    // Show loading initially
    showLoading();
    
    // Initialize all functionality
    initThemeToggle();
    initMobileNav();
    initHeaderScroll();
    initContactForm();
    initScrollAnimations();
    initActiveNav();
    initStatsCounter();
    initParallax();
    
    // Hide loading after everything is initialized
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
        navMenu.classList.remove('active');
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