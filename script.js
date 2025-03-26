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

    //skills
    function animateElements() {
      $(".skills ul li").each(function (index) {
          var position = $(this).offset().top;
          var windowHeight = $(window).height();
          var scrollTop = $(window).scrollTop();

          if (scrollTop + windowHeight > position) {
              $(this).delay(index * 100).queue(function () {
                  $(this).addClass("shake").dequeue();
              });
          }
      });

      $(".fill").each(function () {
          var position = $(this).offset().top;
          var windowHeight = $(window).height();
          var scrollTop = $(window).scrollTop();

          if (scrollTop + windowHeight > position) {
              var finalWidth = $(this).attr("style").match(/width:\s*(\d+)%/)[1] + "%";
              $(this).css({ width: "0%" }).animate({ width: finalWidth }, 1500);
          }
      });
  }

  // Run animations on scroll
  $(window).on("scroll", animateElements);

  // Run animations on page load if elements are already in view
  animateElements();
  
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
  

  //progres bar
  window.addEventListener("scroll", function() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress-bar").style.height = scrolled + "%";
});
  
  //hero section
  const careerTextEl = document.querySelector("#career-text");
  
  const careers = [" a Graphic Designer", " an UI/UX Designer", "a Front-end Web Developer", "a Fashion Illustrator"];
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
  

  //art section
  function startSlideshow(slideshowId) {
    let slides = document.querySelectorAll(`#${slideshowId} .slide`);
    let index = 0;
    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    startSlideshow("slideshow1");
    startSlideshow("slideshow2");
    startSlideshow("slideshow3");
});

  
  
  
  
  
  