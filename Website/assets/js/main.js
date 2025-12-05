/**
 * Main JavaScript for Makanan Wong Solo
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Makanan Wong Solo - Website Loaded');
    
    // Initialize cart counter
    updateCartCounter();
    
    // Set current year in footer
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});

// Global cart functions
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('makananWongSoloCart')) || [];
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('makananWongSoloCart', JSON.stringify(cart));
        updateCartCounter();
        return true;
    } catch (error) {
        console.error('Error saving cart:', error);
        return false;
    }
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        try {
            const cart = getCart();
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

// Add product to cart
function addProductToCart(productId, productName, price, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: quantity,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart(cart);
    showNotification(`${productName} ditambahkan ke keranjang!`, 'success');
    return true;
}

// Remove product from cart
function removeProductFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
    return newCart;
}

// Update product quantity
function updateProductQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (quantity <= 0) {
            return removeProductFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
            return cart;
        }
    }
    
    return cart;
}

// Calculate cart total
function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add close button event
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeNotification(notification);
        });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    return notification;
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#4CAF50';
        case 'error': return '#f44336';
        case 'warning': return '#ff9800';
        default: return '#2196F3';
    }
}

function closeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// Add CSS animations if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
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
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Export functions for use in other files
window.MakananWongSolo = {
    getCart,
    saveCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    calculateCartTotal,
    showNotification,
    updateCartCounter
};
