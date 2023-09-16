"use strict";
const btnScollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const logo = document.querySelector(".nav__logo");
const tab = document.querySelectorAll(".rooms__tab");
const tabContainer = document.querySelector(".rooms__tab-container");
const tabContent = document.querySelectorAll(".rooms__content");

// Scroll - Descopera mai mult

btnScollTo.addEventListener("click", function () {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

// Page navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Menu animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Lock nav and reveal sections

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Go to header
logo.addEventListener("click", function () {
  header.scrollIntoView();
});

// Tab -section 2
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".rooms__tab");

  if (!clicked) return;

  // Remove classlist
  tab.forEach((t) => t.classList.remove("rooms__tab--active"));
  tabContent.forEach((c) => c.classList.remove("rooms__content--active"));

  // Activate tab
  clicked.classList.add("rooms__tab--active");

  // Activate content area
  document
    .querySelector(`.rooms__content--${clicked.dataset.tab}`)
    .classList.add("rooms__content--active");
});

// Slides

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();
  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
slider();

// Form - search books
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
  keyword = searchBox.value;
  const url =
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}&printType=books&key=AIzaSyDXsCxfv_a021a5mlCkGTOGZrQhXQRaqW8` +
    "&startIndex=10";

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = " ";
  }

  const results = data.items;
  console.log(results);

  results.map((result) => {
    let thumbnail =
      result.volumeInfo.imageLinks &&
      result.volumeInfo.imageLinks.smallThumbnail;

    const html = `
      <article class="card">
        <img class="book__img" src="${thumbnail}" />
        <div class="book__data">
          <h3 class="book__name">${result.volumeInfo.title}</h3>
        </div>
      </article>
      `;

    searchResult.insertAdjacentHTML("beforeend", html);
  });
}

function clearSearch() {
  searchBox.value = " ";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
  clearSearch();
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav__links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav__link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  })
);
