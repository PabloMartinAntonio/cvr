/* ========================================
   CLARA VISION - LENTES RECETADOS
   JavaScript específico para la página
   ======================================== */

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('� Inicializando página Lentes Recetados...');
    
    // Inicializar todos los componentes
    initThemeToggle();
    initWhatsAppButton();
    initProductModals();
    
    console.log('✅ Página Lentes Recetados inicializada completamente');
});

/* ========================================
   SISTEMA DE TEMAS
   ======================================== */

function initThemeToggle() {
    console.log('� Inicializando sistema de temas...');
    
    const themeToggle = document.getElementById('theme-toggle-new');
    
    if (!themeToggle) {
        console.warn('⚠️ Toggle de tema no encontrado');
        return;
    }

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Actualizar ícono según el tema
    updateThemeIcon(savedTheme);
    
    console.log('� Tema aplicado: ' + savedTheme);
    
    // Event listener para cambio de tema
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Cambiar tema
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        console.log('� Tema cambiado a: ' + newTheme);
    });
    
    console.log('✅ Sistema de temas configurado');
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle-new');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            icon.style.color = '#ffd700';
        } else {
            icon.className = 'fas fa-moon';
            icon.style.color = '#4a90e2';
        }
    }
}

/* ========================================
   BOTÓN WHATSAPP FLOTANTE
   ======================================== */

function initWhatsAppButton() {
    console.log('� Inicializando botón de WhatsApp...');
    
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if (!whatsappBtn) {
        console.warn('⚠️ Botón de WhatsApp no encontrado');
        return;
    }
    
    // Configuración del WhatsApp
    const phoneNumber = '5493537489652';
    const defaultMessage = '¡Hola! Me interesa obtener más información sobre sus lentes recetados. ¿Podrían ayudarme con precios y disponibilidad?';
    
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('� Abriendo WhatsApp...');
        openWhatsApp(phoneNumber, defaultMessage);
    });
    
    console.log('✅ Botón de WhatsApp configurado correctamente');
}

function openWhatsApp(phone, message = '') {
    try {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = 'https://wa.me/' + phone + '?text=' + encodedMessage;
        
        console.log('� Abriendo WhatsApp URL:', whatsappUrl);
        
        const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        if (!whatsappWindow) {
            console.error('❌ No se pudo abrir WhatsApp - bloqueado por popup blocker');
            alert('Por favor, permite las ventanas emergentes para abrir WhatsApp');
        } else {
            console.log('✅ WhatsApp abierto exitosamente');
        }
        
    } catch (error) {
        console.error('❌ Error al abrir WhatsApp:', error);
        alert('Error al abrir WhatsApp. Por favor contacta al: ' + phone);
    }
}

/* ========================================
   SISTEMA DE MODALES DE PRODUCTOS
   ======================================== */

function initProductModals() {
    console.log('� Inicializando modales de productos...');
    
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    console.log('✅ Modales de productos configurados');
}

// Base de datos de productos
const productsData = {
    clasico: {
        title: 'Lente Clásico',
        image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        description: 'Diseño liviano con protección UV completa. Marco de acetato resistente y elegante, perfecto para uso diario.',
        material: 'Acetato de alta calidad',
        weight: '18g',
        type: 'Monofocal/Progresivo',
        warranty: '2 años',
        price: 'Desde $25,000',
        features: ['Protección UV 100%', 'Material hipoalergénico', 'Bisagras reforzadas', 'Ajuste nasal cómodo']
    },
    moderno: {
        title: 'Lente Moderno',
        image: 'https://images.unsplash.com/photo-1556306645-d6ee0323e57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        description: 'Estilo contemporáneo con marcos metálicos premium. Perfectos para profesionales que buscan elegancia.',
        material: 'Aleación de titanio',
        weight: '15g',
        type: 'Monofocal/Progresivo',
        warranty: '3 años',
        price: 'Desde $35,000',
        features: ['Marco ultra liviano', 'Resistente a la corrosión', 'Diseño minimalista', 'Ajuste ergonómico']
    },
    deportivo: {
        title: 'Lente Deportivo',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        description: 'Resistentes y flexibles, ideales para personas activas con tecnología anti-impacto.',
        material: 'TR90 flexible',
        weight: '22g',
        type: 'Monofocal/Deportivo',
        warranty: '2 años',
        price: 'Desde $30,000',
        features: ['Material indestructible', 'Protección anti-impacto', 'Grip antideslizante', 'Ventilación mejorada']
    },
    vintage: {
        title: 'Lente Vintage',
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        description: 'Inspirados en los clásicos atemporales. Marco redondo con detalles únicos y sofisticados.',
        material: 'Acetato italiano',
        weight: '20g',
        type: 'Monofocal/Progresivo',
        warranty: '2 años',
        price: 'Desde $28,000',
        features: ['Diseño retro auténtico', 'Acabados artesanales', 'Forma redonda clásica', 'Detalles metálicos']
    },
    ejecutivo: {
        title: 'Lente Ejecutivo',
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        description: 'Línea premium con materiales de alta gama. Perfecto para reuniones importantes y eventos.',
        material: 'Titanio puro',
        weight: '12g',
        type: 'Progresivo premium',
        warranty: '5 años',
        price: 'Desde $45,000',
        features: ['Materiales premium', 'Diseño exclusivo', 'Acabado mate luxury', 'Cristales high-index']
    },
    juvenil: {
        title: 'Lente Juvenil',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        description: 'Diseños frescos y modernos. Colores vibrantes y formas innovadoras para jóvenes.',
        material: 'Policarbonato colorido',
        weight: '16g',
        type: 'Monofocal/Gaming',
        warranty: '2 años',
        price: 'Desde $20,000',
        features: ['Colores vibrantes', 'Formas innovadoras', 'Filtro de luz azul', 'Protección gaming']
    }
};

function openProductModal(productId) {
    console.log('� Abriendo modal para producto:', productId);
    
    const product = productsData[productId];
    if (!product) {
        console.error('❌ Producto no encontrado:', productId);
        return;
    }
    
    const modal = document.getElementById('productModal');
    
    // Actualizar contenido del modal
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    
    // Actualizar especificaciones
    document.getElementById('specMaterial').textContent = product.material;
    document.getElementById('specWeight').textContent = product.weight;
    document.getElementById('specType').textContent = product.type;
    document.getElementById('specWarranty').textContent = product.warranty;
    
    // Actualizar características
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Mostrar modal
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    console.log('✅ Modal abierto para:', product.title);
}

function closeModal() {
    console.log('� Cerrando modal de producto...');
    
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    console.log('✅ Modal cerrado');
}

function goToContactForm(motivo) {
    console.log('� Redirigiendo a contacto con motivo:', motivo);
    window.location.href = 'index.html#contacto?motivo=' + motivo;
}

// Hacer funciones disponibles globalmente
window.openProductModal = openProductModal;
window.closeModal = closeModal;
window.goToContactForm = goToContactForm;

console.log('� Módulo Lentes Recetados cargado correctamente');
