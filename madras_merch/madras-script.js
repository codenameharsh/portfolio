$(document).ready(()=>{
    //sticky nav
    let navbar = $("#nav-bar");
    let stickyOffset = navbar.offset().top;
  
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > stickyOffset) {
            navbar.addClass("sticky");
            $("body").css("padding-top", navbar.outerHeight() + "px"); // Prevent content jump
        } else {
          navbar.removeClass("sticky").css("position", "relative"); // Reset position
          $("body").css("padding-top", "0");
        }
    });
})

//loader
window.addEventListener("load", function () {
  const loader = document.getElementById("loader-wrapper");
  loader.style.display = "none";
});
  

//loader
window.addEventListener("load", function () {
  const loader = document.getElementById("loader-wrapper");
  loader.style.display = "none";
});

//scroll percentage
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = Math.round((scrollTop / scrollHeight) * 100);
  document.getElementById('scroll-percent').textContent = `${scrolled}%`;
});
  
  //hamburger menu
  const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    //close when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });

      // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburgerMenu.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger) {
        navMenu.classList.remove('active');
        }
    });


    //galler scroll on reveal
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100); // stagger delay
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));