/* ============================================
   APP CONFIGURATION
   ============================================
   Central source of truth for application constants,
   paths, and visual settings.
*/

const CONFIG = {
    // API & Data Settings
    data: {
        sourceUrl: 'data.json',
        cacheKey: 'portfolio_data_v1',
        cacheDuration: 3600 * 1000, // 1 hour in ms
    },

    // Visual & Theme Settings
    theme: {
        accentColor: '#00A1E0', // Salesforce Blue
        backgroundColor: '#0a192f',
    },

    // Particle System Settings
    particles: {
        enabled: true,
        color: '#00A1E0',
        countDesktop: 100,
        countMobile: 50,
        connectionDistance: 150,
        mouseRadius: 150,
        mouseRepulsion: true
    },

    // Social Media Icons Mapping (FontAwesome classes)
    socialIcons: {
        linkedin: 'fab fa-linkedin',
        github: 'fab fa-github',
        email: 'fas fa-envelope'
    },

    // Debug mode
    debug: true
};

// Expose to global window object
if (typeof window !== 'undefined') {
    window.APP_CONFIG = CONFIG;
}