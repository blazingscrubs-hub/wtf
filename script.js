// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the site
    initNavbar();
    initAnimations();
    initStatsCounter();
    initSmoothScrolling();
    initAccessibility();

    console.log('BetterThan.wtf initialized successfully!');
});

// Navigation functionality
function initNavbar() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                document.querySelector('.nav-menu').classList.remove('active');
                document.getElementById('mobile-menu').classList.remove('active');
            }
        });
    });
}

// Scroll to features
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        const offsetTop = featuresSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards and other elements
    const animateElements = document.querySelectorAll('.feature-card, .demo-card, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for fade-in class
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Stats counter animation
function initStatsCounter() {
    const usersCount = document.getElementById('users-count');

    if (usersCount) {
        let count = 0;
        const target = 12345;
        const duration = 3000;
        const steps = 100;
        const increment = target / steps;
        const interval = duration / steps;

        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(counter);
            }
            usersCount.textContent = Math.floor(count).toLocaleString();
        }, interval);
    }
}

// Demo functionality
function showDemo() {
    // Create a simple modal demo
    const demoContent = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 500px;
            width: 90%;
        ">
            <h2 style="margin-bottom: 1rem; color: #1f2937;">Interactive Demo</h2>
            <p style="margin-bottom: 1.5rem; color: #6b7280;">
                This is a demonstration of the interactive features. Try changing the theme:
            </p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                <button onclick="changeTheme('light')" style="
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    background: #3b82f6;
                    color: white;
                    cursor: pointer;
                ">Light Theme</button>
                <button onclick="changeTheme('dark')" style="
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    background: #1e40af;
                    color: white;
                    cursor: pointer;
                ">Dark Theme</button>
            </div>
            <button onclick="closeDemo()" style="
                padding: 0.5rem 1rem;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                background: transparent;
                color: #6b7280;
                cursor: pointer;
            ">Close</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        " onclick="closeDemo()"></div>
    `;

    const demoContainer = document.createElement('div');
    demoContainer.innerHTML = demoContent;
    demoContainer.id = 'demo-modal';
    document.body.appendChild(demoContainer);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeDemo() {
    const demoModal = document.getElementById('demo-modal');
    if (demoModal) {
        demoModal.remove();
        document.body.style.overflow = '';
    }
}

function changeTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--bg-primary', '#0f172a');
        root.style.setProperty('--bg-secondary', '#1e293b');
        root.style.setProperty('--text-primary', '#f1f5f9');
        root.style.setProperty('--text-secondary', '#94a3b8');
        root.style.setProperty('--border-color', '#334155');
    } else {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('text-primary', '#1f2937');
        root.style.setProperty('text-secondary', '#6b7280');
        root.style.setProperty('--border-color', '#e5e7eb');
    }
}

function startDemo() {
    showDemo();
}

// Accessibility features
function initAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.cssText = `
            position: absolute;
            left: 6px;
            top: 6px;
            width: auto;
            height: auto;
            padding: 0.5rem 1rem;
            background: var(--primary-color);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
        `;
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content id to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.tabIndex = -1;
    }
}

// Performance monitoring
function monitorPerformance() {
    // Log performance metrics
    window.addEventListener('load', function() {
        setTimeout(() => {
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            const paintTiming = performance.getEntriesByType('paint');

            console.log('Performance Metrics:');
            console.log('- DOM Content Loaded:', navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart, 'ms');
            console.log('- Load Time:', navigationTiming.loadEventEnd - navigationTiming.loadEventStart, 'ms');

            if (paintTiming.length > 0) {
                console.log('- First Paint:', paintTiming[0].startTime, 'ms');
            }
        }, 0);
    });
}

// Initialize performance monitoring
monitorPerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// Export functions for global access
window.scrollToFeatures = scrollToFeatures;
window.showDemo = showDemo;
window.startDemo = startDemo;
window.closeDemo = closeDemo;
window.changeTheme = changeTheme;