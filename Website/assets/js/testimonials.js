/**
 * Testimonials JavaScript for Makanan Wong Solo
 */

// Testimonials module
const TestimonialsModule = {
    // Initialize
    init: function() {
        console.log('Testimonials module initialized');
        
        // Load testimonials for other pages if needed
        this.loadTestimonialsForHome();
    },
    
    // Load testimonials for home page
    loadTestimonialsForHome: function() {
        // This function can be called from other pages
        if (typeof loadHomeTestimonials === 'function') {
            loadHomeTestimonials();
        }
    },
    
    // Get testimonials for external use
    getTestimonials: function(limit = 3) {
        try {
            const stored = localStorage.getItem('makananWongSoloTestimonials');
            if (stored) {
                const testimonials = JSON.parse(stored);
                // Sort by date (newest first) and limit
                return testimonials
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, limit);
            }
            return [];
        } catch (error) {
            console.error('Error getting testimonials:', error);
            return [];
        }
    },
    
    // Add testimonial from external source
    addTestimonial: function(testimonialData) {
        try {
            const stored = localStorage.getItem('makananWongSoloTestimonials');
            let testimonials = stored ? JSON.parse(stored) : [];
            
            // Generate ID if not provided
            if (!testimonialData.id) {
                testimonialData.id = `testimonial-${Date.now()}`;
            }
            
            // Add date if not provided
            if (!testimonialData.date) {
                testimonialData.date = new Date().toISOString().split('T')[0];
            }
            
            // Generate avatar if not provided
            if (!testimonialData.avatar && testimonialData.name) {
                const colors = ['B71C1C', 'D4AF37', '5D4037', '4CAF50', '2196F3', '9C27B0', 'FF9800', '795548'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                testimonialData.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonialData.name)}&background=${randomColor}&color=fff&size=128`;
            }
            
            testimonials.unshift(testimonialData);
            localStorage.setItem('makananWongSoloTestimonials', JSON.stringify(testimonials));
            
            return true;
        } catch (error) {
            console.error('Error adding testimonial:', error);
            return false;
        }
    },
    
    // Get statistics
    getStatistics: function() {
        try {
            const stored = localStorage.getItem('makananWongSoloTestimonials');
            if (!stored) return null;
            
            const testimonials = JSON.parse(stored);
            const total = testimonials.length;
            const average = total > 0 
                ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / total).toFixed(1)
                : "0.0";
            const fiveStar = testimonials.filter(t => t.rating === 5).length;
            
            return {
                total,
                average,
                fiveStar
            };
        } catch (error) {
            console.error('Error getting statistics:', error);
            return null;
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    TestimonialsModule.init();
});

// Export for use in other files
window.TestimonialsModule = TestimonialsModule;
