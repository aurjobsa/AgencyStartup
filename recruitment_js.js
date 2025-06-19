// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeHeroAnimations();
    initializeCounters();
    initializeScrollAnimations();
    initializeTestimonialCarousel();
    initializeFAQs();
    initializeFormHandling();
    initializeSmoothScrolling();
    initializeRoleCards();
});

// Loading Animation
function initializeLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navCta = document.querySelector('.nav-cta');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // CTA button click
    navCta.addEventListener('click', function() {
        scrollToSection('contact');
    });
}

// Hero Animations
function initializeHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroStats = document.querySelector('.hero-stats');
    const ctaButton = document.querySelector('.cta-primary');
    
    // Animate hero elements on load
    setTimeout(() => {
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.style.opacity = '1';
    }, 500);
    
    setTimeout(() => {
        heroSubtitle.style.transform = 'translateY(0)';
        heroSubtitle.style.opacity = '1';
    }, 700);
    
    setTimeout(() => {
        heroStats.style.transform = 'translateY(0)';
        heroStats.style.opacity = '1';
    }, 900);
    
    setTimeout(() => {
        ctaButton.style.transform = 'translateY(0)';
        ctaButton.style.opacity = '1';
    }, 1100);
    
    // Initial styles for animation
    [heroTitle, heroSubtitle, heroStats, ctaButton].forEach(el => {
        if (el) {
            el.style.transform = 'translateY(30px)';
            el.style.opacity = '0';
            el.style.transition = 'all 0.6s ease';
        }
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .benefit-card,
        .service-card,
        .step,
        .pricing-card,
        .case-study-card,
        .section-title
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.transform = 'translateY(50px)';
        el.style.opacity = '0';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Role Cards Interaction
function initializeRoleCards() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            showRoleModal(role);
        });
    });
}

// Role Modal
function showRoleModal(role) {
    const modal = document.createElement('div');
    modal.className = 'role-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Hiring for ${role}?</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Let us help you find the perfect ${role} for your team. Our specialized recruitment process ensures quality candidates that match your requirements.</p>
                <div class="modal-features">
                    <div class="feature">
                        <i class="fas fa-clock"></i>
                        <span>48-72 hour turnaround</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-user-check"></i>
                        <span>Pre-screened candidates</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-handshake"></i>
                        <span>Interview coordination</span>
                    </div>
                </div>
                <button class="modal-cta" onclick="scrollToSection('contact'); closeModal()">
                    Start Hiring ${role}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    setTimeout(() => modal.style.opacity = '1', 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
    
    // Add modal styles to head if not exists
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal-content {
                background: white;
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            .role-modal[style*="opacity: 1"] .modal-content {
                transform: scale(1);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 1rem;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
            }
            .modal-features {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin: 1.5rem 0;
            }
            .modal-features .feature {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #374151;
            }
            .modal-features i {
                color: #3b82f6;
            }
            .modal-cta {
                width: 100%;
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            .modal-cta:hover {
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(styles);
    }
}

// Testimonial Carousel
function initializeTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const totalSlides = indicators.length;
    
    function showSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
                showSlide(currentSlide);
            }
        }
    }
}

// FAQ Functionality
function initializeFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                answer.style.maxHeight = '0';
            });
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Form Handling
function initializeFormHandling() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .pricing-cta, .nav-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent.includes('Book a Call')) {
                showContactForm('call');
            } else {
                showContactForm('hire');
            }
        });
    });
}

// Contact Form Modal
function showContactForm(type) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    
    const formTitle = type === 'call' ? 'Book a Strategy Call' : 'Start Your Hiring Process';
    const submitText = type === 'call' ? 'Schedule Call' : 'Submit Requirements';
    
    modal.innerHTML = `
        <div class="contact-modal-content">
            <div class="contact-modal-header">
                <h3>${formTitle}</h3>
                <button class="contact-modal-close">&times;</button>
            </div>
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label for="companyName">Company Name *</label>
                    <input type="text" id="companyName" name="companyName" required>
                </div>
                <div class="form-group">
                    <label for="contactName">Your Name *</label>
                    <input type="text" id="contactName" name="contactName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="roleType">What roles are you hiring for? *</label>
                    <select id="roleType" name="roleType" required>
                        <option value="">Select role type</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="Marketing Lead">Marketing Lead</option>
                        <option value="Operations Manager">Operations Manager</option>
                        <option value="Sales Executive">Sales Executive</option>
                        <option value="CTO/Tech Lead">CTO/Tech Lead</option>
                        <option value="Multiple Roles">Multiple Roles</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="timeline">When do you need to fill these positions?</label>
                    <select id="timeline" name="timeline">
                        <option value="">Select timeline</option>
                        <option value="ASAP">ASAP (Within 2 weeks)</option>
                        <option value="1 month">Within 1 month</option>
                        <option value="2-3 months">2-3 months</option>
                        <option value="Flexible">Flexible timeline</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">Additional Details</label>
                    <textarea id="message" name="message" rows="4" placeholder="Tell us about your company, team size, specific requirements, etc."></textarea>
                </div>
                <button type="submit" class="form-submit-btn">
                    ${submitText}
                    <i class="fas fa-arrow-right"></i>
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        overflow-y: auto;
        padding: 20px;
    `;
    
    setTimeout(() => modal.style.opacity = '1', 10);
    
    // Form submission
    const form = modal.querySelector('#contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.form-submit-btn');
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!';
            setTimeout(() => {
                closeContactModal();
                showSuccessMessage();
            }, 1500);
        }, 2000);
    });
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.contact-modal-close');
    closeBtn.addEventListener('click', closeContactModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeContactModal();
    });
    
    function closeContactModal() {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
    
    // Add form styles if not exists
    if (!document.querySelector('#form-styles')) {
        const styles = document.createElement('style');
        styles.id = 'form-styles';
        styles.textContent = `
            .contact-modal-content {
                background: white;
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            .contact-modal[style*="opacity: 1"] .contact-modal-content {
                transform: scale(1);
            }
            .contact-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 1rem;
            }
            .contact-modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #374151;
            }
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            .form-submit-btn {
                width: 100%;
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                color: white;
                padding: 15px;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            .form-submit-btn:hover:not(:disabled) {
                transform: translateY(-2px);
            }
            .form-submit-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Success Message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your interest!</h3>
            <p>We'll get back to you within 24 hours with next steps.</p>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => message.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        message.style.transform = 'translateX(400px)';
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events that don't need immediate response
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for performance improvements
document.querySelectorAll('.benefit-card, .service-card, .case-study-card').forEach(el => {
    performanceObserver.observe(el);
});

console.log('Recruitment page initialized successfully! 🚀');