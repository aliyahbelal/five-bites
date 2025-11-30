document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('#gallery .img-gallery img');
    
    // Add hover effects to images
    galleryImages.forEach(img => {
        // Mouse enter effect
        img.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
            this.style.cursor = 'pointer';
        });
        
        // Mouse leave effect
        img.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1)';
        });
        
        // Click effect on image
        img.addEventListener('click', function() {
            alert('Food image clicked! 🍕');
            this.style.border = '2px solid #ff6b6b';
        });
    });
    
    console.log('Image gallery is ready to use!');
});