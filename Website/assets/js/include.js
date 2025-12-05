/**
 * Include.js - REVISED untuk localhost tanpa fetch
 */

// Fungsi untuk inisialisasi komponen
function initializeComponents() {
    // Inisialisasi navbar mobile
    initializeNavbar();
    
    // Inisialisasi WA Bubble
    initializeWABubble();
    
    // Update cart counter
    updateCartCounter();
}

// Inisialisasi navbar mobile
function initializeNavbar() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileMenuClose');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (mobileClose) {
            mobileClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Tutup mobile menu saat klik link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Inisialisasi WA Bubble
function initializeWABubble() {
    const waBubble = document.querySelector('.wa-bubble');
    if (waBubble) {
        setTimeout(() => {
            waBubble.classList.add('visible');
        }, 1500);
    }
}

// Update cart counter
function updateCartCounter() {
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        try {
            const cart = JSON.parse(localStorage.getItem('makananWongSoloCart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const countElement = cartCounter.querySelector('.cart-count');
            if (countElement) {
                countElement.textContent = totalItems;
                countElement.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        } catch (error) {
            console.error('Error updating cart counter:', error);
        }
    }
}

// Event listener saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // Hilangkan loading spinner
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        setTimeout(() => {
            spinner.style.opacity = '0';
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 300);
        }, 500);
    }
    
    // Inisialisasi komponen
    initializeComponents();
    
    // Highlight nav aktif
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Dispatch event untuk halaman spesifik
    document.dispatchEvent(new Event('componentsLoaded'));
});
