/**
 * Order JavaScript for Makanan Wong Solo
 */

// Add checkout completion event listener
document.addEventListener('click', function(event) {
    if (event.target.matches('#confirmWhatsAppBtn') || event.target.closest('#confirmWhatsAppBtn')) {
        // Save order to history
        const orderData = {
            items: getCart(),
            customer: window.orderData?.customer || {},
            orderId: window.orderData?.orderId || generateOrderId(),
            total: window.orderData?.total || 0,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        const orders = getOrders();
        orders.unshift(orderData);
        saveOrders(orders);
        
        // Clear cart
        saveCart([]);
        
        // Dispatch completion event
        document.dispatchEvent(new CustomEvent('checkoutCompleted', {
            detail: orderData
        }));
    }
});

// Generate order ID helper
function generateOrderId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `#ORD-${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
}

// LocalStorage helpers
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
        return true;
    } catch (error) {
        console.error('Error saving cart:', error);
        return false;
    }
}

function getOrders() {
    try {
        return JSON.parse(localStorage.getItem('makananWongSoloOrders')) || [];
    } catch (error) {
        console.error('Error getting orders:', error);
        return [];
    }
}

function saveOrders(orders) {
    try {
        localStorage.setItem('makananWongSoloOrders', JSON.stringify(orders));
        return true;
    } catch (error) {
        console.error('Error saving orders:', error);
        return false;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Order page initialized');
});
