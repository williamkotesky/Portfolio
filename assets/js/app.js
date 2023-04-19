const lampSvg = document.querySelector(".lampSvg");
const backGround = document.querySelector("#body");
const navButton = document.querySelector(".fa-solid");
const navBar = document.querySelector("#navBar-mobile");

const knowledgeGrid = document.querySelector(".knowledge-grid");
const tecnologyContentNodeList = document.querySelectorAll(".p-content");
const tecnologyContent = Array.from(tecnologyContentNodeList);
const tecnologyIconClass = [
  "fa-html5",
  "fa-css3-alt",
  "fa-square-js",
  "fa-react",
  "fa-bootstrap",
  "fa-node-js",
  "svg-type",
  "fa-question",
];

const tecnologyIconNodeList = document.querySelectorAll(".icon-tec");
const tecnologyIcon = Array.from(tecnologyIconNodeList);
const tecnologyActiveIconClass = [
  "iconActiveHtml",
  "iconActiveCss",
  "iconActiveJs",
  "iconActiveReact",
  "iconActiveBootstrap",
  "iconActiveNodeJs",
  "iconActiveType",
  "iconActiveQuestion",
];

const hour = document.querySelector(".hour");
const colon = document.querySelector(".colon");
const minutes = document.querySelector(".minutes");

const controls = document.querySelectorAll(".control");
const items = document.querySelectorAll(".item");
let currentItem = 0;
const maxItems = items.length;
const projectsP = document.querySelectorAll(".projects-p");

const bgIcons = document.querySelector(".bg-icons");
const bgButton = document.querySelector(".bg-button");
const mainNavBar = document.querySelector(".navBar-justify");

function toggleClass(oldClass, newClass, element) {
  const toggle = element.classList.toggle(newClass);
  element.classList = toggle ? newClass : oldClass;
}

lampSvg.addEventListener("click", () => {
  const audio = new Audio("./assets/mp3/LampSwitchSoundEffects.mp3");
  audio.play();

  toggleClass("bgLight", "bgDark", backGround);
  lampSvg.classList.add("chainAnimation");

  setTimeout(() => lampSvg.classList.remove("chainAnimation"), 1000);

  changeBgButtons();
});

navButton.addEventListener("click", () => {
  // console.log('teste')
  // navBar.className === 'navBar-side' ?
  toggleClass("navBar-side", "navBar-hide", navBar);
  // :
  // toggleClass('navBar-hide', 'navBar-side', navBar);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-item"))
    toggleClass("navBar-side", "navBar-hide", navBar);

  if (
    !e.target.classList.contains("expand-container-side") &&
    !e.target.classList.contains("nav-item-list") &&
    !e.target.classList.contains("fa-bars") &&
    navBar.classList.contains("navBar-side")
  )
    toggleClass("navBar-side", "navBar-hide", navBar);
});

knowledgeGrid.addEventListener("click", (e) => {
  //remove active icon css

  tecnologyActiveIconClass.forEach((item) => {
    tecnologyIcon.forEach((element) => {
      if (element.classList.contains(item)) {
        element.classList.remove(item);
      }
    });
  });

  //hide others contents that is not from active
  tecnologyContent.forEach((element) => {
    if (!element.classList.contains("content-display")) {
      element.classList.add("content-display");
    }
  });

  //add active icon css
  tecnologyIconClass.forEach((item, index) => {
    if (item === e.target.classList[2]) {
      e.target.classList.add(tecnologyActiveIconClass[index]);
    }
  });

  //shows active content
  tecnologyIconClass.forEach((item) => {
    if (e.target.classList.contains(item)) {
      tecnologyContent.forEach((element) => {
        if (element.classList.contains(`${item}-content`)) {
          element.classList.remove("content-display");
        }
      });
    }
  });
});

function getTimeWatch(flag) {
  const timeDate = new Date().toLocaleTimeString("pt-br", {
    timeStyle: "short",
  });
  const timeHours = timeDate.slice(0, 2);
  const timeMinutes = timeDate.slice(3, 5);
  return flag ? timeHours : timeMinutes;
}

setInterval(() => {
  hour.innerHTML = getTimeWatch(true);
  minutes.innerHTML = getTimeWatch(false);
  toggleClass("colonVisible", "colonInvisible", colon);
  toggleClass("minutesMarginOff", "minutesMarginOn", minutes);
}, 1000);

controls.forEach((control) => {
  control.addEventListener("click", () => {
    const left = control.classList.contains("fa-chevron-left");

    left ? currentItem-- : currentItem++;

    if (currentItem >= maxItems) currentItem = 0;
    if (currentItem < 0) currentItem = maxItems - 1;

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest",
    });

    items[currentItem].classList.add("current-item");

    projectsP.forEach((p, index) => {
      if (!p.classList.contains("content-display"))
        p.classList.add("content-display");
      if (index === currentItem) p.classList.remove("content-display");
    });
  });
});

function changeBgButtons() {
  if (backGround.classList.contains("bgDark")) {
    bgButton.classList.remove("fa-moon");
    bgButton.classList.add("fa-sun");
  } else {
    bgButton.classList.remove("fa-sun");
    bgButton.classList.add("fa-moon");
  }
}

let cont = 0;
let cont2 = 0;
function buttonAnimation(flag) {
  if (!flag) {
    cont2++;
    cont = 0;
    bgIcons.classList.add("content-display");
    mainNavBar.classList.add("navBar-justify");
    return;
  }
  cont++;
  cont2 = 0;
  bgIcons.classList.remove("content-display");
  mainNavBar.classList.remove("navBar-justify");
}

window.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  if (window.scrollY > 250 && cont === 0) buttonAnimation(true);
  if (window.scrollY < 250 && cont > 0 && cont2 === 0) buttonAnimation(false);
});

bgButton.addEventListener("click", () => {
  toggleClass("bgLight", "bgDark", backGround);
  changeBgButtons();
});
