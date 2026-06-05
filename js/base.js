/**
 * Base JavaScript for AI Appointment Assistant
 * Handles common functionality across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    initTooltips();
    
    // Initialize Bootstrap toasts
    initToasts();
    
    // Navbar scroll behavior
    initNavbarScroll();
    
    // Initialize Theme Toggle
    initThemeToggle();
});

/**
 * Initialize Light/Dark theme toggle
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    const lightIcon = toggleBtn.querySelector('.light-icon');
    const darkIcon = toggleBtn.querySelector('.dark-icon');
    
    // Set initial icon state based on the current theme applied in HTML
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    updateToggleIcons(currentTheme, lightIcon, darkIcon);

    toggleBtn.addEventListener('click', function() {
        const isDark = document.body.classList.contains('theme-dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        // 1. Update data-bs-theme on html (for bootstrap components)
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        
        // 2. Toggle the class on the body (for custom css variables)
        if (newTheme === 'dark') {
            document.body.classList.add('theme-dark');
        } else {
            document.body.classList.remove('theme-dark');
        }
        
        // 3. Save preference
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {}
        
        // 4. Update Icons
        updateToggleIcons(newTheme, lightIcon, darkIcon);
    });
}

function updateToggleIcons(theme, lightIcon, darkIcon) {
    if (!lightIcon || !darkIcon) return;
    if (theme === 'dark') {
        lightIcon.classList.add('d-none');
        darkIcon.classList.remove('d-none');
    } else {
        darkIcon.classList.add('d-none');
        lightIcon.classList.remove('d-none');
    }
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Initialize Bootstrap toasts
 */
function initToasts() {
    const toastElList = [].slice.call(document.querySelectorAll('.toast'));
    toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 5000
        }).show();
    });
}

/**
 * Initialize navbar scroll behavior
 * Adds a shadow and changes background opacity when scrolling
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-modern');

    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }
}

/**
 * Utility function to format dates
 * @param {Date} date - The date to format
 * @param {String} format - The format to use (short, medium, long)
 * @returns {String} Formatted date string
 */
function formatDate(date, format = 'medium') {
    if (!date) return '';
    
    const dateObj = new Date(date);
    
    switch (format) {
        case 'short':
            return dateObj.toLocaleDateString();
        case 'long':
            return dateObj.toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        case 'time':
            return dateObj.toLocaleTimeString(undefined, { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        case 'datetime':
            return dateObj.toLocaleDateString() + ' ' + 
                   dateObj.toLocaleTimeString(undefined, { 
                       hour: '2-digit', 
                       minute: '2-digit' 
                   });
        case 'medium':
        default:
            return dateObj.toLocaleDateString(undefined, { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
    }
}

/**
 * Add a CSS class to an element temporarily
 * @param {HTMLElement} element - The element to add the class to
 * @param {String} className - The class to add
 * @param {Number} duration - Duration in milliseconds
 */
function addTemporaryClass(element, className, duration = 1000) {
    if (!element) return;
    
    element.classList.add(className);
    
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}
