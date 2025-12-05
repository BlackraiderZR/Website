/**
 * Articles JavaScript for Makanan Wong Solo
 */

// Initialize articles page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Articles page initialized');
    
    // All functionality is in the inline script
    // This file is for additional functionality if needed
});

// Export helper functions for use in other files
window.ArticlesHelper = {
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    },
    
    getCategoryName: function(category) {
        const categories = {
            'sejarah': 'Sejarah',
            'budaya': 'Budaya',
            'resep': 'Resep & Tips',
            'wisata': 'Wisata Kuliner'
        };
        return categories[category] || category;
    },
    
    shareArticle: function(article, platform) {
        const url = window.location.href;
        const text = `Baca artikel menarik: ${article.title} - Makanan Wong Solo`;
        
        let shareUrl = '';
        
        switch(platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            default:
                return;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
};
