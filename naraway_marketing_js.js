// Naraway Marketing Page JavaScript - Optimized Version

// Performance optimization: Use passive event listeners where possible
const passiveEventOptions = { passive: true };

// Utility Functions
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Email validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Phone validation
    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    },

    // Animate element with CSS classes
    animateElement(element, className, duration = 300) {
        if (!element) return Promise.resolve();
        
        return new Promise(resolve => {
            element.classList.add(className);
            setTimeout(() => {
                element.classList.remove(className);
                resolve();
            }, duration);
        });
    }
};

// Analytics and Tracking
const Analytics = {
    // Track user interactions
    trackEvent(eventName, properties = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, properties);
        }
        
        // Console log for development
        console.log(`Analytics Event: ${eventName}`, properties);
    },

    // Track page sections viewed
    trackSectionView(sectionName) {
        this.trackEvent('section_viewed', {
            section_name: sectionName,
            timestamp: new Date().toISOString()
        });
    },

    // Track CTA clicks
    trackCTAClick(ctaText, location) {
        this.trackEvent('cta_click', {
            cta_text: ctaText,
            location: location,
            timestamp: new Date().toISOString()
        });
    }
};

// Enhanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.sectionObserverOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        this.setupFadeInObserver();
        this.setupSectionTrackingObserver();
        this.setupParallaxEffects();
    }

    setupFadeInObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupSectionTrackingObserver() {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.getAttribute('data-section') || 
                                      entry.target.className.split(' ')[0] || 
                                      'unknown_section';
                    Analytics.trackSectionView(sectionName);
                }
            });
        }, this.sectionObserverOptions);

        // Observe all major sections
        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        if (parallaxElements.length > 0) {
            const handleParallax = Utils.throttle(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                parallaxElements.forEach(element => {
                    element.style.transform = `translateY(${rate}px)`;
                });
            }, 16); // ~60fps

            window.addEventListener('scroll', handleParallax, passiveEventOptions);
        }
    }
}

// Enhanced Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.testimonials = document.querySelectorAll('.testimonial');
        this.dots = document.querySelectorAll('.slider-dot');
        this.totalSlides = this.testimonials.length;
        this.autoAdvanceInterval = null;
        this.isTransitioning = false;
        
        if (this.totalSlides === 0) {
            console.warn('No testimonials found');
            return;
        }
        
        this.init();
    }

    init() {
        this.setupDotNavigation();
        this.setupKeyboardNavigation();
        this.setupTouchSupport();
        this.setupAutoAdvance();
        this.setupAccessibility();
    }

    setupDotNavigation() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
                Analytics.trackEvent('testimonial_navigation', { 
                    method: 'dot_click',
                    slide_index: index 
                });
            });
        });
    }

    setupKeyboardNavigation() {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        slider.setAttribute('tabindex', '0');
        slider.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    Analytics.trackEvent('testimonial_navigation', { method: 'keyboard_left' });
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    Analytics.trackEvent('testimonial_navigation', { method: 'keyboard_right' });
                    break;
            }
        });
    }

    setupAutoAdvance() {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        // Start auto-advance
        this.startAutoAdvance();
        
        // Pause on hover/focus
        slider.addEventListener('mouseenter', () => this.pauseAutoAdvance());
        slider.addEventListener('mouseleave', () => this.startAutoAdvance());
        slider.addEventListener('focus', () => this.pauseAutoAdvance());
        slider.addEventListener('blur', () => this.startAutoAdvance());

        // Pause when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoAdvance();
            } else {
                this.startAutoAdvance();
            }
        });
    }

    setupAccessibility() {
        // Add ARIA labels
        this.testimonials.forEach((testimonial, index) => {
            testimonial.setAttribute('role', 'tabpanel');
            testimonial.setAttribute('aria-labelledby', `testimonial-${index}`);
            testimonial.setAttribute('aria-hidden', index !== this.currentSlide);
        });

        this.dots.forEach((dot, index) => {
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-controls', `testimonial-${index}`);
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        });
    }

    goToSlide(slideIndex) {
        if (this.isTransitioning || slideIndex === this.currentSlide) return;
        
        this.isTransitioning = true;

        // Update previous slide
        if (this.testimonials[this.currentSlide]) {
            this.testimonials[this.currentSlide].classList.remove('active');
            this.testimonials[this.currentSlide].setAttribute('aria-hidden', 'true');
        }
        
        if (this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.remove('active');
            this.dots[this.currentSlide].setAttribute('aria-selected', 'false');
        }

        // Update current slide
        this.currentSlide = slideIndex;
        
        if (this.testimonials[this.currentSlide]) {
            this.testimonials[this.currentSlide].classList.add('active');
            this.testimonials[this.currentSlide].setAttribute('aria-hidden', 'false');
        }
        
        if (this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].setAttribute('aria-selected', 'true');
        }

        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoAdvance() {
        this.pauseAutoAdvance(); // Clear any existing interval
        this.autoAdvanceInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }

    setupTouchSupport() {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;

        // Touch events
        slider.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }, passiveEventOptions);

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            endY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });

        // Mouse drag support
        let isDragging = false;
        
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.screenX;
            startY = e.screenY;
            slider.style.cursor = 'grabbing';
            e.preventDefault();
        });

        slider.addEventListener('mouseup', (e) => {
            if (isDragging) {
                endX = e.screenX;
                endY = e.screenY;
                this.handleSwipe();
                isDragging = false;
                slider.style.cursor = 'grab';
            }
        });

        slider.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                slider.style.cursor = 'default';
            }
        });

        slider.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const swipeDistanceX = startX - endX;
            const swipeDistanceY = Math.abs(startY - endY);

            // Only process horizontal swipes
            if (Math.abs(swipeDistanceX) > swipeThreshold && swipeDistanceY < 100) {
                if (swipeDistanceX > 0) {
                    this.nextSlide();
                    Analytics.trackEvent('testimonial_navigation', { method: 'swipe_left' });
                } else {
                    this.previousSlide();
                    Analytics.trackEvent('testimonial_navigation', { method: 'swipe_right' });
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// Interactive Elements Handler
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupPricingCards();
        this.setupModelCards();
        this.setupServiceCards();
        this.setupCTAButtons();
        this.setupSmoothScrolling();
    }

    setupPricingCards() {
        document.querySelectorAll('.pricing-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const planName = card.querySelector('h3')?.textContent || 'Unknown Plan';
                const price = card.querySelector('.price')?.textContent || 'Unknown Price';
                
                Analytics.trackCTAClick(planName, 'pricing_section');
                Analytics.trackEvent('pricing_plan_click', {
                    plan_name: planName,
                    price: price
                });
                
                Utils.animateElement(card, 'scale-click', 150);
            });

            // Add hover analytics
            card.addEventListener('mouseenter', () => {
                const planName = card.querySelector('h3')?.textContent || 'Unknown Plan';
                Analytics.trackEvent('pricing_plan_hover', { plan_name: planName });
            });
        });
    }

    setupModelCards() {
        document.querySelectorAll('.model-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const modelType = card.querySelector('h3')?.textContent || 'Unknown Model';
                
                Analytics.trackEvent('engagement_model_click', { model_type: modelType });
                
                this.createRippleEffect(e, card);
            });
        });
    }

    setupServiceCards() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', () => {
                const serviceName = card.querySelector('h3')?.textContent || 'Unknown Service';
                Analytics.trackEvent('service_card_click', { service_name: serviceName });
            });
        });
    }

    setupCTAButtons() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                const section = button.closest('section')?.className || 'unknown_section';
                
                Analytics.trackCTAClick(buttonText, section);
                
                // Add visual feedback
                Utils.animateElement(button, 'btn-click', 200);
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerOffset = 80; // Account for fixed header if any
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    Analytics.trackEvent('anchor_link_click', { target: targetId });
                }
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorPageLoad();
        this.monitorInteractionDelay();
    }

    monitorPageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            Analytics.trackEvent('page_performance', {
                load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                first_paint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0)
            });
        });
    }

    monitorInteractionDelay() {
        let interactionStart = 0;
        
        document.addEventListener('click', () => {
            interactionStart = performance.now();
        });
        
        // Monitor if interactions are responsive
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.processingStart - interactionStart > 100) {
                    Analytics.trackEvent('slow_interaction', {
                        delay: Math.round(entry.processingStart - interactionStart)
                    });
                }
            }
        }).observe({ entryTypes: ['event'] });
    }
}

// Add required CSS animations
const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .scale-click {
        transform: scale(0.98);
        transition: transform 0.15s ease;
    }
    
    .btn-click {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    .testimonial-slider {
        cursor: grab;
    }
    
    .testimonial-slider:active {
        cursor: grabbing;
    }
`;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    // Initialize all components
    new ScrollAnimations();
    new TestimonialSlider();
    new InteractiveElements();
    new PerformanceMonitor();

    // Add staggered animations
    const animateCards = (selector, delay = 100) => {
        document.querySelectorAll(selector).forEach((card, index) => {
            card.style.animationDelay = `${index * delay}ms`;
        });
    };

    animateCards('.service-card', 100);
    animateCards('.campaign-card', 150);
    animateCards('.pricing-card', 120);
    animateCards('.model-card', 100);

    console.log('Naraway Marketing Page initialized successfully! 🚀');
});

// Error handling
window.addEventListener('error', (event) => {
    Analytics.trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno
    });
});

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        Analytics,
        ScrollAnimations,
        TestimonialSlider,
        InteractiveElements,
        PerformanceMonitor
    };
}