function dropDownToogle(butSelect, menuSelect) {
  let butLang = document.querySelector(butSelect);
  let dropLang = document.querySelector(menuSelect);
  let insideMenu = false;
  let closeMenu;

  if (butLang && dropLang) {
    butLang.addEventListener("click", () => {
      dropLang.classList.toggle("visible");
    });
    butLang.addEventListener("mouseenter", () => {
      clearTimeout(closeMenu);
    });

    butLang.addEventListener("mouseleave", () => {
      closeMenu = setTimeout(() => {
        dropLang.classList.remove("visible");
      }, 1000);
    });

    dropLang.addEventListener("mouseenter", () => {
      clearTimeout(closeMenu);
    });

    dropLang.addEventListener("mouseleave", () => {
      closeMenu = setTimeout(() => {
        dropLang.classList.remove("visible");
      }, 1000);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //   Кнопка выпадающего меню Язык
  dropDownToogle(
    ".language-dropdown .dropdownToggle",
    ".language-dropdown .dropdownMenu"
  );
  //   Кнопка выпадающего меню Валюты
  dropDownToogle(
    ".сurrency-dropdown .dropdownToggle",
    ".сurrency-dropdown .dropdownMenu"
  );

  //   Главное меню
  let listMenu = document.querySelectorAll(".main_menu > ul > li");

  listMenu.forEach((item) => {
    let subMenu = item.querySelector(".dropdawnWrap");
    let closeMenu;

    if (!subMenu) return;

    item.addEventListener("mouseenter", () => {
      let openSubMenus = document.querySelectorAll(".main_menu .visible");

      if (openSubMenus.length) {
        clearTimeout(closeMenu);
        openSubMenus.forEach((sm) => sm.classList.remove("visible"));
      }

      subMenu.classList.add("visible");
    });

    item.addEventListener("mouseleave", () => {
      closeMenu = setTimeout(() => {
        subMenu.classList.remove("visible");
      }, 1000);
    });
  });
});
