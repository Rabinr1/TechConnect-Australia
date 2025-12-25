// =========================================
// MAIN JAVASCRIPT ENTRY POINT
// =========================================
import { initNavigation } from './components/navigation.js';
import { initServiceTabs } from './components/services.js';
import { initPortfolioFilter } from './components/portfolio.js';
import { initContactForm } from './components/forms.js';
import { initBackToTop, initSmoothScroll } from './utils/helpers.js';

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize navigation
    initNavigation();
    
    // Initialize service tabs
    initServiceTabs();
    
    // Initialize portfolio filtering
    initPortfolioFilter();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize utility functions
    initBackToTop();
    initSmoothScroll();
});
