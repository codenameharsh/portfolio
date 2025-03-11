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

// Get the PDF buttons
const webDesignPdfButton = document.getElementById('web-design-pdf');
const graphicDesignPdfButton = document.getElementById('graphic-design-pdf');
const artPdfButton = document.getElementById('art-pdf');

// Add event listeners to the PDF buttons
webDesignPdfButton.addEventListener('click', () => {
  window.open('portfolio_web.pdf', '_blank');
});

graphicDesignPdfButton.addEventListener('click', () => {
  window.open('portfolio_graphic.pdf', '_blank');
});

artPdfButton.addEventListener('click', () => {
  window.open('portfolio_art.pdf', '_blank');
});

