// Legal & Compliance Solutions - JavaScript
// Author: Naraway Solutions
// Last Updated: 2025

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoader();
    initializeNavbar();
    initializeLegalCards();
    initializeFAQ();
    initializeScrollAnimations();
    initializePricingCards();
    initializeContactForm();
    
    // Remove loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            const loader = document.getElementById('loadingOverlay');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 1000);
    });
});

// Loading Animation
function initializeLoader() {
    const loader = document.getElementById('loadingOverlay');
    if (loader) {
        // Add loading states for different elements
        const loadingStates = [
            'Initializing Legal Framework...',
            'Loading Compliance Modules...',
            'Preparing Documentation...',
            'Ready to Launch!'
        ];
        
        let currentState = 0;
        const interval = setInterval(() => {
            if (currentState < loadingStates.length - 1) {
                currentState++;
            } else {
                clearInterval(interval);
            }
        }, 500);
    }
}

// Navbar Functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when clicking on links
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Legal Cards Animation
function initializeLegalCards() {
    const legalCards = document.querySelectorAll('.legal-card');
    
    legalCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) translateY(-15px)';
            this.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
        });
        
        // Add click effects
        card.addEventListener('click', function() {
            const cardType = this.getAttribute('data-legal');
            showLegalCardDetails(cardType);
        });
        
        // Stagger animation delays
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Show legal card details
function showLegalCardDetails(cardType) {
    const details = {
        'Registration': 'Complete company registration services including Pvt Ltd, LLP, and OPC formations.',
        'Compliance': 'Annual compliance management with automated tracking and deadline notifications.',
        'Grants': 'Government grant assistance and funding support for eligible startups.',
        'Documentation': 'Comprehensive legal documentation suite for all business needs.'
    };
    
    // Create modal or tooltip (simplified version)
    const tooltip = document.createElement('div');
    tooltip.className = 'legal-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <h4>${cardType}</h4>
            <p>${details[cardType]}</p>
        </div>
    `;
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('benefit-card')) {
                    animateBenefitCard(entry.target);
                } else if (entry.target.classList.contains('step')) {
                    animateProcessStep(entry.target);
                } else if (entry.target.classList.contains('case-study-card')) {
                    animateCaseStudy(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.benefit-card, .use-case-card, .why-card, .step, .case-study-card, .pricing-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Animate benefit cards
function animateBenefitCard(card) {
    const icon = card.querySelector('.benefit-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 300);
        }, 200);
    }
}

// Animate process steps
function animateProcessStep(step) {
    const stepNumber = step.querySelector('.step-number');
    if (stepNumber) {
        stepNumber.style.transform = 'scale(1.2)';
        stepNumber.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ffd700 100%)';
        
        setTimeout(() => {
            stepNumber.style.transform = '';
            stepNumber.style.background = '';
        }, 500);
    }
}

// Animate case studies
function animateCaseStudy(card) {
    const results = card.querySelectorAll('.result-number');
    results.forEach((result, index) => {
        const finalValue = result.textContent;
        result.textContent = '0';
        
        setTimeout(() => {
            animateNumber(result, finalValue);
        }, index * 200);
    });
}

// Animate numbers
function animateNumber(element, finalValue) {
    const isPercent = finalValue.includes('%');
    const isCurrency = finalValue.includes('₹');
    const isText = isNaN(finalValue.replace(/[₹%LDays]/g, ''));
    
    if (isText) {
        element.textContent = finalValue;
        return;
    }
    
    const numericValue = parseInt(finalValue.replace(/[₹%LDays]/g, ''));
    let currentValue = 0;
    const increment = numericValue / 30;
    
    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(interval);
        }
        
        let displayValue = Math.floor(currentValue);
        if (isCurrency) displayValue = '₹' + displayValue + 'L';
        else if (isPercent) displayValue = displayValue + '%';
        else if (finalValue.includes('Days')) displayValue = displayValue + ' Days';
        
        element.textContent = displayValue;
    }, 50);
}

// Pricing Cards Functionality
function initializePricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const ctaButton = card.querySelector('.pricing-cta');
        
        ctaButton.addEventListener('click', function() {
            const planName = card.querySelector('h3').textContent;
            handlePricingSelection(planName);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = '';
            }
        });
    });
}

// Handle pricing selection
function handlePricingSelection(planName) {
    // Show selection confirmation
    const notification = document.createElement('div');
    notification.className = 'pricing-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>Great choice! You selected the <strong>${planName}</strong></p>
            <p>Redirecting to consultation booking...</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Simulate redirect after 2 seconds
    setTimeout(() => {
        notification.remove();
        scrollToSection('contact');
    }, 2000);
}

// Contact Form Functionality
function initializeContactForm() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .nav-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Schedule') || this.textContent.includes('Get Started')) {
                showContactModal();
            }
        });
    });
}

// Show contact modal
function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Schedule Your Free Legal Consultation</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="contact-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" required>
                        </div>
                        <div class="form-group">
                            <label>Company Name</label>
                            <input type="text">
                        </div>
                        <div class="form-group">
                            <label>Legal Service Interest</label>
                            <select required>
                                <option value="">Select Service</option>
                                <option value="registration">Company Registration</option>
                                <option value="compliance">Annual Compliance</option>
                                <option value="startup-india">Startup India Registration</option>
                                <option value="grants">Government Grants</option>
                                <option value="documentation">Legal Documentation</option>
                                <option value="consultation">General Consultation</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Message (Optional)</label>
                            <textarea rows="3" placeholder="Tell us about your legal requirements..."></textarea>
                        </div>
                        <button type="submit" class="form-submit">Schedule Consultation</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
    
    // Form submission
    const form = modal.querySelector('.contact-form');
    form.addEventListener('submit', handleFormSubmission);
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Consultation Scheduled!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            const modal = document.querySelector('.contact-modal');
            if (modal) modal.remove();
            
            // Show success message
            showSuccessMessage();
        }, 1500);
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>Consultation Scheduled Successfully!</h4>
            <p>Our legal expert will contact you within 24 hours to confirm your appointment.</p>
            <p>Check your email for confirmation details.</p>
        </div>
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add dynamic styles for modals and animations
const dynamicStyles = `
    .contact-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        animation: modalFadeIn 0.3s ease;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
    }
    
    .modal-header {
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #667eea;
    }
    
    .form-submit {
        width: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 14px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .form-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    
    .success-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        text-align: center;
        animation: modalFadeIn 0.3s ease;
    }
    
    .success-content i {
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
    }
    
    .pricing-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content i {
        color: #10b981;
        font-size: 1.5rem;
    }
    
    .legal-tooltip {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10001;
        animation: tooltipFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes tooltipFadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);