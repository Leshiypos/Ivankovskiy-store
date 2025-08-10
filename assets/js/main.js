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
});

function dropDownToogle(butSelect, menuSelect) {
  let butLang = document.querySelector(butSelect);
  let dropLang = document.querySelector(menuSelect);
  let insideMenu = false; // флаг

  if (butLang && dropLang) {
    butLang.addEventListener("click", () => {
      dropLang.classList.toggle("visible");
    });
  }
  dropLang.addEventListener("mouseenter", () => {
    insideMenu = true; // зашли в меню
  });
  dropLang.addEventListener("mouseleave", () => {
    if (insideMenu) {
      dropLang.classList.remove("visible");
      insideMenu = false; // сброс
    }
  });
}
