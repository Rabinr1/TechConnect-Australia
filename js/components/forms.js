// =========================================
// FORM SUBMISSION HANDLING
// =========================================
export function initContactForm() {
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

                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            successDiv.remove();
                        }, 5000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    // Create error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'form-error animate-fade-in-up';
                    errorDiv.innerHTML = `
                    <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 1.5rem; border-radius: 0.75rem; text-align: center;">
                        <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h4 style="color: white; margin-bottom: 0.5rem;">Submission Failed</h4>
                        <p style="color: rgba(255, 255, 255, 0.9); margin: 0;">Please try again later or contact us directly.</p>
                    </div>
                `;

                    // Insert error message
                    this.parentNode.insertBefore(errorDiv, this.nextSibling);

                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        errorDiv.remove();
                    }, 5000);
                })
                .finally(() => {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}
