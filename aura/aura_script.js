//progress bar

document.addEventListener("DOMContentLoaded", () => {
window.onscroll = function() {
updateProgressBar();
};

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Avoid division by zero if the page isn't scrollable
    if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById("myBar");
        if (bar) {
            bar.style.width = scrolled + "%";
        }
    }
}


});

//shrink nav on scroll
window.onscroll = function() {
const nav = document.querySelector('.navbar');
if (window.pageYOffset > 50) {
nav.style.padding = "1rem 10%";
nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
} else {
nav.style.padding = "2rem 10%";
nav.style.boxShadow = "none";
}
};

//hamburger menu toggle
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
// Toggles the 'X' animation on the hamburger
menu.classList.toggle('is-active');
// Toggles the slide-in menu
menuLinks.classList.toggle('active');

```
// Optional: Prevent body scroll when menu is open
document.body.style.overflow = menuLinks.classList.contains('active') ? 'hidden' : 'auto';

```

});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('click', () => {
menu.classList.remove('is-active');
menuLinks.classList.remove('active');
document.body.style.overflow = 'auto';
});
});

// Intersection Observer for Scroll Animations
const observerOptions = {
root: null, // Use the viewport
threshold: 0.1, // Trigger when 10% of the element is visible
rootMargin: "0px 0px -50px 0px" // Slightly offset for a better feel
};

const observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('reveal-active');
// Stop observing once it has revealed
observer.unobserve(entry.target);
}
});
}, observerOptions);

// Target all major sections and grid items
document.querySelectorAll('section, .mood-item, .skill-card, .translation-box').forEach(el => {
el.classList.add('reveal-hidden'); // Add initial hidden state
observer.observe(el);
});