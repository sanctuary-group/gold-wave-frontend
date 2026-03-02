// ========================================
// BOAT PREDICTOR - Tailwind Config (Shared)
// Dark/Light Theme (CSS Variable-driven)
// ========================================

tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Theme-adaptive base (driven by CSS custom properties)
        dark: { DEFAULT: 'var(--bg-primary)', light: 'var(--bg-input)', card: 'var(--bg-card)', surface: 'var(--bg-surface)' },
        // Gold accents (shared across themes)
        gold: { light: '#d4c28a', DEFAULT: '#b09a5c', dark: '#8d7d3f', border: '#c4b578', muted: '#6b5d3a' },
        // Warm neutrals (theme-adaptive)
        warm: { border: '#3d3730', shadow: '#0d0b09', gray: 'var(--text-muted)', text: 'var(--text-secondary)' },
        // Text colors (theme-adaptive)
        cream: { DEFAULT: 'var(--text-primary)', dark: 'var(--bg-surface)' },
        ivory: '#f0e8d8',
        beige: '#3d3730',
        charcoal: 'var(--text-primary)',
        // Status colors (adjusted for dark bg)
        status: {
          success: '#8fa86e',
          'success-bg': 'rgba(143, 168, 110, 0.15)',
          error: '#c07070',
          'error-bg': 'rgba(192, 112, 112, 0.15)',
          warning: '#d4b868',
          'warning-bg': 'rgba(212, 184, 104, 0.15)',
          info: '#9c9080',
          'info-bg': 'rgba(156, 144, 128, 0.15)',
          purple: '#a898b8',
          'purple-bg': 'rgba(168, 152, 184, 0.15)'
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Noto Sans JP"', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.15)',
        'elevation-2': '0 4px 12px rgba(0, 0, 0, 0.25), 0 1px 4px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0 8px 30px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)',
        'elevation-4': '0 16px 48px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.2)',
        'gold-glow': '0 0 0 1px rgba(176, 154, 92, 0.2), 0 8px 30px rgba(176, 154, 92, 0.15)',
        'gold-glow-lg': '0 0 0 1px rgba(176, 154, 92, 0.3), 0 16px 48px rgba(176, 154, 92, 0.25)',
      },
    }
  }
};
