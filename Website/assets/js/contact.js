/**
 * Contact JavaScript for Makanan Wong Solo
 */

// Contact module
const ContactModule = {
    // Initialize
    init: function() {
        console.log('Contact module initialized');
        
        // Check if we're on contact page
        if (document.querySelector('.contact-hero-section')) {
            this.setupPage();
        }
    },
    
    // Setup page specific functionality
    setupPage: function() {
        // All functionality is already in the inline script
        // This is for additional functionality if needed
    },
    
    // Format phone number for display
    formatPhoneNumber: function(phone) {
        // Remove all non-numeric characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Format: +62 895-1343-9235
        if (cleaned.length === 12) {
            return `+62 ${cleaned.substring(2, 5)}-${cleaned.substring(5, 9)}-${cleaned.substring(9)}`;
        }
        
        // Return original if not Indonesian number
        return phone;
    },
    
    // Open WhatsApp with pre-filled message
    openWhatsApp: function(phone, message = '') {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
        window.open(url, '_blank');
    },
    
    // Open email client
    openEmail: function(email, subject = '', body = '') {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        const url = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
        window.location.href = url;
    },
    
    // Open map with coordinates
    openMap: function(lat, lng, label = '') {
        const url = `https://www.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=17&t=m&hl=id&gl=ID&mapclient=apiv3`;
        if (label) {
            const encodedLabel = encodeURIComponent(label);
            window.open(`${url}&label=${encodedLabel}`, '_blank');
        } else {
            window.open(url, '_blank');
        }
    },
    
    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validate phone number (simple Indonesian validation)
    validatePhone: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 13;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    ContactModule.init();
});

// Export for use in other files
window.ContactModule = ContactModule;
