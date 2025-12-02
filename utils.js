/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

const Utils = {
    /**
     * Logger mejorado con niveles
     */
    log: {
        info: (...args) => {
            if (APP_CONFIG.debug) {
                console.log('[INFO]', ...args);
            }
        },
        error: (...args) => {
            console.error('[ERROR]', ...args);
        },
        warn: (...args) => {
            if (APP_CONFIG.debug) {
                console.warn('[WARN]', ...args);
            }
        }
    },

    /**
     * Sanitiza HTML para prevenir XSS
     */
    sanitizeHTML: (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Formatea texto con resaltado de palabras clave
     */
    highlightKeywords: (text, keywords = []) => {
        let result = text;
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
            result = result.replace(regex, '<strong>$1</strong>');
        });
        return result;
    },

    /**
     * Debounce function para optimizar eventos
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function para limitar llamadas
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Cache simple para datos
     */
    cache: {
        storage: new Map(),
        set: (key, value, duration = APP_CONFIG.data.cacheDuration) => {
            Utils.cache.storage.set(key, {
                value,
                expiry: Date.now() + duration
            });
        },
        get: (key) => {
            const item = Utils.cache.storage.get(key);
            if (!item) return null;
            if (Date.now() > item.expiry) {
                Utils.cache.storage.delete(key);
                return null;
            }
            return item.value;
        },
        clear: () => {
            Utils.cache.storage.clear();
        }
    },

    /**
     * Smooth scroll a un elemento
     */
    smoothScrollTo: (elementId, offset = APP_CONFIG.navigation.offset) => {
        const element = document.getElementById(elementId);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    },

    /**
     * Verifica si un elemento está visible en viewport
     */
    isInViewport: (element, threshold = 0.2) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        return vertInView && (rect.height * threshold <= windowHeight);
    },

    /**
     * Formatea fechas
     */
    formatDate: (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long' 
        });
    },

    /**
     * Crea elementos DOM de forma segura
     */
    createElement: (tag, className = '', content = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    },

    /**
     * Valida email
     */
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Manejo de errores centralizado
     */
    handleError: (error, context = 'Application') => {
        Utils.log.error(`${context}:`, error);
        
        // Aquí podrías enviar errores a un servicio de tracking
        // ej: Sentry, LogRocket, etc.
        
        // Mostrar mensaje amigable al usuario si es necesario
        if (APP_CONFIG.debug) {
            alert(`Error en ${context}: ${error.message}`);
        }
    },

    /**
     * Detecta modo oscuro del sistema
     */
    prefersDarkMode: () => {
        return window.matchMedia && 
               window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    /**
     * Optimiza imágenes con lazy loading mejorado
     */
    optimizeImage: (img, callback) => {
        if (img.complete) {
            callback?.();
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                callback?.();
            });
            img.addEventListener('error', () => {
                Utils.log.error('Error cargando imagen:', img.src);
                // Imagen placeholder si falla
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23112240" width="300" height="300"/%3E%3Ctext fill="%2300A1E0" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24"%3EIB%3C/text%3E%3C/svg%3E';
            });
        }
    }
};

// Hacer Utils disponible globalmente
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}
