const thumbnails = document.querySelectorAll('.thumbnail');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

// Add event listener to all thumbnail images
thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
        // Set the lightbox image src to the clicked thumbnail's larger version
        lightboxImage.src = thumbnail.src.replace('small', 'large'); // Assumes large images follow a naming pattern
        lightbox.classList.add('show');
    });
});

// Close lightbox when clicking the dark background
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
});

// Prevent closing the lightbox when clicking the image itself
lightboxImage.addEventListener('click', (e) => {
    // e.stopPropagation();
    lightbox.classList.remove('show');
});