const menuIcon = document.querySelector('.header .icon');
const navbarItems = document.querySelector('.header .navbar-items');

menuIcon.addEventListener('click', function () {
  navbarItems.classList.toggle('active'); // Ajoute ou retire la classe .active
});

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

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
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
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

  carousel.scrollLeft += firstCardWidth;
  timeoutId = setTimeout(infiniteScroll, 3000);

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) {
    timeoutId = setTimeout(infiniteScroll, 3000);
  }
}

const cardIcons = document.querySelectorAll(".card-icons i");

cardIcons.forEach(icon => {
  icon.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

carousel.addEventListener("click", (event) => {
  if (event.target.classList.contains("media-icons")) {
    return;
  }
});

window.addEventListener('load', function () {
  var deferredImages = document.querySelectorAll('.deferred-image');

  deferredImages.forEach(function (element) {
    var imageUrl = element.getAttribute('data-image-url');

    var image = new Image();
    image.src = imageUrl;

    image.classList.add('hidden');

    element.parentNode.replaceChild(image, element);
  });
});