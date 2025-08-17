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
  if (input) {
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
  }

  //   Аккордион

  (function () {
    const acc = document.querySelector(".accordion");
    if (!acc) return;

    const allowMultiple = acc.hasAttribute("data-allow-multiple");

    acc.addEventListener("click", (e) => {
      const btn = e.target.closest(".accordion__trigger");
      if (!btn) return;

      const targetOpen = btn.getAttribute("aria-expanded") !== "true";

      // Если разрешено только одно открытие — закрываем остальные
      if (!allowMultiple && targetOpen) {
        acc
          .querySelectorAll('.accordion__trigger[aria-expanded="true"]')
          .forEach((b) => {
            if (b !== btn) toggle(b, false);
          });
      }
      toggle(btn, targetOpen);
    });

    // Клавиатура: стрелки перемещают фокус, Home/End — к первому/последнему
    acc.addEventListener("keydown", (e) => {
      const triggers = [...acc.querySelectorAll(".accordion__trigger")];
      const i = triggers.indexOf(document.activeElement);
      if (i === -1) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        triggers[(i + 1) % triggers.length].focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        triggers[(i - 1 + triggers.length) % triggers.length].focus();
      }
      if (e.key === "Home") {
        e.preventDefault();
        triggers[0].focus();
      }
      if (e.key === "End") {
        e.preventDefault();
        triggers[triggers.length - 1].focus();
      }
    });

    function toggle(btn, open) {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(open));

      if (open) {
        panel.hidden = false;
        panel.style.height = "auto";
        const end = panel.scrollHeight + "px";
        panel.style.height = "0px";
        panel.offsetHeight; // reflow
        panel.style.height = end;
        panel.addEventListener("transitionend", function onEnd(e) {
          if (e.propertyName !== "height") return;
          panel.style.height = "auto"; // фикс высоты после анимации
          panel.removeEventListener("transitionend", onEnd);
        });
      } else {
        const start = panel.scrollHeight + "px";
        panel.style.height = start;
        panel.offsetHeight;
        panel.style.height = "0px";
        panel.addEventListener("transitionend", function onEnd(e) {
          if (e.propertyName !== "height") return;
          panel.hidden = true;
          panel.style.height = "";
          panel.removeEventListener("transitionend", onEnd);
        });
      }
    }
  })();

  //   Конец аккордиона на странице товара
});
