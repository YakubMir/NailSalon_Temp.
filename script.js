// ============================================
// ÉLAN NAIL STUDIO - JAVASCRIPT
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler for contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Form submission handler for booking form
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('#name').value;
        const service = this.querySelector('#service').value;
        const date = this.querySelector('#date').value;
        alert(`Thank you, ${name}! Your appointment for ${service} on ${date} has been confirmed. We'll send you a confirmation email shortly.`);
        this.reset();
    });
}

// Form submission handler for review form
const reviewForm = document.querySelector('.review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('#review-name').value;
        const rating = this.querySelector('input[name="rating"]:checked').value;
        const stars = '⭐'.repeat(parseInt(rating));
        alert(`Thank you, ${name}! Your ${rating}-star review has been submitted. We appreciate your feedback! ${stars}`);
        this.reset();
        
        // Optional: Add the review to the showcase
        addReviewToShowcase(name, rating, this.querySelector('#review-text').value);
    });
}

// Function to add new review to showcase
function addReviewToShowcase(name, rating, reviewText) {
    const reviewsShowcase = document.querySelector('.reviews-showcase');
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');
    newReview.style.animation = 'slideInLeft 0.6s ease-out';
    
    const stars = Array.from({length: parseInt(rating)}, () => '<i class="fas fa-star"></i>').join('');
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    newReview.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <h4>${name}</h4>
                <p class="review-date">Just now</p>
            </div>
            <div class="review-rating">
                ${stars}
            </div>
        </div>
        <p class="review-text">"${reviewText}"</p>
    `;
    
    reviewsShowcase.insertBefore(newReview, reviewsShowcase.firstChild);
}

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and gallery items
document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Mobile menu toggle
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');

    if (window.innerWidth <= 768) {
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.classList.add('hamburger');
            hamburger.setAttribute('aria-label', 'Open menu');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            navMenu.parentNode.insertBefore(hamburger, navMenu);

            navMenu.style.display = 'none';

            hamburger.addEventListener('click', function() {
                const isOpen = navMenu.style.display === 'flex';
                if (isOpen) {
                    navMenu.style.display = 'none';
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                } else {
                    Object.assign(navMenu.style, {
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        right: '0',
                        backgroundColor: 'white',
                        padding: '1rem 2rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        zIndex: '999'
                    });
                    hamburger.innerHTML = '<i class="fas fa-times"></i>';
                }
            });

            // Close menu when a nav link is tapped
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.style.display = 'none';
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    } else {
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) hamburger.remove();
        navMenu.style.display = '';
    }
}

// Initialize mobile menu on load and resize
window.addEventListener('load', initMobileMenu);
window.addEventListener('resize', initMobileMenu);

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--champagne-gold);
        font-weight: 700;
    }
`;
document.head.appendChild(style);

// Service card click handler
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        const serviceSelect = document.querySelector('#service');
        if (serviceSelect) {
            serviceSelect.value = serviceName.toLowerCase();
            document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        }
    });
    card.style.cursor = 'pointer';
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Gallery hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Initialize date input with today's date as minimum
const dateInput = document.querySelector('#date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Highlight features on scroll
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
            featureObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature').forEach(el => {
    el.style.opacity = '0';
    featureObserver.observe(el);
});

// Add a scroll-to-top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #D4A574, #C7B8A8);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(212, 165, 116, 0.4);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 8px 20px rgba(212, 165, 116, 0.5)';
    });
    
    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 12px rgba(212, 165, 116, 0.4)';
    });
}

// Initialize scroll-to-top button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createScrollToTopButton);
} else {
    createScrollToTopButton();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0.95';
document.body.style.transition = 'opacity 0.3s ease';

// Console welcome message
console.log('%c✨ Welcome to Élan Nail Studio ✨', 'color: #D4A574; font-size: 16px; font-weight: bold;');
console.log('%cLuxury nail care at its finest', 'color: #C7B8A8; font-size: 12px;');