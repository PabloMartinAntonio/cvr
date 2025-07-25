// ================================
// LENTES DE SOL - JAVASCRIPT OPTIMIZADO
// ================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando lentes-sol.js optimizado');
    initLoadingBar();
    initThemeToggle();
    initDropdownMenu();
    initAnimations();
});

// ================================
// BARRA DE CARGA INICIAL
// ================================
function initLoadingBar() {
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (loadingProgress) {
        // Simular carga automática
        setTimeout(() => {
            loadingProgress.style.width = '100%';
            
            // Ocultar barra después de completar
            setTimeout(() => {
                const container = document.querySelector('.loading-bar-container');
                if (container) {
                    container.style.opacity = '0';
                    setTimeout(() => {
                        container.style.display = 'none';
                    }, 500);
                }
            }, 1000);
        }, 500);
    }
}

// ================================
// MODO NOCTURNO MEJORADO
// ================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (!themeToggle || !themeIcon) {
        console.warn('Elementos de tema no encontrados');
        return;
    }

    // Verificar tema guardado en localStorage
    const savedTheme = localStorage.getItem('clara-vision-theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        updateThemeText('Modo Claro');
    } else {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        updateThemeText('Modo Nocturno');
    }

    // Evento para cambiar tema con animación
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = body.getAttribute('data-theme');
        
        // Animación de transición
        body.style.transition = 'all 0.3s ease';
        
        if (currentTheme === 'dark') {
            // Cambiar a modo claro
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('clara-vision-theme', 'light');
            updateThemeText('Modo Nocturno');
            console.log('Cambiado a modo claro');
        } else {
            // Cambiar a modo oscuro
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('clara-vision-theme', 'dark');
            updateThemeText('Modo Claro');
            console.log('Cambiado a modo oscuro');
        }
        
        // Quitar transición después del cambio
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeText(text) {
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = themeToggle.querySelector('span');
    if (themeText) {
        themeText.textContent = text;
    }
}

// ================================
// ANIMACIONES Y EFECTOS
// ================================
function initAnimations() {
    // Animación de aparición para elementos
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

    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('.coming-soon-message, .premium-cta');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ================================
// DROPDOWN MENU MEJORADO
// ================================
function initDropdownMenu() {
    const dropdownNav = document.querySelector('.dropdown-nav');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    if (!dropdownNav || !dropdownContent) {
        console.warn('Elementos de dropdown no encontrados');
        return;
    }

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
    if (dropdownBtn) {
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
    }

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

// ================================
// WHATSAPP FUNCTIONALITY
// ================================
function openWhatsApp() {
    const phoneNumber = "5493534123456"; // Reemplaza con el número real de la óptica
    const message = encodeURIComponent("¡Hola! Me interesan los lentes de sol premium. ¿Podrían brindarme más información?");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// ================================
// MODAL FUNCTIONALITY
// ================================

// Datos de los productos
const productData = {
    'aviador': {
        title: 'Aviador Premium',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        material: 'Titanio Premium',
        weight: '28g',
        type: 'Aviador Clásico',
        warranty: '2 años',
        features: [
            'Protección UV400 certificada',
            'Lentes polarizadas anti-reflejantes',
            'Marcos de titanio ultraligero',
            'Diseño atemporal y elegante',
            'Ajuste ergonómico perfecto'
        ],
        description: 'Los lentes aviador premium combinan el diseño clásico intemporal con la más avanzada tecnología de protección UV. Fabricados con marcos de titanio de grado aeroespacial y lentes polarizadas de alta definición.',
        price: 'Desde $45.000'
    },
    'ejecutivo-sol': {
        title: 'Ejecutivo Elite',
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        material: 'Acetato Italiano',
        weight: '32g',
        type: 'Profesional',
        warranty: '2 años',
        features: [
            'Acetato italiano de primera calidad',
            'Lentes antirreflejantes premium',
            'Diseño ejecutivo moderno',
            'Comodidad todo el día',
            'Resistente a impactos'
        ],
        description: 'Diseñados para el ejecutivo moderno que no compromete el estilo por la funcionalidad. Marcos de acetato italiano con acabados de lujo y lentes de última generación.',
        price: 'Desde $38.000'
    },
    'deportivo-sol': {
        title: 'Deportivo Pro',
        image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        material: 'TR90 Sport',
        weight: '22g',
        type: 'Deportivo',
        warranty: '3 años',
        features: [
            'Material TR90 ultraliviano',
            'Tecnología anti-impacto',
            'Grip antideslizante',
            'Ventilación optimizada',
            'Resistente al agua y sudor'
        ],
        description: 'Rendimiento superior para atletas exigentes. Tecnología anti-impacto con materiales ultralivianos, diseñados para resistir las condiciones más extremas.',
        price: 'Desde $42.000'
    },
    'vintage-sol': {
        title: 'Vintage Luxury',
        image: 'https://images.unsplash.com/photo-1556306645-d6ee0323e57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        material: 'Acetato Artesanal',
        weight: '35g',
        type: 'Vintage Heritage',
        warranty: '2 años',
        features: [
            'Marcos artesanales únicos',
            'Lentes de cristal mineral',
            'Acabados vintage auténticos',
            'Diseño retro moderno',
            'Edición numerada'
        ],
        description: 'Inspiración retro con tecnología moderna. Marcos artesanales con acabados únicos y lentes de cristal mineral para una claridad visual excepcional.',
        price: 'Desde $52.000'
    },
    'femenino-sol': {
        title: 'Femenino Elegance',
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        material: 'Acetato + Swarovski',
        weight: '29g',
        type: 'Femenino Elegante',
        warranty: '2 años',
        features: [
            'Detalles en cristales Swarovski',
            'Formas orgánicas femeninas',
            'Colores exclusivos',
            'Acabados de lujo',
            'Diseño ergonómico'
        ],
        description: 'Diseños exclusivos que realzan la feminidad. Detalles en cristales Swarovski auténticos y marcos con formas orgánicas que complementan perfectamente el rostro femenino.',
        price: 'Desde $48.000'
    },
    'limitada-sol': {
        title: 'Edición Limitada',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        material: 'Materiales Exóticos',
        weight: '31g',
        type: 'Exclusivo Limitado',
        warranty: '5 años',
        features: [
            'Piezas numeradas únicas',
            'Certificado de autenticidad',
            'Materiales exóticos premium',
            'Diseño de vanguardia',
            'Garantía extendida'
        ],
        description: 'Piezas únicas numeradas con certificado de autenticidad. Materiales exóticos y diseño de vanguardia para coleccionistas que buscan lo extraordinario.',
        price: 'Desde $85.000'
    }
};

// ================================
// FUNCIONES DEL MODAL
// ================================

function initModalEventListeners() {
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('productModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function openProductModal(productId) {
    console.log('Abriendo modal para:', productId);
    const modal = document.getElementById('productModal');
    const product = productData[productId];
    
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }
    
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    
    // Actualizar contenido del modal
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.title;
    document.getElementById('specMaterial').textContent = product.material;
    document.getElementById('specWeight').textContent = product.weight;
    document.getElementById('specType').textContent = product.type;
    document.getElementById('specWarranty').textContent = product.warranty;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    
    // Actualizar lista de características
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Mostrar modal con animación
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Pequeño delay para la animación
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function goToContactForm(type) {
    closeModal();
    if (type === 'productos') {
        window.location.href = 'index.html#contacto';
    } else if (type === 'examen') {
        window.location.href = 'index.html#contacto';
    }
}

// ================================
// WHATSAPP FUNCTIONALITY
// ================================
function openWhatsApp() {
    const phoneNumber = "5493534123456"; // Reemplaza con el número real de la óptica
    const message = encodeURIComponent("¡Hola! Me interesan los lentes de sol premium de Clara Visión. ¿Podrían brindarme más información sobre los modelos disponibles?");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// ================================
// FUNCIONES DE NAVEGACIÓN
// ================================

// Función para ir a la página de contacto
function goToContact() {
    window.location.href = 'index.html#contacto';
}

// Función para navegar entre páginas
function navigateTo(page) {
    window.location.href = page;
}

// ================================
// FUNCIONES DE UTILIDAD
// ================================

// Función para hacer scroll suave
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
