//image preview banner
document.addEventListener("DOMContentLoaded", function () {
    const banner = document.querySelector(".image-preview-banner");
    let isScrolling;

    function autoScroll() {
        banner.scrollLeft += 1;
        if (banner.scrollLeft >= banner.scrollWidth - banner.clientWidth) {
            banner.scrollLeft = 0;
        }
        isScrolling = requestAnimationFrame(autoScroll);
    }

    banner.addEventListener("mouseenter", () => cancelAnimationFrame(isScrolling));
    banner.addEventListener("mouseleave", autoScroll);

    autoScroll(); // Start scrolling on page load
});

//progress bar
window.addEventListener("scroll", function() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress-bar").style.height = scrolled + "%";
});