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

//   Изменение высоты картинка в форме на странице Contacts
function syncHeight() {
  let father = document.querySelector(".col.father_heights");
  let child = document.querySelector(".col.child_heights");
  if (father && child) {
    if (window.innerWidth > 645) {
      child.style.height = father.getBoundingClientRect().height + "px";
    } else {
      child.style.height = "";
    }
  }
}
window.addEventListener("load", syncHeight);
window.addEventListener("resize", syncHeight);
//   КОНЕЦ Изменение высоты картинка в форме на странице Contacts

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

  //   валидация поля телефона формы Contact Us с выпадающим списком
  const input = document.querySelector("#phone");
  const iti = window.intlTelInput(input, {
    initialCountry: "us", // или 'us', 'by', 'ru' и т.д.
    geoIpLookup: (cb) => cb("us"), // без внешних запросов: фиксируем страну
    separateDialCode: true, // показывает код страны отдельно (+1)
    nationalMode: true, // вводим национальный формат
    autoPlaceholder: "aggressive", // «маска»-placeholder под страну
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js",
  });

  // Валидация на лету
  input.addEventListener("blur", () => {
    if (input.value.trim()) {
      const valid = iti.isValidNumber();
      input.classList.toggle("is-invalid", !valid);
      input.setCustomValidity(valid ? "" : "Некорректный номер телефона");
    } else {
      input.setCustomValidity("Укажите номер телефона");
    }
  });

  // На сабмите получаем E.164 (+15551234567)
  document.querySelector("form")?.addEventListener("submit", (e) => {
    if (!input.reportValidity()) {
      e.preventDefault();
      return;
    }
    const full = iti.getNumber(); // +15551234567
    input.value = full; // отправим нормализованный
  });
});
