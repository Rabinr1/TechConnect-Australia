// =========================================
// PORTFOLIO FILTERING (Optimized)
// =========================================
export function initPortfolioFilter() {
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
}
