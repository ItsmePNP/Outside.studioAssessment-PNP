const hamburgerMenu = document.querySelector('.menu__toggle');
const offpageHeader = document.querySelector('.header__offpage');

function toggleMenu() {
  hamburgerMenu.classList.toggle('active');
  offpageHeader.classList.toggle('show');
}

function closeMenu() {
  hamburgerMenu.classList.remove('active');
  offpageHeader.classList.remove('show');
  removeActiveClasses();
}

function removeActiveClasses() {
  const menuItems = document.querySelectorAll('.menu__item--has-submenu');
  menuItems.forEach(item => {
    const sublist = item.querySelector('.menu__submenu');
    sublist.classList.remove('is__active');
  });
}

hamburgerMenu.addEventListener('click', toggleMenu);


document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu__item');
  menuItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.stopPropagation(); // Stop the event from bubbling up
      const sublist = item.querySelector('.menu__submenu');
      if (sublist) {
        menuItems.forEach(otherItem => {
          const otherSublist = otherItem.querySelector('.menu__submenu');
          if (otherSublist && otherSublist !== sublist) {
            otherSublist.classList.remove('is__active');
          }
        });
        sublist.classList.toggle('is__active');
      }
    });

    const subCloseLinks = item.querySelectorAll('.nav__close');
    subCloseLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        closeMenu();
      });
    });

    const backLinks = item.querySelectorAll('.submenu__back');
    backLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        const submenu = link.closest('.menu__submenu');
        submenu.classList.remove('is__active');
      });
    });
  });
});

const announcementCloseButton = document.querySelector('.announcement__close');
const announcement = document.querySelector('.header__announcement');

announcementCloseButton.addEventListener('click', () => {
  announcement.style.display = 'none';
});




function initializeSwiper(selector, options = {}) {
  // Allow customization of slidesPerView and navigation class
  const defaultOptions = {
    slidesPerView: 2.5, 
    spaceBetween: 10,   
    // loop: true,         
    autoplay: {         
      delay: 3000,
    },
    speed: 800,          
    navigation: {        
      nextEl: null,      
      prevEl: null,      
    },
  };

  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options };

  // Handle navigation class if provided
  if (options.navigationClass) {
    mergedOptions.navigation.nextEl = `.${options.navigationClass}-next`;
    mergedOptions.navigation.prevEl = `.${options.navigationClass}-prev`;
  }

  return new Swiper(selector, mergedOptions);
}


const bestsellerSwiper = initializeSwiper('.featured__slider--bestseller');
const mealtimeSwiper = initializeSwiper('.featured__slider--mealtime');
// const playboxSwiper = initializeSwiper('.featured__slider--playbox',{
//   slidesPerView: 2,
// });
const mealtimeSwiperDesktop = initializeSwiper('.featured__slider--mealtime-desktop', {
  slidesPerView: 4,
  navigationClass: 'slider__nav',
});
const playboxSwiperDesktop = initializeSwiper('.featured__slider--playbox--desktop', {
  slidesPerView: 2,
});





// This tab system is made for maximum accessibility with Keyboard interaction. see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');

  // Add a click event handler to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
  });

  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  tabList.addEventListener("keydown", (e) => {
    // Move right
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      tabs[tabFocus].setAttribute("tabindex", -1);
      if (e.key === "ArrowRight") {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.key === "ArrowLeft") {
        tabFocus--;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }
  });
});

function changeTabs(e) {
  const target = e.target;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;

  // Remove all current selected tabs
  parent
    .querySelectorAll('[aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false));

  // Set this tab as selected
  target.setAttribute("aria-selected", true);

  // Hide all tab panels
  grandparent
    .querySelectorAll('[role="tabpanel"]')
    .forEach((p) => p.setAttribute("hidden", true));

  // Show the selected panel
  grandparent.parentNode
    .querySelector(`#${target.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}

