const img = document.getElementById('image');
const container = document.getElementById('container');
let isZoomed = false;
let isDragging = false;
let hasMoved = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

container.addEventListener('mousedown', function(e) {
    if (e.target.closest('.download-btn')) return;
    if (!isZoomed) return;

    isDragging = true;
    hasMoved = false;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    e.preventDefault();
});

window.addEventListener('mousemove', function(e) {
    if (!isDragging) return;

    hasMoved = true;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
});

window.addEventListener('mouseup', function() {
    isDragging = false;
});

container.addEventListener('click', function(e) {
    if (e.target.closest('.download-btn')) return;
    if (hasMoved) return;

    if (!isZoomed) {
        img.style.maxWidth = 'none';
        img.style.maxHeight = 'none';
        container.classList.add('zoomed');
        isZoomed = true;
        updateTransform();
    } else {
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        container.classList.remove('zoomed');
        isZoomed = false;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }
});

function updateTransform() {
    if (isZoomed) {
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;
    } else {
        img.style.transform = 'scale(1)';
    }
}
