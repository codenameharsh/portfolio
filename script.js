$(document).ready(() => {
    //nav bar
    $('#header').on('click', function(event){
        event.preventDefault();
        $('#nav-menu').toggle()
      });
      $('#nav-menu').hide();

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



//sticky navbar
// Get the navbar
var navbar = document.getElementById("header");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position
// Remove the "sticky" class when you leave the scroll position
window.onscroll = function() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};


//hero section
const containerEl = document.querySelector(".text-container")

const careers = ["Graphic Designer", "UI/UX Designer", "Freelancer", "Front-end Web Developer", "Fashion Illustrator"]

let careerIndex = 0

let characterIndex = 0


updateText()

function updateText() {
    characterIndex++
    
    containerEl.innerHTML = `<h1> <p id="blue-text">Hey there! I am</p> ${careers[careerIndex].slice(0,1) === "U" ? "an" : "a"}  ${careers[careerIndex].slice(0,characterIndex)} </h1>`

    
    if(characterIndex === careers[careerIndex].length){
        careerIndex++
        characterIndex = 0
    }

    if(careerIndex === careers.length){
        careerIndex = 0
    }

    setTimeout(updateText, 300)
}


