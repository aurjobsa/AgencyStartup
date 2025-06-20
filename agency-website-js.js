document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen after 2 seconds
    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
    }, 2000);

    // Toggle mobile menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.innerHTML = `
        <div class="close-menu"><i class="fas fa-times"></i></div>
        <ul class="mobile-nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">Our Work</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" class="btn-primary">Get Started</a>
    `;
    document.body.appendChild(mobileMenu);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    document.querySelector('.close-menu').addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Scroll to sections smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        // Sticky header
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }

        // Add active class to current section in navigation
        highlightCurrentSection();
        
        // Animate elements on scroll
        revealOnScroll();
    });

    // Back to top button
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Highlight current section in navigation
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links li a');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show all items if filter is "all"
            if (filter === 'all') {
                workItems.forEach(item => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                });
            } else {
                // Filter items
                workItems.forEach(item => {
                    if (item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    });

    // Testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.control-prev');
    const nextBtn = document.querySelector('.control-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
        showSlide(currentSlide);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide change
    let testimonialInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            showSlide(currentSlide);
        }, 5000);
    });
    
    // Add scroll reveal animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    // Add reveal classes to elements
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('reveal');
    });
    
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add('reveal');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.about-image').forEach(el => {
        el.classList.add('reveal-left');
    });
    
    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('reveal-right');
    });
    
    document.querySelectorAll('.work-item').forEach(el => {
        el.classList.add('reveal');
    });
    
    document.querySelectorAll('.contact-info').forEach(el => {
        el.classList.add('reveal-left');
    });
    
    document.querySelectorAll('.contact-form').forEach(el => {
        el.classList.add('reveal-right');
    });
    
    // Initialize reveal on load
    setTimeout(revealOnScroll, 100);
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                markInvalid(name, 'Please enter your name');
                valid = false;
            } else {
                markValid(name);
            }
            
            if (email.value.trim() === '') {
                markInvalid(email, 'Please enter your email');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                markInvalid(email, 'Please enter a valid email');
                valid = false;
            } else {
                markValid(email);
            }
            
            if (message.value.trim() === '') {
                markInvalid(message, 'Please enter your message');
                valid = false;
            } else {
                markValid(message);
            }
            
            if (valid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    submitBtn.innerHTML = 'Message Sent!';

                    // // Create the mailto link
                    // const mailtoLink = `mailto:aurjobsa@gmail.com?subject=New%20Message%20from%20${encodeURIComponent(name.value)}&body=Name:%20${encodeURIComponent(name.value)}%0AEmail:%20${encodeURIComponent(email.value)}%0AMessage:%20${encodeURIComponent(message.value)}`;

                    // // Redirect to the mailto link to open the user's email client
                    // window.location.href = mailtoLink;

                    
                    // e.preventDefault();

                    // const formData = {
                    //     "First name": document.getElementById("firstName").value || "",
                    //     "Last name": document.getElementById("lastName")?.value || "",
                    //     "Phone number": document.getElementById("phone")?.value || "",
                    //     "Email": document.getElementById("email").value || "",
                    //     "Your question": document.getElementById("question").value || "",
                    //     "Submitted at": new Date().toISOString(),
                    //     "Submission ID": "SheetDB_" + Math.floor(Math.random() * 100000),
                    //     "Respondent ID": "ContactForm"
                    // };

                    // fetch("https://sheetdb.io/api/v1/7wko7s34o8m02", {
                    //     method: "POST",
                    //     headers: { "Content-Type": "application/json" },
                    //     body: JSON.stringify({ data: formData }),
                    // })
                    // .then(res => {
                    //     if (res.ok) {
                    //     alert("Form submitted successfully!");
                    //     document.getElementById("contactForm").reset();
                    //     } else {
                    //     alert("Submission failed. Please try again.");
                    //     }
                    // })
                    // .catch(err => {
                    //     console.error(err);
                    //     alert("Something went wrong.");
                    // });

                    
                    
                    // Show success alert
                    const successAlert = document.createElement('div');
                    successAlert.classList.add('alert-success');
                    successAlert.innerHTML = 'Your message has been sent successfully!';
                    contactForm.appendChild(successAlert);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove success message after 3 seconds
                    setTimeout(function() {
                        successAlert.remove();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    function markInvalid(element, message) {
        element.classList.add('invalid');
        
        // Remove existing error message if any
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.innerHTML = message;
        element.parentElement.appendChild(errorMessage);
    }
    
    function markValid(element) {
        element.classList.remove('invalid');
        
        // Remove error message if any
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                emailInput.classList.add('invalid');
                return;
            }
            
            // Simulate subscription
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                // Show success message
                newsletterForm.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
                
                // Reset after 3 seconds
                setTimeout(function() {
                    newsletterForm.innerHTML = `
                        <input type="email" placeholder="Your Email" required>
                        <button type="submit"><i class="fas fa-paper-plane"></i></button>
                    `;
                }, 3000);
            }, 1500);
        });
    }
    
    // Add floating animation to specific elements
    document.querySelectorAll('.service-icon, .achievement-item, .about-image .image-card').forEach(el => {
        el.classList.add('float-animation');
    });
    
    // Add floating animation with different delays
    let delay = 0;
    document.querySelectorAll('.service-icon').forEach(el => {
        el.style.animationDelay = `${delay}s`;
        delay += 0.5;
    });
    
    // Add CSS for error messages
    const style = document.createElement('style');
    style.textContent = `
        .invalid {
            border-color: #e53e3e !important;
        }
        
        .error-message {
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .alert-success {
            background-color: #10b981;
            color: white;
            padding: 0.75rem;
            border-radius: 0.375rem;
            margin-top: 1rem;
            text-align: center;
        }
        
        .success-message {
            color: #10b981;
            font-weight: 500;
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
});


// Add this code to your existing agency-website-js.js file

// Content handling for service and project pages
(function() {
    // Create content container for dynamic pages
    const dynamicContainer = document.createElement('section');
    dynamicContainer.id = 'page-content';
    dynamicContainer.className = 'page-content';
    
    // Insert before footer
    const footer = document.querySelector('footer');
    document.body.insertBefore(dynamicContainer, footer);
    
    // Initialize service and work links
    initializeDynamicPageLinks();
    
    // Handle browser history
    window.addEventListener('popstate', handlePopState);
    
    // Check URL on load for direct page access
    checkUrlForPageRequest();
    
    /**
     * Initialize all service and project links for dynamic loading
     */
    function initializeDynamicPageLinks() {
        // Service links
        document.querySelectorAll('.service-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceId = this.closest('.service-card').querySelector('h3').innerText
                    .toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
                loadServicePage(serviceId);
            });
        });
        
        // Project links
        document.querySelectorAll('.work-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.closest('.work-item').querySelector('h4').innerText
                    .toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
                loadProjectPage(projectId);
            });
        });
        
        // "View All Projects" link
        const viewAllLink = document.querySelector('.view-more .btn-secondary');
        if (viewAllLink) {
            viewAllLink.addEventListener('click', function(e) {
                e.preventDefault();
                loadAllProjectsPage();
            });
        }
    }
    
    /**
     * Handle browser back/forward navigation
     */
    function handlePopState(e) {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            if (hash.startsWith('service-')) {
                loadServicePage(hash.replace('service-', ''), false);
            } else if (hash.startsWith('project-')) {
                loadProjectPage(hash.replace('project-', ''), false);
            } else if (hash === 'all-projects') {
                loadAllProjectsPage(false);
            }
        } else {
            // Return to main page
            closeDynamicPage();
        }
    }
    
    /**
     * Check URL on page load for direct navigation
     */
    function checkUrlForPageRequest() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            if (hash.startsWith('service-')) {
                loadServicePage(hash.replace('service-', ''), false);
            } else if (hash.startsWith('project-')) {
                loadProjectPage(hash.replace('project-', ''), false);
            } else if (hash === 'all-projects') {
                loadAllProjectsPage(false);
            }
        }
    }
    
    /**
     * Load service page content
     */
    function loadServicePage(serviceId, updateHistory = true) {
        // Get service details from available service cards
        const services = getServiceDetails();
        const service = services.find(s => s.id === serviceId) || getDefaultService(serviceId);
        
        // Update URL if needed
        if (updateHistory) {
            window.history.pushState({type: 'service', id: serviceId}, '', `#service-${serviceId}`);
        }
        
        // Create service page content
        const content = `
            <div class="page-header">
                <div class="container">
                    <h1>${service.title}</h1>
                    <div class="breadcrumbs">
                        <a href="#" onclick="event.preventDefault(); window.history.back();">Home</a> / 
                        <a href="#services">Services</a> / 
                        <span>${service.title}</span>
                    </div>
                </div>
                <button class="close-page"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="container">
                <div class="service-detail">
                    <div class="service-hero">
                        <div class="service-icon large">
                            <i class="${service.icon}"></i>
                        </div>
                        <div class="service-intro">
                            <p>${service.description}</p>
                        </div>
                    </div>
                    
                    <div class="service-content">
                        <div class="service-image">
                            <img src="${service.image}" alt="${service.title}">
                        </div>
                        
                        <div class="features-section">
                            <h2>Key Features</h2>
                            <div class="features-grid">
                                ${service.features.map(feature => `
                                    <div class="feature-item">
                                        <div class="feature-icon">
                                            <i class="${feature.icon}"></i>
                                        </div>
                                        <h3>${feature.title}</h3>
                                        <p>${feature.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="process-section">
                            <h2>Our Process</h2>
                            <div class="process-steps">
                                ${service.process.map((step, index) => `
                                    <div class="process-step">
                                        <div class="step-number">${index + 1}</div>
                                        <h3>${step.title}</h3>
                                        <p>${step.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="cta-box">
                            <h2>Ready to get started?</h2>
                            <p>Contact us today to discuss your project.</p>
                            <a href="#contact" class="btn-primary">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Show page
        showDynamicPage(content);
    }
    
    /**
     * Load project page content
     */
    function loadProjectPage(projectId, updateHistory = true) {
        // Get project details from available work items
        const projects = getProjectDetails();
        const project = projects.find(p => p.id === projectId) || getDefaultProject(projectId);
        
        // Update URL if needed
        if (updateHistory) {
            window.history.pushState({type: 'project', id: projectId}, '', `#project-${projectId}`);
        }
        
        // Create project page content
        const content = `
            <div class="page-header">
                <div class="container">
                    <h1>${project.title}</h1>
                    <div class="breadcrumbs">
                        <a href="#" onclick="event.preventDefault(); window.history.back();">Home</a> / 
                        <a href="#work">Projects</a> / 
                        <span>${project.title}</span>
                    </div>
                </div>
                <button class="close-page"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="container">
                <div class="project-detail">
                    <div class="project-hero">
                        <img src="/api/placeholder/1200/600" alt="${project.title}">
                    </div>
                    
                    <div class="project-info">
                        <div class="project-meta">
                            <div class="meta-item">
                                <h4>Client</h4>
                                <p>${project.client}</p>
                            </div>
                            <div class="meta-item">
                                <h4>Services</h4>
                                <p>${project.services.join(', ')}</p>
                            </div>
                            <div class="meta-item">
                                <h4>Duration</h4>
                                <p>${project.duration}</p>
                            </div>
                            <div class="meta-item">
                                <h4>Category</h4>
                                <p>${project.category}</p>
                            </div>
                        </div>
                        
                        <div class="project-content">
                            <h2>Project Overview</h2>
                            <p>${project.overview}</p>
                            
                            <h2>Challenge</h2>
                            <p>${project.challenge}</p>
                            
                            <h2>Solution</h2>
                            <p>${project.solution}</p>
                            
                            <h2>Results</h2>
                            <p>${project.results}</p>
                            
                            <div class="project-gallery">
                                <h2>Gallery</h2>
                                <div class="gallery-grid">
                                    ${Array(4).fill().map((_, i) => `
                                        <div class="gallery-item">
                                            <img src="/api/placeholder/600/400" alt="${project.title} ${i+1}">
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="testimonial-box">
                                <div class="quote-icon">
                                    <i class="fas fa-quote-left"></i>
                                </div>
                                <p>${project.testimonial.quote}</p>
                                <div class="testimonial-author">
                                    <div class="author-info">
                                        <h4>${project.testimonial.author}</h4>
                                        <p>${project.testimonial.position}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="project-nav">
                                <a href="#" class="prev-project" onclick="event.preventDefault(); loadAdjacentProject('${projectId}', 'prev')">
                                    <i class="fas fa-arrow-left"></i> Previous Project
                                </a>
                                <a href="#" class="next-project" onclick="event.preventDefault(); loadAdjacentProject('${projectId}', 'next')">
                                    Next Project <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Show page
        showDynamicPage(content);
    }
    
    /**
     * Load all projects page
     */
    function loadAllProjectsPage(updateHistory = true) {
        const projects = getProjectDetails();
        
        // Update URL if needed
        if (updateHistory) {
            window.history.pushState({type: 'all-projects'}, '', '#all-projects');
        }
        
        // Create all projects page content
        const content = `
            <div class="page-header">
                <div class="container">
                    <h1>Our Projects</h1>
                    <div class="breadcrumbs">
                        <a href="#" onclick="event.preventDefault(); window.history.back();">Home</a> / 
                        <span>All Projects</span>
                    </div>
                </div>
                <button class="close-page"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="container">
                <div class="projects-page">
                    <div class="filter-section">
                        <div class="filter-buttons">
                            <button class="filter-btn active" data-filter="all">All</button>
                            <button class="filter-btn" data-filter="it">IT Solutions</button>
                            <button class="filter-btn" data-filter="design">Design</button>
                            <button class="filter-btn" data-filter="marketing">Marketing</button>
                            <button class="filter-btn" data-filter="video">Video</button>
                        </div>
                    </div>
                    
                    <div class="projects-grid">
                        ${projects.map(project => `
                            <div class="project-card" data-category="${project.categorySlug}">
                                <div class="project-image">
                                    <img src="/api/placeholder/600/400" alt="${project.title}">
                                    <div class="project-overlay">
                                        <div class="project-info">
                                            <h3>${project.title}</h3>
                                            <p>${project.services.join(', ')}</p>
                                            <a href="#project-${project.id}" class="btn-secondary view-project">
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Show page
        showDynamicPage(content);
        
        // Initialize filter buttons on all projects page
        initializeProjectFilters();
        
        // Initialize project links on all projects page
        document.querySelectorAll('.view-project').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('href').replace('#project-', '');
                loadProjectPage(projectId);
            });
        });
    }
    
    /**
     * Display dynamic page content with animation
     */
    function showDynamicPage(content) {
        dynamicContainer.innerHTML = content;
        dynamicContainer.classList.add('active');
        document.body.classList.add('page-open');
        
        // Scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add close button event listener
        const closeButton = dynamicContainer.querySelector('.close-page');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                closeDynamicPage();
                window.history.pushState({}, '', window.location.pathname);
            });
        }
        
        // Add smooth scroll for internal links
        dynamicContainer.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        closeDynamicPage();
                        setTimeout(() => {
                            window.scrollTo({
                                top: target.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                }
            });
        });
    }
    
    /**
     * Close dynamic page
     */
    function closeDynamicPage() {
        dynamicContainer.classList.remove('active');
        document.body.classList.remove('page-open');
        setTimeout(() => {
            dynamicContainer.innerHTML = '';
        }, 500);
    }
    
    /**
     * Initialize filter buttons on the all projects page
     */
    function initializeProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-section .filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                if (filter === 'all') {
                    projectCards.forEach(card => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    });
                } else {
                    projectCards.forEach(card => {
                        if (card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });
    }
    
    /**
     * Navigate to adjacent project
     */
    function loadAdjacentProject(currentId, direction) {
        const projects = getProjectDetails();
        const currentIndex = projects.findIndex(p => p.id === currentId);
        
        if (currentIndex !== -1) {
            let targetIndex;
            
            if (direction === 'next') {
                targetIndex = (currentIndex + 1) % projects.length;
            } else {
                targetIndex = (currentIndex - 1 + projects.length) % projects.length;
            }
            
            loadProjectPage(projects[targetIndex].id);
        }
    }
    
    /**
     * Extract service details from the DOM
     */
    function getServiceDetails() {
    const services = [];

    // Array of image URLs in the same order as the service cards
    const serviceImages = [
        'BusinessCounsulting.png',
        'IT Services.png',
        'Recruiting.png',
        'Video.png',
        'Graphics.png',
        'Marketing.png',
        'Marketign.png'
    ];

    document.querySelectorAll('.service-card').forEach((card, index) => {
        const title = card.querySelector('h3').innerText;
        const description = card.querySelector('p').innerText;
        const iconElement = card.querySelector('.service-icon i');
        const icon = iconElement ? iconElement.className : 'fas fa-star';

        const id = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');

        services.push({
            id,
            title,
            description,
            icon,
            image: serviceImages[index] || '',  // Map image by index
            features: getDefaultFeatures(id),
            process: getDefaultProcess()
        });
    });

    return services;
}

    
    /**
     * Extract project details from the DOM
     */
    function getProjectDetails() {
        const projects = [];
        document.querySelectorAll('.work-item').forEach(item => {
            const title = item.querySelector('h4').innerText;
            const categoryText = item.querySelector('p').innerText;
            const services = categoryText.split(', ');
            const category = services[0];
            const categorySlug = item.getAttribute('data-category');
            
            const id = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
            
            projects.push({
                id,
                title,
                services,
                category,
                categorySlug,
                client: `Client ${projects.length + 1}`,
                duration: '3 months',
                overview: 'This project aimed to revolutionize the client\'s business operations through cutting-edge technology and creative solutions.',
                challenge: 'The client faced significant challenges with outdated systems and inefficient processes that were impacting their bottom line.',
                solution: 'We implemented a comprehensive solution that addressed all pain points while providing a scalable platform for future growth.',
                results: 'The project resulted in a 40% increase in efficiency, 25% reduction in operational costs, and significantly improved customer satisfaction scores.',
                testimonial: {
                    quote: 'Working with Nexus Solutions was a game-changer for our business. Their expertise and dedication transformed our operations and exceeded our expectations.',
                    author: 'John Smith',
                    position: 'CTO'
                }
            });
        });
        
        return projects;
    }
    
    /**
     * Get default service details
     */
    function getDefaultService(serviceId) {
        return {
            id: serviceId,
            title: serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: 'We provide comprehensive solutions tailored to your business needs with a focus on quality and innovation.',
            icon: 'fas fa-star',
            features: getDefaultFeatures(serviceId),
            process: getDefaultProcess()
        };
    }
    
    /**
     * Get default project details
     */
    function getDefaultProject(projectId) {
        return {
            id: projectId,
            title: projectId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            services: ['Web Development', 'Design'],
            category: 'IT Solutions',
            categorySlug: 'it',
            client: 'Client Name',
            duration: '3 months',
            overview: 'This project aimed to revolutionize the client\'s business operations through cutting-edge technology and creative solutions.',
            challenge: 'The client faced significant challenges with outdated systems and inefficient processes that were impacting their bottom line.',
            solution: 'We implemented a comprehensive solution that addressed all pain points while providing a scalable platform for future growth.',
            results: 'The project resulted in a 40% increase in efficiency, 25% reduction in operational costs, and significantly improved customer satisfaction scores.',
            testimonial: {
                quote: 'Working with Nexus Solutions was a game-changer for our business. Their expertise and dedication transformed our operations and exceeded our expectations.',
                author: 'John Smith',
                position: 'CTO'
            }
        };
    }
    
    /**
     * Get default features for a service
     */
    function getDefaultFeatures(serviceId) {
        const featuresByService = {
            'it-solutions': [
                {
                    icon: 'fas fa-code',
                    title: 'Custom Development',
                    description: 'Tailored software solutions to meet your specific business needs.'
                },
                {
                    icon: 'fas fa-mobile-alt',
                    title: 'Mobile Apps',
                    description: 'Native and cross-platform mobile applications for iOS and Android.'
                },
                {
                    icon: 'fas fa-server',
                    title: 'Cloud Solutions',
                    description: 'Secure, scalable, and reliable cloud infrastructure services.'
                },
                {
                    icon: 'fas fa-shield-alt',
                    title: 'Cybersecurity',
                    description: 'Comprehensive security solutions to protect your digital assets.'
                }
            ],
            'recruitment': [
                {
                    icon: 'fas fa-search',
                    title: 'Talent Acquisition',
                    description: 'Strategic recruitment to find the best candidates for your positions.'
                },
                {
                    icon: 'fas fa-user-tie',
                    title: 'Executive Search',
                    description: 'Specialized recruitment for leadership and executive positions.'
                },
                {
                    icon: 'fas fa-users-cog',
                    title: 'Team Building',
                    description: 'Build complete, high-performing teams for specific projects or departments.'
                },
                {
                    icon: 'fas fa-clipboard-check',
                    title: 'Skills Assessment',
                    description: 'Thorough evaluation of candidates technical and soft skills.'
                }
            ],
            'video-editing': [
                {
                    icon: 'fas fa-film',
                    title: 'Professional Editing',
                    description: 'High-quality video editing for marketing, training, and promotional content.'
                },
                {
                    icon: 'fas fa-photo-video',
                    title: 'Motion Graphics',
                    description: 'Dynamic visual elements to enhance your video content.'
                },
                {
                    icon: 'fas fa-cube',
                    title: '3D Animation',
                    description: 'Stunning 3D animations to bring your ideas to life.'
                },
                {
                    icon: 'fas fa-magic',
                    title: 'Visual Effects',
                    description: 'Special effects to create immersive and engaging videos.'
                }
            ],
            'graphics-design': [
                {
                    icon: 'fas fa-paint-brush',
                    title: 'Brand Identity',
                    description: 'Comprehensive branding solutions that establish a strong market presence.'
                },
                {
                    icon: 'fas fa-pencil-alt',
                    title: 'Logo Design',
                    description: 'Memorable logos that represent your brands values and vision.'
                },
                {
                    icon: 'fas fa-desktop',
                    title: 'UI/UX Design',
                    description: 'User-centered design for websites and applications.'
                },
                {
                    icon: 'fas fa-print',
                    title: 'Print Design',
                    description: 'Eye-catching materials for all your print marketing needs.'
                }
            ],
            'marketing': [
                {
                    icon: 'fas fa-chart-line',
                    title: 'Digital Strategy',
                    description: 'Comprehensive digital marketing strategies tailored to your goals.'
                },
                {
                    icon: 'fas fa-hashtag',
                    title: 'Social Media',
                    description: 'Engaging social media management to build your online community.'
                },
                {
                    icon: 'fas fa-search',
                    title: 'SEO/SEM',
                    description: 'Improve your search visibility and drive quality traffic.'
                },
                {
                    icon: 'fas fa-envelope-open-text',
                    title: 'Email Marketing',
                    description: 'Targeted email campaigns to nurture leads and drive conversions.'
                }
            ],
            'lead-generation': [
                {
                    icon: 'fas fa-funnel-dollar',
                    title: 'Sales Funnels',
                    description: 'Optimized conversion pathways to turn prospects into customers.'
                },
                {
                    icon: 'fas fa-bullseye',
                    title: 'Targeted Campaigns',
                    description: 'Precision-targeted campaigns to reach your ideal customers.'
                },
                {
                    icon: 'fas fa-chart-pie',
                    title: 'Market Research',
                    description: 'In-depth analysis to identify opportunities and target audiences.'
                },
                {
                    icon: 'fas fa-handshake',
                    title: 'Lead Nurturing',
                    description: 'Strategic communication to guide leads through the buying process.'
                }
            ]
        };
        
        // Return features for the specific service or default features
        return featuresByService[serviceId] || [
            {
                icon: 'fas fa-check-circle',
                title: 'Quality Service',
                description: 'High-quality solutions delivered on time and within budget.'
            },
            {
                icon: 'fas fa-users',
                title: 'Expert Team',
                description: 'A team of specialists with years of industry experience.'
            },
            {
                icon: 'fas fa-lightbulb',
                title: 'Innovative Approach',
                description: 'Creative thinking and innovative solutions for complex challenges.'
            },
            {
                icon: 'fas fa-cogs',
                title: 'Customized Solutions',
                description: 'Tailored services to meet your specific business requirements.'
            }
        ];
    }
    
    /**
     * Get default process steps
     */
    function getDefaultProcess() {
        return [
            {
                title: 'Discovery',
                description: 'We begin by understanding your business, goals, challenges, and requirements through in-depth consultations.'
            },
            {
                title: 'Strategy',
                description: 'Our team develops a comprehensive strategy and roadmap tailored to your specific needs and objectives.'
            },
            {
                title: 'Implementation',
                description: 'We execute the plan with precision, keeping you informed and involved throughout the process.'
            },
            {
                title: 'Review',
                description: 'Regular reviews and adjustments ensure were on track to meet or exceed your expectations.'
            },
            {
                title: 'Delivery',
                description: 'The final solution is delivered, with thorough documentation and support to ensure a smooth transition.'
            }
        ];
    }
})();