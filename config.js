/* ============================================
   CONFIGURATION FILE
   ============================================ */

const CONFIG = {
    // Colores del tema
    theme: {
        bgColor: '#0a192f',
        textPrimary: '#ccd6f6',
        textSecondary: '#8892b0',
        accent: '#00A1E0',
        accentGlow: 'rgba(0, 161, 224, 0.2)',
        cardBg: 'rgba(17, 34, 64, 0.7)',
    },

    // Configuración de animaciones
    animations: {
        scrollThreshold: 0.2,
        particleCount: null, // null = auto-calculate
        particleSpeed: 0.5,
        particleSize: { min: 1, max: 3 },
        particleConnectionDistance: 150,
    },

    // Textos personalizables
    texts: {
        hero: {
            greeting: 'Hola, mi nombre es',
            subtitle: 'Senior Salesforce Developer.',
            ctaButton: 'Ver mi trabajo'
        },
        sections: {
            about: 'Sobre Mí',
            experience: 'Dónde he trabajado',
            skills: 'Formación & Certificaciones',
            contact: '¿Qué sigue?'
        },
        contact: {
            title: 'Ponte en Contacto',
            description: 'Actualmente estoy abierto a nuevas oportunidades donde pueda aportar mi experiencia en Salesforce y DevOps. Ya sea para una pregunta o solo para saludar, ¡mi bandeja de entrada está abierta!',
            button: 'Saludar'
        },
        footer: 'Diseñado y construido por'
    },

    // Configuración de datos
    data: {
        sourceFile: 'data.json',
        cacheEnabled: true,
        cacheDuration: 3600000 // 1 hora en ms
    },

    // Configuración de navegación
    navigation: {
        logo: 'IB.',
        smoothScroll: true,
        offset: 80
    },

    // Redes sociales (se llenan dinámicamente desde data.json)
    social: {
        icons: {
            linkedin: 'fab fa-linkedin',
            github: 'fab fa-github',
            twitter: 'fab fa-twitter',
            email: 'fas fa-envelope'
        }
    },

    // SEO y Meta tags
    seo: {
        defaultTitle: 'Ismael Blánquez | Senior Salesforce Developer',
        titleSeparator: ' | ',
        description: 'Portfolio profesional de Ismael Blánquez, Senior Salesforce Developer especializado en Apex, LWC y DevOps.',
        keywords: 'Salesforce, Developer, Apex, LWC, DevOps, Jenkins, Git'
    },

    // Debug mode - ACTIVADO para ver errores
    debug: true
};

// Hacer CONFIG disponible globalmente
if (typeof window !== 'undefined') {
    window.APP_CONFIG = CONFIG;
}
