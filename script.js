$(document).ready(() => {
  //nav bar
  $('#header').on('click', function(event){
    event.preventDefault();
    $('#nav-menu').toggle()
  });
  
  $('#nav-menu').hide();

  $('#nav-menu a').on('click', function(event){
    event.stopPropagation();
  });

  var navbar = $("#header");
  var stickyOffset = navbar.offset().top;

  $(window).scroll(function() {
    if ($(window).scrollTop() >= stickyOffset) {
      navbar.addClass("sticky");
    } else {
      navbar.removeClass("sticky");
    }
  });
})



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
// };


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

