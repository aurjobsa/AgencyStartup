// Animate on Scroll (AOS) Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add smooth scrolling
    initializeSmoothScrolling();
    
    // Add card interactions
    initializeCardInteractions();
    
    // Add parallax effect to hero
    initializeParallaxEffect();
});

// Animation on Scroll Implementation
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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

// Enhanced card interactions
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.case-card');
    
    cards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
        
        // Add click animation
        card.addEventListener('click', handleCardClick);
        
        // Add focus for accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick.call(this);
            }
        });
    });
}

// Card tilt effect
function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
}

// Reset card tilt
function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = '';
}

// Card click animation
function handleCardClick() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
    
    // Add ripple effect
    createRippleEffect(this, event);
}

// Create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        z-index: 1;
    `;
    
    // Add ripple styles if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .case-card {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Parallax effect for hero section
function initializeParallaxEffect() {
    const hero = document.querySelector('.hero-section');
    const heroAnimation = document.querySelector('.hero-bg-animation');
    
    if (!hero || !heroAnimation) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroAnimation.style.transform = `translateY(${rate}px)`;
    });
}

// Counter animation for results
function animateCounters() {
    const counters = document.querySelectorAll('.results-section li');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const numbers = text.match(/\d+/g);
        
        if (numbers) {
            numbers.forEach(num => {
                animateNumber(counter, parseInt(num), text);
            });
        }
    });
}

// Animate number counting
function animateNumber(element, target, originalText) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const newText = originalText.replace(/\d+/, Math.floor(current));
        element.textContent = newText;
    }, 20);
}

// Loading animation
function showLoadingAnimation() {
    const cards = document.querySelectorAll('.case-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Intersection Observer for counter animation
function initializeCounterAnimation() {
    const resultsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const counters = entry.target.querySelectorAll('li');
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });

    const resultsSections = document.querySelectorAll('.results-section');
    resultsSections.forEach(section => {
        resultsObserver.observe(section);
    });
}

// Individual counter animation
function animateCounter(element) {
    const text = element.textContent;
    const numbers = text.match(/\d+/g);
    
    if (numbers && numbers.length > 0) {
        const targetNumber = parseInt(numbers[0]);
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 30);
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            
            const newText = text.replace(/\d+/, currentNumber.toLocaleString());
            element.textContent = newText;
        }, 50);
    }
}

// Enhanced scroll effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const hero = document.querySelector('.hero-bg-animation');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Cards parallax (subtle)
        const cards = document.querySelectorAll('.case-card');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const speed = 0.1 + (index % 3) * 0.05;
                const yPos = scrolled * speed;
                card.style.transform = `translateY(${-yPos}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Mouse trail effect (optional enhancement)
function initializeMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
            
            if (index === 0) {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
            } else {
                const prevDot = trail[index - 1];
                const dx = (prevDot.offsetLeft - dot.offsetLeft) * 0.3;
                const dy = (prevDot.offsetTop - dot.offsetTop) * 0.3;
                
                dot.style.left = dot.offsetLeft + dx + 'px';
                dot.style.top = dot.offsetTop + dy + 'px';
            }
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Performance optimization
function optimizeAnimations() {
    // Use will-change for better performance
    const animatedElements = document.querySelectorAll('.case-card, .hero-bg-animation');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform';
    });
    
    // Clean up will-change after animations
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 3000);
}

// Initialize all features
function initializeAllFeatures() {
    initializeAnimations();
    initializeSmoothScrolling();
    initializeCardInteractions();
    initializeParallaxEffect();
    initializeCounterAnimation();
    initializeScrollEffects();
    optimizeAnimations();
    
    // Optional: Enable mouse trail on desktop
    if (window.innerWidth > 768) {
        // initializeMouseTrail(); // Uncomment to enable
    }
    
    // Show loading animation
    setTimeout(showLoadingAnimation, 100);
}

// Update the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', initializeAllFeatures);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize responsive features
    const cards = document.querySelectorAll('.case-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
}, 250));

// Debounce utility function
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