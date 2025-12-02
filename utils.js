/* ============================================
   UTILITY HELPER FUNCTIONS
   ============================================
   Pure functions for DOM manipulation, data formatting,
   and performance optimizations.
*/

const Utils = {
    /**
     * Safely query selector wrapper
     * @param {string} selector 
     * @returns {HTMLElement|null}
     */
    $: (selector) => document.querySelector(selector),

    /**
     * Creates a DOM element with classes and content
     * @param {string} tag - HTML tag
     * @param {string} className - CSS classes
     * @param {string} html - Inner HTML content
     * @returns {HTMLElement}
     */
    createEl: (tag, className = '', html = '') => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (html) el.innerHTML = html;
        return el;
    },

    /**
     * Highlight keywords in a string with a <span> wrapper
     * @param {string} text - Original text
     * @param {string[]} keywords - Array of words to highlight
     * @returns {string} HTML string
     */
    highlightText: (text, keywords = []) => {
        if (!keywords.length) return text;
        let result = text;
        keywords.forEach(word => {
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');
            result = result.replace(regex, `<span class="accent">$1</span>`);
        });
        return result;
    },

    /**
     * Simple LocalStorage Cache Wrapper to avoid redundant fetches
     */
    cache: {
        get: (key) => {
            const item = localStorage.getItem(key);
            if (!item) return null;
            
            try {
                const parsed = JSON.parse(item);
                const now = new Date().getTime();
                if (now > parsed.expiry) {
                    localStorage.removeItem(key);
                    return null;
                }
                return parsed.value;
            } catch (e) {
                return null;
            }
        },
        set: (key, value, ttl) => {
            const now = new Date().getTime();
            const item = {
                value: value,
                expiry: now + ttl,
            };
            localStorage.setItem(key, JSON.stringify(item));
        }
    },

    /**
     * Error Handler with console logging
     * @param {Error} error 
     * @param {string} context 
     */
    logError: (error, context = '') => {
        console.error(`[${context}] Error:`, error);
    }
};

window.Utils = Utils;