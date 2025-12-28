// Ensure animations trigger on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add a class to body to trigger animations
    document.body.classList.add('loaded');
});

// Smooth scroll for navigation
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

// Contact button scroll to footer
document.querySelector('.nav-link')?.addEventListener('click', () => {
    document.querySelector('.footer')?.scrollIntoView({
        behavior: 'smooth'
    });
});

// Register button action
document.querySelector('.register-btn')?.addEventListener('click', () => {
    // Add your registration link here
    window.open('#', '_blank');
});

// Get Started button scroll
document.querySelector('.get-started-btn')?.addEventListener('click', () => {
    document.querySelector('.about-section')?.scrollIntoView({
        behavior: 'smooth'
    });
});

// Events carousel auto-scroll
const eventsScroll = document.querySelector('.events-scroll');
if (eventsScroll) {
    let scrollPosition = 0;
    const scrollSpeed = 1;
    
    function autoScrollEvents() {
        scrollPosition += scrollSpeed;
        eventsScroll.scrollLeft = scrollPosition;
        
        // Reset scroll position when reaching the end
        if (scrollPosition >= eventsScroll.scrollWidth - eventsScroll.clientWidth) {
            scrollPosition = 0;
        }
        
        requestAnimationFrame(autoScrollEvents);
    }
    
    // Start auto-scroll
    autoScrollEvents();
    
    // Update active event on scroll
    eventsScroll.addEventListener('scroll', () => {
        const items = eventsScroll.querySelectorAll('.event-item');
        const scrollLeft = eventsScroll.scrollLeft;
        const clientWidth = eventsScroll.clientWidth;
        
        items.forEach((item) => {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const itemCenter = itemLeft + itemWidth / 2;
            const scrollCenter = scrollLeft + clientWidth / 2;
            
            if (Math.abs(itemCenter - scrollCenter) < itemWidth / 2) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
}

// Sponsor carousel auto-scroll
const sponsorScroll = document.querySelector('.sponsor-scroll');
if (sponsorScroll) {
    let sponsorScrollPosition = 0;
    const sponsorScrollSpeed = 0.5;
    
    function autoScrollSponsors() {
        sponsorScrollPosition += sponsorScrollSpeed;
        sponsorScroll.scrollLeft = sponsorScrollPosition;
        
        // Reset scroll position when reaching the end
        if (sponsorScrollPosition >= sponsorScroll.scrollWidth - sponsorScroll.clientWidth) {
            sponsorScrollPosition = 0;
        }
        
        requestAnimationFrame(autoScrollSponsors);
    }
    
    // Start auto-scroll
    autoScrollSponsors();
}

// Features carousel auto-scroll (reverse)
const featuresCarousel = document.querySelector('.features-carousel');
if (featuresCarousel) {
    let featuresScrollPosition = featuresCarousel.scrollWidth;
    const featuresScrollSpeed = 0.8;
    
    function autoScrollFeatures() {
        featuresScrollPosition -= featuresScrollSpeed;
        featuresCarousel.scrollLeft = featuresScrollPosition;
        
        // Reset scroll position when reaching the start
        if (featuresScrollPosition <= 0) {
            featuresScrollPosition = featuresCarousel.scrollWidth;
        }
        
        requestAnimationFrame(autoScrollFeatures);
    }
    
    // Start auto-scroll
    autoScrollFeatures();
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .feature-card, .about-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Event label click handlers
document.querySelectorAll('.event-label').forEach((label, index) => {
    label.addEventListener('click', () => {
        const items = document.querySelectorAll('.event-item');
        if (items[index] && eventsScroll) {
            eventsScroll.scrollTo({
                left: items[index].offsetLeft - eventsScroll.offsetLeft - (eventsScroll.clientWidth / 2) + (items[index].offsetWidth / 2),
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
