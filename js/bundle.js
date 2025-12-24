(function () {
    'use strict';

    function initNavigation() {
        var navToggle = document.querySelector('.nav-toggle');
        var navMenu = document.querySelector('.nav-menu');
        var navbar = document.querySelector('.navbar');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function () {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            document.querySelectorAll('.nav-link').forEach(function (link) {
                link.addEventListener('click', function () {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            document.addEventListener('click', function (event) {
                if (navMenu.classList.contains('active') && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        if (navbar) {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    function initServiceTabs() {
        var serviceTabs = document.querySelectorAll('.service-tab');
        var serviceContents = document.querySelectorAll('.service-content');

        if (serviceTabs.length > 0 && serviceContents.length > 0) {
            serviceContents[0].classList.add('active');

            serviceTabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    var serviceId = this.getAttribute('data-service');

                    serviceTabs.forEach(function (t) { return t.classList.remove('active'); });
                    this.classList.add('active');

                    serviceContents.forEach(function (content) {
                        content.classList.remove('active');
                    });

                    var targetContent = document.getElementById(serviceId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        history.pushState(null, null, '#' + serviceId);

                        setTimeout(function () {
                            var navbar = document.querySelector('.navbar');
                            var headerHeight = navbar ? navbar.offsetHeight : 0;
                            var elementPosition = targetContent.getBoundingClientRect().top;
                            var offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }, 100);
                    }
                });
            });

            var hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                var targetTab = document.querySelector('.service-tab[data-service="' + hash + '"]');
                if (targetTab) {
                    setTimeout(function () {
                        targetTab.click();
                    }, 100);
                }
            }
        }
    }

    function initPortfolioFilter() {
        var filterButtons = document.querySelectorAll('.filter-btn');
        var projectCards = document.querySelectorAll('.project-card');

        if (filterButtons.length > 0 && projectCards.length > 0) {
            filterButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    filterButtons.forEach(function (btn) { return btn.classList.remove('active'); });
                    this.classList.add('active');

                    var filterValue = this.getAttribute('data-filter');

                    projectCards.forEach(function (card) {
                        var raw = card.getAttribute('data-category') || '';
                        var categories = raw.split(' ').filter(Boolean);

                        if (filterValue === 'all' || categories.indexOf(filterValue) !== -1) {
                            card.style.display = 'block';
                            void card.offsetWidth;
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(function () {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
    }

    function initFaqAccordion() {
        var faqQuestions = document.querySelectorAll('.faq-question');

        if (faqQuestions.length > 0) {
            faqQuestions.forEach(function (question) {
                question.addEventListener('click', function () {
                    var faqItem = this.parentElement;
                    if (!faqItem) return;

                    faqItem.classList.toggle('active');

                    var category = faqItem.parentElement;
                    if (!category) return;

                    category.querySelectorAll('.faq-item').forEach(function (item) {
                        if (item !== faqItem) {
                            item.classList.remove('active');
                        }
                    });
                });
            });
        }
    }

    function initBackToTop() {
        var backToTopButton = document.querySelector('.back-to-top');

        if (backToTopButton) {
            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });

            backToTopButton.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (!href || href === '#') return;

                var target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                var navbar = document.querySelector('.navbar');
                var headerHeight = navbar ? navbar.offsetHeight : 0;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initCurrentYear() {
        var yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = String(new Date().getFullYear());
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initServiceTabs();
        initPortfolioFilter();
        initFaqAccordion();
        initBackToTop();
        initSmoothScroll();
        initCurrentYear();
    });
})();
