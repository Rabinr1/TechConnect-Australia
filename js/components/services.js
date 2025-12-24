// =========================================
// SERVICE TABS FUNCTIONALITY
// =========================================
export function initServiceTabs() {
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
}
