document.addEventListener('DOMContentLoaded', function () {
    // =========================================
    // 1. MOBILE NAVIGATION TOGGLE
    // =========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(event.target) &&
                !navToggle.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // =========================================
    // 2. SERVICE TABS FUNCTIONALITY
    // =========================================
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');

    if (serviceTabs.length > 0 && serviceContents.length > 0) {
        // Show first service by default
        serviceContents[0].classList.add('active');

        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const serviceId = this.getAttribute('data-service');

                // Remove active class from all tabs
                serviceTabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all service contents
                serviceContents.forEach(content => {
                    content.classList.remove('active');
                });

                // Show selected service content
                const targetContent = document.getElementById(serviceId);
                if (targetContent) {
                    targetContent.classList.add('active');

                    // Update URL hash without scrolling
                    history.pushState(null, null, `#${serviceId}`);

                    // Smooth scroll to service (with offset for fixed header)
                    setTimeout(() => {
                        const headerHeight = document.querySelector('.navbar').offsetHeight;
                        const elementPosition = targetContent.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });
        });

        // Handle URL hash on page load
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            const targetTab = document.querySelector(`.service-tab[data-service="${hash}"]`);
            if (targetTab) {
                // Wait for DOM to be fully loaded
                setTimeout(() => {
                    targetTab.click();
                }, 100);
            }
        }
    }

    // =========================================
    // 3. PORTFOLIO FILTERING (Optimized)
    // =========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter projects using exact word matching
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'block';
                        // Force reflow for animation
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // =========================================
    // 4. BACK TO TOP BUTTON
    // =========================================
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================
    // 5. FORM SUBMISSION HANDLING
    // =========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(this);

            // Send to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Create success message
                        const successDiv = document.createElement('div');
                        successDiv.className = 'form-success animate-fade-in-up';
                        successDiv.innerHTML = `
                        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 1.5rem; border-radius: 0.75rem; text-align: center;">
                            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <h4 style="color: white; margin-bottom: 0.5rem;">Message Sent Successfully!</h4>
                            <p style="color: rgba(255, 255, 255, 0.9); margin: 0;">Thank you for your message. I'll get back to you within 24 hours.</p>
                        </div>
                    `;

                        // Insert success message
                        this.parentNode.insertBefore(successDiv, this.nextSibling);

                        // Reset form
                        this.reset();

                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;

                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            successDiv.remove();
                        }, 5000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    // Show error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'form-error animate-fade-in-up';
                    errorDiv.innerHTML = `
                    <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 1.5rem; border-radius: 0.75rem; text-align: center;">
                        <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h4 style="color: white; margin-bottom: 0.5rem;">Submission Failed</h4>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0;">Please try again or call directly at 0451 331 921.</p>
                    </div>
                `;

                    // Insert error message
                    this.parentNode.insertBefore(errorDiv, this.nextSibling);

                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        errorDiv.remove();
                    }, 5000);
                });
        });
    }

    // =========================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only process internal anchor links (excluding service tabs)
            if (href !== '#' && href.startsWith('#') &&
                !this.classList.contains('service-tab') &&
                document.querySelector(href)) {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                    window.scrollTo({
                        top: targetPosition - headerHeight - 20,
                        behavior: 'smooth'
                    });

                    // Update URL
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // =========================================
    // 7. ACTIVE NAV LINK HIGHLIGHTING
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.navbar').offsetHeight;

            if (window.pageYOffset >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            // Handle both index.html#about and #about formats
            if (href === `#${current}` ||
                (current === '' && href === '#') ||
                (href.includes('#') && href.endsWith(`#${current}`))) {
                link.classList.add('active');
            }

            // Special case for service details page
            if (window.location.pathname.includes('services.html') &&
                href.includes('services.html')) {
                link.classList.add('active');
            }

            // Special case for portfolio page
            if (window.location.pathname.includes('portfolio.html') &&
                href.includes('portfolio.html')) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Run on page load

    // =========================================
    // 8. LAZY LOAD IMAGES (Optimized)
    // =========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Add loaded class for fade-in effect
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        lazyImages.forEach(img => {
            // Store original src in data-src for true lazy loading
            if (!img.dataset.src && img.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }

    // =========================================
    // 9. ADD SCROLL ANIMATIONS (Optimized)
    // =========================================
    const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .value-card, .project-card');

    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach((el, index) => {
            // Add animation delay class
            const delayClass = `animate-delay-${(index % 6) + 1}`;
            el.classList.add(delayClass);

            observer.observe(el);
        });
    } else {
        // Fallback: show all elements immediately
        animatedElements.forEach(el => {
            el.classList.add('animate-fade-in-up');
        });
    }

    // =========================================
    // 10. COPYRIGHT YEAR UPDATER
    // =========================================
    const currentYear = new Date().getFullYear();

    // Populate any span with id currentYear
    document.querySelectorAll('#currentYear').forEach(el => {
        el.textContent = currentYear;
    });

    // Fallback: replace literal 2025 in footer paragraphs if present
    document.querySelectorAll('.footer-bottom p').forEach(element => {
        if (element.textContent && element.textContent.includes('2025')) {
            element.textContent = element.textContent.replace(/2025/g, currentYear);
        }
    });

    // =========================================
    // 11. SERVICE TAB SCROLLING - SIMPLIFIED
    // =========================================
    function scrollActiveTabIntoView() {
        const serviceTabsContainer = document.querySelector('.service-tabs');
        if (serviceTabsContainer && window.innerWidth < 768) {
            const activeTab = serviceTabsContainer.querySelector('.service-tab.active');
            if (activeTab) {
                // Simple scroll without hiding anything
                activeTab.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest'
                });
            }
        }
    }

    // Run on page load and when tabs change
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(scrollActiveTabIntoView, 300); // Small delay for page load

        // Also run when service tabs are clicked
        document.querySelectorAll('.service-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                setTimeout(scrollActiveTabIntoView, 100);
            });
        });
    });

    // =========================================
    // 12. ADD SCHEMA MARKUP FOR SERVICES
    // =========================================
    function addServiceSchema() {
        const serviceCards = document.querySelectorAll('.service-card[itemscope]');
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';

        const serviceData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": Array.from(serviceCards).map((card, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Service",
                    "name": card.querySelector('h3')?.textContent || '',
                    "description": card.querySelector('p')?.textContent || '',
                    "url": window.location.origin + card.querySelector('a')?.getAttribute('href') || ''
                }
            }))
        };

        schemaScript.textContent = JSON.stringify(serviceData);
        document.head.appendChild(schemaScript);
    }

    // Add schema markup after page load
    setTimeout(addServiceSchema, 1000);

    // =========================================
    // 13. PERFORMANCE OPTIMIZATIONS
    // =========================================

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Performance intensive operations
            highlightNavLink();
        }, 100);
    });

    // Preconnect to external domains
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://images.unsplash.com'
    ];

    preconnectLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });

    // =========================================
    // 14. ACCESSIBILITY IMPROVEMENTS
    // =========================================

    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content id to first main section
    const mainSections = document.querySelectorAll('section');
    if (mainSections.length > 0) {
        mainSections[0].id = 'main-content';
    }

    // Add keyboard navigation for service tabs
    const serviceTabElements = document.querySelectorAll('.service-tab');
    serviceTabElements.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');

        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextTab = serviceTabElements[index + 1] || serviceTabElements[0];
                nextTab.focus();
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevTab = serviceTabElements[index - 1] || serviceTabElements[serviceTabElements.length - 1];
                prevTab.focus();
            }
        });
    });

    // =========================================
    // 15. BROWSER COMPATIBILITY CHECKS
    // =========================================

    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-css-grid');

        // Fallback for older browsers
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            servicesGrid.style.display = 'flex';
            servicesGrid.style.flexWrap = 'wrap';
            servicesGrid.style.justifyContent = 'center';
        }
    }

    // Check for Flexbox gap support
    if (!CSS.supports('gap', '1px')) {
        document.body.classList.add('no-flex-gap');

        // Add margin fallback for flex items
        const flexContainers = document.querySelectorAll('.nav-links, .hero-actions, .filter-buttons, .cta-actions');
        flexContainers.forEach(container => {
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                if (i > 0) {
                    children[i].style.marginLeft = '1rem';
                }
            }
        });
    }
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Minimal Service Worker to avoid 404 registration errors
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Optionally respond to fetch events (pass-through)
// removed no-op fetch handler to avoid unnecessary navigation overhead

