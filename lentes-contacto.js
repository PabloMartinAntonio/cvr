// Barra de carga animada con porcentaje aleatorio entre 50 y 80
// No requiere dependencias externas

document.addEventListener('DOMContentLoaded', function() {
    var percent = Math.floor(Math.random() * 31) + 50; // 50-80
    var bar = document.querySelector('.progress-bar-inner');
    var text = document.querySelector('.progress-bar-text');
    var current = 0;
    var speed = 12 + Math.floor(Math.random() * 8); // velocidad variable
    var interval = setInterval(function() {
        if (current < percent) {
            current++;
            bar.style.width = current + '%';
            text.textContent = current + '%';
        } else {
            clearInterval(interval);
            bar.style.width = percent + '%';
            text.textContent = percent + '%';
            bar.classList.add('bounce');
            setTimeout(function(){ bar.classList.remove('bounce'); }, 600);
        }
    }, speed);

    // Dropdown menú funcionalidad
    const dropdownNav = document.querySelector('.dropdown-nav');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    if(dropdownNav && dropdownBtn) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownNav.classList.toggle('open');
        });
        document.addEventListener('click', function(e) {
            if(!dropdownNav.contains(e.target)) {
                dropdownNav.classList.remove('open');
            }
        });
    }

    // Theme toggle funcionalidad (idéntico a recetados)
    const themeToggle = document.getElementById('theme-toggle-new');
    if (themeToggle) {
        const themeIcon = document.getElementById('theme-icon-new');
        function updateThemeIcon(theme) {
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.className = 'fas fa-sun';
                    themeIcon.style.color = '#ffd700';
                } else {
                    themeIcon.className = 'fas fa-moon';
                    themeIcon.style.color = '#4a90e2';
                }
            }
        }
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
});
