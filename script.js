$(document).ready(() => {
    // Toggle nav menu for mobile
    $('#logo').on('click', function() {
        if ($(window).width() <= 768) {
            $('.nav-menu-bar').toggleClass('show');
        }
    });
  
    // Ensure menu is visible for larger screens
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            $('.nav-menu-bar').removeClass('show').css('display', 'flex');
        } else {
            $('.nav-menu-bar').css('display', 'none');
        }
    });
  
    // Close menu when clicking outside (mobile only)
    $(document).on('click', function(event) {
        if ($(window).width() <= 768 && !$(event.target).closest('#header').length) {
            $('.nav-menu-bar').removeClass('show');
        }
    });
  
    // Sticky navbar functionality
    let navbar = $("#header");
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
  
    //project carousel functionality
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll(".carousel-slide").length;
    const carousel = document.querySelector(".carousel");
  
    function updateCarousel() {
        const offset = -currentIndex * 100 + "%";
        carousel.style.transform = "translateX(" + offset + ")";
    }
  
    // Next button
    document.querySelector(".next").addEventListener("click", function () {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back
        }
        updateCarousel();
    });
  
    // Previous button
    document.querySelector(".prev").addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Loop back
        }
        updateCarousel();
    });
  
    //auto play - carousel
    let autoSlide = setInterval(function() {
      $(".next").trigger("click");
    }, 5000); // Automatically go to the next project every 5 seconds
  
    $(".carousel").hover(function() {
      clearInterval(autoSlide); // Pause autoplay on hover
    }, function() {
      autoSlide = setInterval(function() {
        $(".next").trigger("click");
      }, 5000); // Restart autoplay after hover
    });
  
    //touch - swipe functionality
    let startX;
    let endX;
    const threshold = 50; // Minimum swipe distance to trigger carousel change
  
    // Detect touchstart
    $(".carousel-container").on("touchstart", function (e) {
      startX = e.originalEvent.touches[0].clientX;
    });
  
    // Detect touchmove
    $(".carousel-container").on("touchmove", function (e) {
      endX = e.originalEvent.touches[0].clientX;
    });
  
    // Detect touchend (when swipe is completed)
    $(".carousel-container").on("touchend", function () {
      const diff = startX - endX;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swipe left: next slide
          if (currentIndex < totalSlides - 1) {
            currentIndex++;
          } else {
            currentIndex = 0;
          }
        } else {
          // Swipe right: previous slide
          if (currentIndex > 0) {
            currentIndex--;
          } else {
            currentIndex = totalSlides - 1;
          }
        }
        updateCarousel(); // Update the carousel with new slide
      }
    });
  
    //dots navigation
    $(".dot").on("click", function() {
      const index = $(this).index();
      currentIndex = index;
      updateCarousel();
    });
  
    //touch
  });
  
  
  
  // //sticky navbar
  // // Get the navbar
  // var navbar = document.getElementById("header");
  
  // // Get the offset position of the navbar
  // var sticky = navbar.offsetTop;
  
  // // Add the sticky class to the navbar when you reach its scroll position
  // // Remove the "sticky" class when you leave the scroll position
  // window.onscroll = function() {
  //   if (window.scrollY >= sticky) {
  //     navbar.classList.add("sticky");
  //   } else {
  //     navbar.classList.remove("sticky");
  //   }
  
  window.addEventListener("scroll", function() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress-bar").style.height = scrolled + "%";
});
  
  //hero section
  const careerTextEl = document.querySelector("#career-text");
  
  const careers = [" a Graphic Designer", " an UI/UX Designer", "a Freelancer", "a Front-end Web Developer", "a Fashion Illustrator"];
  let careerIndex = 0;
  let characterIndex = 0;
  
  function updateText() {
      let currentText = careers[careerIndex].slice(0, characterIndex);
  
      careerTextEl.textContent = currentText;  // Update only the career text
  
      if (characterIndex < careers[careerIndex].length) {
          characterIndex++;
          setTimeout(updateText, 100); // Faster typing effect
      } else {
          setTimeout(() => {
              characterIndex = 0;
              careerIndex = (careerIndex + 1) % careers.length;
              updateText();
          }, 1500); // Pause before switching to next career
      }
  }
  
  updateText();
  
  //portfolio btn lightbox
  const portfolioBtn = document.getElementById('portfolio'); 
  
  portfolioBtn.addEventListener('click', (e) => {
    const pdfUrl = 'portfolio_design.pdf';
  
    // Insert lightbox HTML
    document.body.insertAdjacentHTML('beforeend', `
         <div class="lightbox">
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <iframe src="${pdfUrl}" width="100%" height="600px"></iframe>
            </div>
          </div>
      `);
  
    // Add event listener for closing lightbox
    document.querySelector('.close-lightbox').addEventListener('click', () => {
      document.querySelector('.lightbox').remove();
    });
  });
  
  
  
  // Function to cycle background images
  function cycleBackgrounds(sectionId, images, interval = 3000) {
    let index = 0;
    const section = document.getElementById(sectionId);
  
    setInterval(() => {
      section.style.setProperty('--bg-image', `url(${images[index]})`);
      index = (index + 1) % images.length;
    }, interval);
  }
  
  // Correct image paths
  const webDesignImages = [
    'images/web/web1.png',
    'images/web/web2.png',
    'images/web/web3.png',
    'images/web/web4.png',
    'images/web/web5.png',
    'images/web/web6.png',
    'images/web/web7.png',
    'images/web/web8.png',
    'images/web/web9.png',
    'images/web/web10.png',
    'images/web/web11.png',
  ];
  
  const graphicDesignImages = [
    'images/graphic/graphic1.png',
    'images/graphic/graphic2.png',
    'images/graphic/graphic3.png',
    'images/graphic/graphic4.png',
    'images/graphic/graphic5.png',
    'images/graphic/graphic6.png',
    'images/graphic/graphic7.jpg',
    'images/graphic/graphic8.jpg',
    'images/graphic/graphic9.jpg',
    'images/graphic/graphic10.png',
    'images/graphic/graphic11.jpeg',
    'images/graphic/graphic12.png',
    'images/graphic/graphic13.png',
    'images/graphic/graphic14.png',
    'images/graphic/graphic15.png',
  ];
  
  const artImages = [
    'images/art/art1.jpg',
    'images/art/art2.jpg',
    'images/art/art3.jpg',
    'images/art/art4.JPG',
    'images/art/art5.JPG',
    'images/art/art6.JPG',
    'images/art/art7.JPG',
    'images/art/art8.JPG',
    'images/art/art9.JPG',
    'images/art/art10.JPG',
    'images/art/art11.JPG',
    'images/art/art12.JPG',
    'images/art/art13.JPG',
    'images/art/art14.JPG',
    'images/art/art15.JPG',
    'images/art/art16.JPG',
    'images/art/art17.JPG',
    'images/art/art18.JPG',
    'images/art/art19.JPG',
    'images/art/art20.JPG',
    'images/art/art21.JPG',
    'images/art/art22.JPG',
    'images/art/art23.JPG',
    'images/art/art24.JPG',
    'images/art/art25.JPG',
    'images/art/art26.JPG',
  ];
  
  // Start cycling backgrounds
  cycleBackgrounds('web-design', webDesignImages);
  cycleBackgrounds('graphic-design', graphicDesignImages);
  cycleBackgrounds('art', artImages);
  
  
  
  
  //pdf light box
  const pdfButtons = document.querySelectorAll('.pdf-button');
  
  pdfButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          const pdfUrl = button.id === 'web-design-pdf' ? 'portfolio_web.pdf' :
                         button.id === 'graphic-design-pdf' ? 'portfolio_graphic.pdf' : 'portfolio_art.pdf';
  
          document.body.insertAdjacentHTML('beforeend', `
              <div class="lightbox">
                  <div class="lightbox-content">
                      <span class="close-lightbox">&times;</span>
                      <iframe src="${pdfUrl}" width="100%" height="600px"></iframe>
                  </div>
              </div>
          `);
  
          document.querySelector('.close-lightbox').addEventListener('click', () => {
              document.querySelector('.lightbox').remove();
          });
      });
  });
  
  
  
  
  
  