// =========================================
// MOBILE NAVIGATION TOGGLE
// =========================================
export function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Remove body overflow hidden to prevent black screen
            // document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                // document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(event.target) &&
                !navToggle.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                // document.body.style.overflow = '';
            }
        });
    }
}
