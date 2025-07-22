// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTypewriter();
    initAnimations();
    initSkillBars();
    initParticles();
    initContactForm();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
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
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Typewriter effect
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    const texts = [
        'Data Analyst & Machine Learning Enthusiast',
        'Python Developer & AI Researcher',
        'Big Data Analytics Specialist',
        'Backend Development Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typewriterElement.textContent = currentText;
        
        let typeSpeed = isDeleting ? 100 : 200;
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    if (typewriterElement) {
        type();
    }
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        'section, .project-card, .skill-category, .timeline-item, .experience-card, .interest-card'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Particle background effect
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 7) + 's';
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
}

// Contact form functionality
function initContactForm() {
    // Initialize EmailJS
    emailjs.init("GgzCTAuDmw_P3TCfv"); // Replace with your actual public key from EmailJS
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send email using EmailJS
                const result = await emailjs.send(
                    'service_xgafxhl',    // Replace with your EmailJS service ID
                    'template_21i5fi7',   // Replace with your EmailJS template ID
                    {
                        from_name: name,
                        from_email: email,
                        subject: subject,
                        message: message,
                        to_email: 'raveenraj1606@gmail.com' // Replace with your email address
                    }
                );
                
                console.log('Email sent successfully:', result);
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
            } catch (error) {
                console.error('Email sending failed:', error);
                showNotification('Failed to send message. Please try again later.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #00ffff, #0080ff)';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.getElementById('home');
    const floatingElements = document.querySelectorAll('.floating-cube');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 0.3;
            el.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.project-card, .skill-category, .interest-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function downloadResume() {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = "Raveenraj_CV .pdf"; // Update with actual CV path
    link.download = 'Raveen_Raj_CV.pdf';
    link.click();
    
    showNotification('CV download started!', 'success');
}

// Profile image interaction
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profileImg');
    
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Random profile image rotation
      //setInterval(() => {
            //const rotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
            //profileImg.style.transform = `rotate(${rotation}deg)`;
        //}, 3000);
    }
});

// Add loading screen
window.addEventListener('load', function() {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Initialize all animations
    document.body.classList.add('loaded');
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification button:hover {
        opacity: 0.7;
    }
    
    .nav-links a.active {
        color: #00ffff !important;
        text-shadow: 0 0 10px #00ffff;
    }
    
    .nav-links a.active::after {
        width: 100% !important;
    }
    
    body.loaded {
        overflow-x: hidden;
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('🎉 Easter egg activated! Rainbow mode enabled!', 'success');
        
        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 10000);
        
        konamiCode = [];
    }
});

// Add smooth scrolling for buttons
document.querySelectorAll('button[onclick^="scrollToSection"]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        scrollToSection(sectionId);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Existing scroll handlers are already optimized
}, 16)); // ~60fps

// Add accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #00ffff !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyle);
