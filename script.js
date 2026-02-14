// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    if (document.getElementById('typed-text')) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Grow Your Business...',
                'Convert Clicks into Customers...',
                'Dominate Digital Marketing...',
                'Scale with IGB SOFT-TECH...'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Animated Counter
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const suffix = counter.textContent.includes('+') ? '+' : 
                          counter.textContent.includes('%') ? '%' : '';
            
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + suffix;
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            // Start counter when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation (for contact page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Message sent successfully! We\'ll contact you soon.', 'success');
            contactForm.reset();
            
            // In production, you would send data to your server here
            // fetch('your-api-endpoint', {
            //     method: 'POST',
            //     body: JSON.stringify({ name, email, message }),
            //     headers: { 'Content-Type': 'application/json' }
            // })
        });
    }

    // Tilt Effect for Service Cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('text-secondary', 'font-bold');
        }
    });

    // Load more portfolio items
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more items
            const portfolioGrid = document.querySelector('.portfolio-grid');
            const newItems = [
                {
                    title: 'E-commerce Campaign',
                    category: 'Social Media',
                    image: 'https://via.placeholder.com/400x300'
                },
                {
                    title: 'Brand Identity',
                    category: 'Branding',
                    image: 'https://via.placeholder.com/400x300'
                }
            ];
            
            newItems.forEach(item => {
                const div = document.createElement('div');
                div.className = 'portfolio-item bg-gray-800/50 rounded-xl overflow-hidden hover:scale-105 transition';
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <span class="text-secondary text-sm">${item.category}</span>
                        <h4 class="font-bold">${item.title}</h4>
                    </div>
                `;
                portfolioGrid.appendChild(div);
            });
            
            loadMoreBtn.textContent = 'All Projects Loaded';
            loadMoreBtn.disabled = true;
        });
    }
});

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Scroll Animation
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-bg');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Add fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Dark/Light Mode Toggle (Optional - for future enhancement)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// WhatsApp Chat Integration
function openWhatsApp() {
    const phone = '2348074022213';
    const message = 'Hello IGB SOFT-TECH! I visited your website and would like to discuss digital marketing services.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Initialize animations on page load
window.addEventListener('load', function() {
    document.body.classList.add('page-load');
});