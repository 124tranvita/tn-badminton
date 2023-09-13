"use strict";

const MENU = ["home", "about", "scheduler", "classes", "gallery", "contact"];
const MENU_ID = [
  "home",
  "about",
  "scheduler",
  "classes",
  "gallery",
  "gallery",
  "contact",
];
const CLASSES = [
  {
    level: "basic",
    coach: "A",
    dayInWeek: "Sunday, Monday",
    morning: "9:00 ~ 11:00",
    afternoon: "14:00 ~ 16:00",
    url: "/basic-class",
  },
  {
    level: "advanced",
    coach: "B",
    dayInWeek: "Every Friday",
    evening: "19:00 ~ 20:30",
    url: "/basic-class",
  },
  {
    level: "special",
    coach: "C",
    dayInWeek: "Friday, Saturday, Sunday",
    morning: "9:00 ~ 11:00",
    evening: "19:00 ~ 20:30",
    url: "/basic-class",
  },
];

const IMAGE_GALLERY = [
  {
    url: "assets/about-us.jpg",
    class: "pic1-1",
  },
  {
    url: "assets/gallery.jpg",
    class: "pic1-2",
  },
  {
    url: "assets/about-us.jpg",
    class: "pic1-3",
  },
  {
    url: "assets/gallery.jpg",
    class: "pic1-4",
  },
  {
    url: "assets/about-us.jpg",
    class: "pic1-5",
  },
  {
    url: "assets/gallery.jpg",
    class: "pic2-1",
  },
  {
    url: "assets/about-us.jpg",
    class: "pic2-2",
  },
  {
    url: "assets/gallery.jpg",
    class: "pic2-3",
  },
  {
    url: "assets/about-us.jpg",
    class: "pic3-1",
  },
  {
    url: "assets/gallery.jpg",
    class: "pic3-2",
  },
  {
    url: "assets/about-us.jpg",
    class: "pic3-3",
  },
];

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const MENU_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>`;

/** COMMON FUNCTION */
const clearAllActiveClass = (elementList) => {
  if (!elementList || elementList.length === 0) return;

  elementList.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });
};

const renderImageGallery = (galleryEl) => {
  const thumbnails = IMAGE_GALLERY.map((item) => {
    return `<a class=${item.class} href=${item.url}>
    <img class="gallery-image" src=${item.url} />
  </a>`;
  });

  galleryEl.innerHTML = thumbnails.join("");
};

const renderMenuItems = (menuEl, elementId) => {
  const menuItems = MENU.map((item) => {
    return `<li id="${item}">${item}</li>`;
  });

  menuEl.innerHTML = menuItems.join("");
  const liEl = document.querySelectorAll(`#${elementId} > li`);

  if (liEl[0]) {
    liEl[0].classList.add("active");
    liEl.forEach((item) => {
      item.addEventListener("click", function () {
        clearAllActiveClass(liEl);
        this.classList.add("active");
      });
    });
  }
};

const menuItemClickEvt = () => {
  MENU_ID.forEach((item) => {
    const element = document.querySelector(`#${item}`);
    const sectionEl = headerElObj[`${item}El`];

    element.addEventListener("click", () => {
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};

/** MENU CONFIGURATION */

// 1. Set menu list
const menu = document.querySelector("#menu");
const menuMobile = document.querySelector("#menu-mobile");

if (WIDTH > 425) {
  renderMenuItems(menu, "menu");
  menuMobile.innerHTML = "";
} else {
  renderMenuItems(menuMobile, "menu-mobile");
  menu.innerHTML = "";
}

// 2. Set menu's item event
const homeEl = document.querySelector("body");
const aboutEl = document.querySelector("#about-us");
const schedulerEl = document.querySelector("#courts-scheduler");
const classesEl = document.querySelector("#training-classes");
const galleryEl = document.querySelector("#club-gallery");
const contactEl = document.querySelector("#contact-us");

const headerElObj = {
  homeEl,
  aboutEl,
  schedulerEl,
  classesEl,
  galleryEl,
  contactEl,
};

console.log({ headerElObj });

menuItemClickEvt();

// 3. Set mobile menu's item
const menuMobileBtn = document.querySelector("#menu-mobile-button");
const menuMobileMdl = document.querySelector(".menu-mobile-modal");

menuMobileBtn.innerHTML = MENU_ICON;

menuMobileBtn.addEventListener("click", function () {
  if (menuMobileMdl.classList.contains("hidden")) {
    menuMobileMdl.classList.remove("hidden");
  } else {
    menuMobileMdl.classList.add("hidden");
  }
});

// 4. Banner
const imageBanner = document.querySelector(".image-banner");
const header = document.querySelector("#header");

let scrollval = 0;
let val = -2;

window.addEventListener("scroll", () => {
  if (val > 0 || window.scrollY < 10) {
    val = -2;
    imageBanner.style.transform = `translate3d(0px, ${val}px, 0px)`;
    return;
  }

  if ((WIDTH > 1024 && window.scrollY > 800) || window.scrollY > 600) {
    header.classList.add("header-active-1");
  } else if (window.scrollY > 300) {
    header.classList.add("header-active");
    header.classList.remove("header-active-1");
  } else {
    header.classList.remove("header-active");
  }

  if (window.scrollY > 1200) {
    imageBanner.style.visibility = "hidden";
    val = -15;
  } else {
    imageBanner.style.visibility = "visible";
  }

  if (scrollval > window.scrollY) {
    // Scroll up
    val += 2;
  } else {
    // Scroll down
    val -= 2;
  }

  imageBanner.style.transform = `translate3d(0px, ${val}px, 0px)`;
  scrollval = window.scrollY;
});

/* CLASSES */
const classesList = document.querySelector(".class-detail-wrapper");

const classesListItems = CLASSES.map((item) => {
  return `<div class="class">
  <div class="upper-text">
    <h3>${item.level}</h3>
    <hr />
    <img src="assets/avatar.png" alt="" />
    <p>Coach. ${item.coach}</p>
  </div>
  <div class="lower-text">
    <h4>Time</h4>
    <p>${item.dayInWeek}</p>
    ${
      item.morning
        ? `
    <h5>Morning</h5>
    <p>${item.morning}</p>`
        : ""
    }
    ${
      item.afternoon
        ? `
    <h5>Afternoon</h5>
    <p>${item.afternoon}</p>`
        : ""
    }
    ${
      item.evening
        ? `
    <h5>Afternoon</h5>
    <p>${item.evening}</p>`
        : ""
    }
  </div>
  <div class="btn-detail">
    <a href="#">
      <button>Detail</button>
    </a>
  </div>
</div>`;
});

classesList.innerHTML = classesListItems.join("");

// /* IMAGE GALLERY */
const imgGalleryEl = document.getElementById("static-thumbnails");

renderImageGallery(imgGalleryEl);

/** WINDOWS RESIZE related evemt */
window.addEventListener("resize", function () {
  WIDTH = this.innerWidth;
  HEIGHT = this.innerHeight;

  if (WIDTH >= 768) {
    renderMenuItems(menu, "menu");
    menuMobile.innerHTML = "";
  } else {
    renderMenuItems(menuMobile, "menu-mobile");
    menu.innerHTML = "";
  }
  menuItemClickEvt();

  if (WIDTH <= 425) {
    liElMobile[0].classList.add("active");
    liElMobile.forEach((item) => {
      item.addEventListener("click", function () {
        clearAllActiveClass(liElMobile);
        this.classList.add("active");
      });
    });
  }
});

/** Header */

/** Animation */
const aboutUsImage = document.querySelector(".about-us-wrapper > .picture");

console.log(aboutUsImage);

gsap.fromTo(aboutUsImage, { x: -1400 }, { x: 0, duration: 1 });
