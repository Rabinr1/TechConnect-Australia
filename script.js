document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    // Ensure elements exist before adding listeners
    if (mobileToggle && navLinks) {
        // --- 1. Mobile Menu Toggle Functionality ---

        // Toggles the mobile menu open/closed
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change the hamburger icon (☰) to an X (✕) when active
            mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });


        // --- 2. Smooth Scrolling and Menu Closing ---

        // Handles smooth scrolling for all internal anchor links (like #about)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Check if the link is on the index.html page (internal link)
                if (this.pathname === window.location.pathname) {
                    e.preventDefault();
                    
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        
                        // Close mobile menu after clicking an anchor link
                        navLinks.classList.remove('active');
                        mobileToggle.textContent = '☰';
                    }
                }
            });
        });
    }

    // --- 3. Close Menu on External Page Anchor Links ---

    // Note: Since links to index.html#about from service-details.html are external links, 
    // we should ensure the menu closes if any nav link is clicked.
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu regardless of the link type
            navLinks.classList.remove('active');
            mobileToggle.textContent = '☰';
        });
    });
});