console.log("JS loaded");

// Get the navbar
const navbar = document.getElementById("nav-bar");

// Get the offset position of the navbar
const sticky = navbar.offsetTop;

// Add the scroll event listener
window.addEventListener("scroll", () => {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

//loader
window.addEventListener("load", function () {
  const loader = document.getElementById("loader-wrapper");
  loader.style.display = "none";
});

//nav menu  
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


//down arrow
const downArrow = document.getElementById("down-arrow");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    downArrow.classList.add("hidden");
  } else {
    downArrow.classList.remove("hidden");
  }
});


//scroll percentage
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.round((scrollTop / scrollHeight) * 100);
    document.getElementById('scroll-percent').textContent = `${scrolled}%`;
  });

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.height = scrollPercent + '%';
  });

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('bottom').style.height = scrollPercent + '%';
  });


//skills carousel
    const carousel = document.querySelector('.skills-carousel');
    let isDown = false;
    let startX, scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

  
    //about skills slide in on scroll

    const slideInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.slide-in-left').forEach((el) => {
      slideInObserver.observe(el);
    });
    
    
    // Staggered reveal for .reveal elements (e.g., gallery)
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100); // stagger delay
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));