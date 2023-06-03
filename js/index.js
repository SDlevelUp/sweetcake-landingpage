// Sélectionnez l'icône du menu et l'élément du menu déroulant
const menuIcon = document.querySelector('.header .icon');
const navbarItems = document.querySelector('.header .navbar-items');

// Ajoutez un écouteur d'événement de clic à l'icône du menu
menuIcon.addEventListener('click', function () {
  navbarItems.classList.toggle('active'); // Ajoute ou retire la classe .active
});



const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Fait défiler le carousel d'un card width à la fois
  carousel.scrollLeft += firstCardWidth;
  // Appelle la fonction de défilement automatique après un délai de 3 secondes
  timeoutId = setTimeout(infiniteScroll, 3000);

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) {
    // Fait défiler le carousel automatiquement
    timeoutId = setTimeout(infiniteScroll, 3000);
  }
}

const cardIcons = document.querySelectorAll(".card-icons i");

cardIcons.forEach(icon => {
  // Empêche le défilement du carousel lorsqu'un utilisateur clique sur une icône dans la classe "card-icons"
  icon.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

carousel.addEventListener("click", (event) => {
  // Vérifie si l'élément cliqué est une icône de la classe "media-icons"
  if (event.target.classList.contains("media-icons")) {
    return;
  }
});



