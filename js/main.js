// Start Setting Box

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Select Gear Icon
let gear = document.querySelector(".set-box-gear");
// Select Setting Box
let setBox = document.querySelector(".set-box");
// Selecting Colors in Color Pallet
let palletColors = document.querySelectorAll(".color-pallet li");
// Selecting Background Changing Buttons
let randomBg = document.querySelector(".random");
let staticBg = document.querySelector(".static");

// Keeping The Selected Color After Reload
let storedColor = localStorage.getItem("ThemeColor");
if (storedColor) {
  document.documentElement.style.setProperty("--main-color", storedColor);

  palletColors.forEach((li) => {
    if (getComputedStyle(li).backgroundColor === storedColor) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

let storedBg = localStorage.getItem("landingBg");
// Variable To Check For Background Option Status
let bgStatus = localStorage.getItem("bgStatus");

// Opening and Closing Setting Box
gear.addEventListener("click", () => {
  // Gear Animation
  gear.firstElementChild.classList.toggle("fa-spin");

  // Toggling Setting box
  setBox.classList.toggle("open");
});

let selectedColor;
// Changing Color Theme
palletColors.forEach((color) => {
  color.addEventListener("click", (e) => {
    // looping To Add Marker To Selected Color
    palletColors.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");

    // Saving Selected Theme To Local Storage
    localStorage.setItem("ThemeColor", getComputedStyle(e.target).backgroundColor);
    selectedColor = localStorage.getItem("ThemeColor");

    // Set Main Color Variable in Root With Selected Color
    document.documentElement.style.setProperty("--main-color", selectedColor);
  });
});

// Storing Random Background Interval ID
let randomBgInterval;
// Choosing Random Background Style
randomBg.addEventListener("click", () => {
  bgStatus = true;
  // Saving Status to Local Storage
  localStorage.setItem("bgStatus", bgStatus);
  // Changing Style Of Selected Button
  staticBg.classList.remove("active");
  randomBg.classList.add("active");

  // Set New Interval ID
  randomBgInterval = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * bgArr.length);
    landingPage.style.backgroundImage = `url(images/${bgArr[randomIndex]})`;
  }, 5000);
});

// Static Background Style
staticBg.addEventListener("click", () => {
  bgStatus = false;
  // Saving Status to Local Storage
  localStorage.setItem("bgStatus", bgStatus);
  // Changing Style Of Selected Button
  randomBg.classList.remove("active");
  staticBg.classList.add("active");

  // Stopping Random Background Interval
  clearInterval(randomBgInterval);
  localStorage.setItem("landingBg", getComputedStyle(landingPage).backgroundImage);
});

// Reset Options Button
document.querySelector(".reset-options").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

// End Setting Box

// Start Changing Landing Page Background
// Array Of Background Images
let bgArr = [
  "lp-background1.jpg",
  "lp-background2.jpg",
  "lp-background3.jpg",
  "lp-background4.jpg",
  "lp-background5.jpg",
];

// Initial Background Status
if (bgStatus !== "false") {
  // Changing Background Each 5 sec
  randomBgInterval = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * bgArr.length);
    landingPage.style.backgroundImage = `url(../images/${bgArr[randomIndex]})`;
    staticBg.classList.remove("active");
    randomBg.classList.add("active");
  }, 5000);
} else {
  landingPage.style.backgroundImage = localStorage.getItem("landingBg");
  randomBg.classList.remove("active");
  staticBg.classList.add("active");
}
// End Changing Landing Page Background

// Start Our Skills Section Animation
// Select Section Element
window.addEventListener("scroll", () => {
  let skills = document.querySelector(".our-skills");

  // Select All Skill Bars
  let skillBars = document.querySelectorAll(".skill-bar");

  // Section Offset Top
  let skillsOffsetTop = skills.offsetTop;

  // Section Outer Height
  let skillsOuterHeight = skills.offsetHeight;

  // Window Height
  let windowHeight = window.innerHeight;

  // Window Scroll Top
  let windowScrollTop = window.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // Manipulate Skill Bar Pseudo-Element Width
    skillBars.forEach((bar) => {
      // Storing Data Attribute Value
      let skillPercentage = bar.getAttribute("data-progress");
      // Creating CSS Custom Variable For Skill Bar Element
      bar.style.setProperty("--skill-bar-width", skillPercentage);
      // Activating The Class Styled With The Custom Variable
      bar.classList.add("full");
    });
  }
});

// Start Gallery Popup Box
// Select All Images Inside The Gallery
let galleryImgs = document.querySelectorAll(".gallery-box img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Popup Overlay
    let overlay = document.createElement("div");
    overlay.className = "gallery-overlay";
    document.body.appendChild(overlay);

    // Create Image Preview Box
    let imgBox = document.createElement("div");
    imgBox.className = "img-preview";
    let previewImg = document.createElement("img");
    previewImg.src = e.target.src;
    imgBox.appendChild(previewImg);
    document.body.appendChild(imgBox);

    // Create Previewed Image Title
    let imgTitle = document.createElement("h3");
    imgBox.prepend(imgTitle);
    if (e.target.alt) {
      let imgTitleText = document.createTextNode(e.target.alt);
      imgTitle.appendChild(imgTitleText);
    } else {
      let imgTitleText = document.createTextNode("Gallery Picture");
      imgTitle.appendChild(imgTitleText);
    }

    // Create Close Button
    let closeBtn = document.createElement("span");
    closeBtn.className = "gallery-close-btn";
    let closeBtnText = document.createTextNode("×");
    closeBtn.appendChild(closeBtnText);
    imgBox.appendChild(closeBtn);

    // Close Button Function
    closeBtn.addEventListener("click", () => {
      closeBtn.parentElement.remove();
      overlay.remove();
    });
  });
});

// End Gallery Popup Box

// Start Nav Bullet

// // Function To Hide Nav Bullets While On Landing BG
// function navBulletOnLanding() {
//   // Calculate Top Value of Bullet Div
//   let bulletTop = navBullets.getBoundingClientRect().top;
//   // Calculate Top Value of Landing Page
//   let landingTop = landingPage.getBoundingClientRect().top;
//   let windowHeight = window.innerHeight;

//   if (bulletTop >= landingTop && bulletTop <= landingTop + windowHeight) {
//     navBullets.style.display = "none";
//   } else {
//     navBullets.style.display = "block";
//   }
// }

// Select All Landing Page Menu Links
let lpLinks = document.querySelectorAll(".lp-link");

// Select All Bullet Elements
let bullets = document.querySelectorAll(".nav-bullets .bullet");

// Creating Function To Scroll To Any Selected Section
function scrollToSection(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      // Prevent Default Actions If Target Element Was Link
      e.preventDefault();

      // Store Selected Section Class Name
      let sectionClassName = document.querySelector(e.target.dataset.section);

      // Scroll Into Selected Section
      sectionClassName.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(lpLinks);
scrollToSection(bullets);

// Select Nav Bullets Div
let navBullets = document.querySelector(".nav-bullets");

// Control Box To Show Or Hide Nav Bullets
let navBulletStatus = "";
let toolBoxBtns = document.querySelectorAll(".landing-nb button");
let showBtn = document.querySelector(".landing-nb .show");
let hideBtn = document.querySelector(".landing-nb .hide");

if (localStorage.getItem("navBullet") === "true") {
  hideBtn.classList.remove("active");
  showBtn.classList.add("active");
  navBullets.style.display = "block";

  // // // Hide Nav Bullets While At Landing Page
  // window.addEventListener("load", navBulletOnLanding);
  // window.addEventListener("scroll", navBulletOnLanding);
} else if (localStorage.getItem("navBullet") === "false") {
  showBtn.classList.remove("active");
  hideBtn.classList.add("active");
  navBullets.style.display = "none";
}

// Styling Selected Button
toolBoxBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    toolBoxBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.classList.contains("show")) {
      navBullets.style.display = "block";
      navBulletStatus = true;
      localStorage.setItem("navBullet", navBulletStatus);
    } else {
      navBullets.style.display = "none";
      navBulletStatus = false;
      localStorage.setItem("navBullet", navBulletStatus);
    }
  });
});
// End Nav Bullet

// Start Toggle Menu
let toggleMenuBtn = document.querySelector(".lp-toggle-menu");
let toggleMenuLinks = document.querySelector(".lp-header ul");

toggleMenuBtn.addEventListener("click", (e) => {
  // Stop Propagation
  e.stopPropagation();

  toggleMenuLinks.classList.toggle("open");
});

// Stop Propagation On Menu Links
toggleMenuLinks.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenuBtn && e.target !== toggleMenuLinks) {
    toggleMenuLinks.classList.remove("open");
  }
});
// End Toggle Menu
