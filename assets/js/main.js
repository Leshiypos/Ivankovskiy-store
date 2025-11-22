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
  let father = document.querySelector(".father_heights");
  let child = document.querySelector(".child_heights");
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

// Страница Каталог
function calcHeihgtPromoCard() {
  const promoCards = document.querySelectorAll(
    ".product_list article.cart.promo_cart"
  );
  const card = document.querySelector(
    ".product_list article.cart:not(.promo_cart)"
  );
  if (!promoCards.length && !card) return;

  const heightStyle = card.querySelector(".description_wrap").offsetHeight;
  promoCards.forEach((card) => {
    card.style.height = "";
    if (window.innerWidth > 999) {
      card.style.height = card.offsetHeight - heightStyle + "px";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  //   Кнопка выпадающего меню Язык в шапке
  dropDownToogle(
    ".top_header .language-dropdown .dropdownToggle",
    ".top_header .language-dropdown .dropdownMenu"
  );
  //   Кнопка выпадающего меню Валюты в шапке
  dropDownToogle(
    ".top_header .сurrency-dropdown .dropdownToggle",
    ".top_header .сurrency-dropdown .dropdownMenu"
  );

  //   Кнопка выпадающего меню Язык Мобильная
  dropDownToogle(
    ".mobile_menu .language-dropdown .dropdownToggle",
    ".mobile_menu .language-dropdown .dropdownMenu"
  );
  //   Кнопка выпадающего меню Валюты Мобильная
  dropDownToogle(
    ".mobile_menu .сurrency-dropdown .dropdownToggle",
    ".mobile_menu .сurrency-dropdown .dropdownMenu"
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

  //   Кнопка +_ в корзине

  (function () {
    // Делегирование — работает для любых строк корзины
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(
        ".wc-block-components-quantity-selector__button"
      );
      if (!btn) return;

      const box = btn.closest(".wc-block-components-quantity-selector");
      const input =
        box &&
        box.querySelector(".wc-block-components-quantity-selector__input");
      if (!input || input.disabled) return;

      // Читаем ограничения
      const step = parseFloat(input.getAttribute("step")) || 1;
      const min = isNaN(parseFloat(input.getAttribute("min")))
        ? 1
        : parseFloat(input.getAttribute("min"));
      const max = isNaN(parseFloat(input.getAttribute("max")))
        ? Infinity
        : parseFloat(input.getAttribute("max"));

      // Текущее значение (поддержим запятую как десятичный разделитель)
      let val = parseFloat(String(input.value).replace(",", "."));
      if (isNaN(val)) val = min;

      // Что нажали
      const isMinus = btn.classList.contains(
        "wc-block-components-quantity-selector__button--minus"
      );
      val = isMinus ? val - step : val + step;

      // Клэмп по min/max и нормализация точности
      val = Math.max(min, Math.min(max, val));
      // Если шаг целый — приводим к целому
      const normalized = Number.isInteger(step)
        ? Math.round(val)
        : +val.toFixed(3);

      input.value = normalized;

      // Уведомим Woo/React об изменении
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Бонус: стрелки ↑/↓ на инпуте меняют количество
    document.addEventListener("keydown", function (e) {
      const input = e.target.closest(
        ".wc-block-components-quantity-selector__input"
      );
      if (!input) return;

      const step = parseFloat(input.getAttribute("step")) || 1;
      const min = isNaN(parseFloat(input.getAttribute("min")))
        ? 1
        : parseFloat(input.getAttribute("min"));
      const max = isNaN(parseFloat(input.getAttribute("max")))
        ? Infinity
        : parseFloat(input.getAttribute("max"));
      let val = parseFloat(String(input.value).replace(",", "."));
      if (isNaN(val)) val = min;

      if (e.key === "ArrowUp" || e.key === "+") {
        e.preventDefault();
        val = Math.min(max, val + step);
      } else if (e.key === "ArrowDown" || e.key === "-") {
        e.preventDefault();
        val = Math.max(min, val - step);
      } else {
        return;
      }
      input.value = Number.isInteger(step) ? Math.round(val) : +val.toFixed(3);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
  })();

  //   Мобильное меню
  // Открытие меню
  let btnMenuMobOpen = document.getElementById("berger_btn_open_menu");
  let btnMenuMobClose = document.getElementById("close_menu_btn");
  const mobMenu = document.querySelector(".mobile_menu");
  if (btnMenuMobOpen && mobMenu && btnMenuMobClose) {
    btnMenuMobOpen.addEventListener("click", (e) => {
      mobMenu.classList.add("opened");
    });
    btnMenuMobClose.addEventListener("click", (e) => {
      mobMenu.classList.remove("opened");
    });
  }
  //   Функция создания кнопки назад
  function createBackBut(item) {
    const header = item.firstElementChild; // <a> или <h6>
    if (
      header &&
      (header.tagName === "H6" || header.tagName === "A") &&
      !header.querySelector(".back_btn")
    ) {
      const backBtn = document.createElement("button");
      backBtn.type = "button";
      backBtn.className = "back_btn";
      backBtn.innerHTML =
        "<img src='./assets/images/icons/back.svg' alt='' /> Back";
      header.prepend(backBtn);
      header.classList.add("active");
    }
  }

  // Функция получения всех братьев элемента
  function getSiblings(el, selector) {
    if (!el || !el.parentElement) return [];
    return Array.from(el.parentElement.children).filter(
      (node) => node !== el && (!selector || node.matches(selector))
    );
  }

  //   функция появления dropDown
  function showDropDown(e) {
    e.stopPropagation();
    let item = e.currentTarget;
    createBackBut(item);
    console.log(item);
    let subMenu = item.querySelector(".dropdawnWrap");
    if (subMenu) {
      subMenu.classList.add("visible");
    }
    getSiblings(item).forEach((e) => {
      e.classList.add("hidden");
    });
  }

  //   получаем все меню первого уровня
  let itemsMenuFirst = document.querySelectorAll(".mobile_menu li.parent");
  //    получаем все меню воторого уровня
  let itemMenuSecond = document.querySelectorAll(".mobile_menu .wrap_sub_menu");

  if (itemsMenuFirst) {
    itemsMenuFirst.forEach((item) => {
      item.addEventListener("click", showDropDown);
    });
  }
  if (itemMenuSecond) {
    itemMenuSecond.forEach((item) => {
      item.addEventListener("click", showDropDown);
    });
  }

  //   Обрабатываем Закрытие по кнопке BACK
  const menuBlock = document.querySelector(".mobile_menu .menu_block");

  if (menuBlock) {
    menuBlock.addEventListener(
      "click",
      function (e) {
        const backBtn = e.target.closest(".back_btn");
        if (!backBtn) return;

        e.preventDefault();
        e.stopPropagation();

        // header — это <a> или <h6>, куда мы вставляли кнопку
        const header = backBtn.closest("h6, a");
        if (!header) return;

        // item — текущий контейнер уровня: <li.parent> или .wrap_sub_menu
        const item = header.parentElement;

        // скрываем его подменю
        const subMenu = Array.from(item.children).find(
          (ch) => ch.classList && ch.classList.contains("dropdawnWrap")
        );
        if (subMenu) subMenu.classList.remove("visible");

        // показываем соседние пункты этого уровня
        getSiblings(item).forEach((s) => s.classList.remove("hidden"));

        // убираем кнопку и состояние
        header.classList.remove("active");
        backBtn.remove();
      },
      true // capture!
    );
  }
  // Конец мобильного меню

  // Начало моюильного меню футера

  if (window.innerWidth < 561) {
    // footerMobMenu();
  }
  function footerMobMenu() {
    const root = document.querySelector(".footer_menu .menu");
    const singleOpen = true; // =false, если можно открывать несколько

    if (!root) return;

    // инициализация всех подпунктов
    root.querySelectorAll(":scope > li > a").forEach((trigger) => {
      const panel = trigger.nextElementSibling;
      if (!panel || !panel.classList.contains("sub_menu")) return;

      // старт: закрыто
      trigger.setAttribute("aria-expanded", "false");
      panel.style.overflow = "hidden";
      panel.style.height = "0px";
      panel.hidden = true;

      trigger.addEventListener("click", (e) => {
        // даём линкам-родителям работать как кнопки
        e.preventDefault();

        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        if (singleOpen) {
          // закрыть другие открытые
          root
            .querySelectorAll(':scope > li > a[aria-expanded="true"]')
            .forEach((t) => {
              if (t !== trigger) slideUp(t.nextElementSibling, t);
            });
        }

        isOpen ? slideUp(panel, trigger) : slideDown(panel, trigger);
      });
    });
  }

  // helpers
  function slideDown(panel, trigger) {
    trigger.setAttribute("aria-expanded", "true");
    panel.hidden = false;

    const end = panel.scrollHeight; // высота контента
    panel.style.transition = "height 300ms ease";
    panel.style.height = "0px"; // на всякий случай
    requestAnimationFrame(() => {
      panel.style.height = end + "px";
    });

    const done = (e) => {
      if (e.propertyName !== "height") return;
      panel.removeEventListener("transitionend", done);
      panel.style.transition = "";
      panel.style.height = "auto"; // чтобы адаптировалась к высоте контента
    };
    panel.addEventListener("transitionend", done);
  }

  function slideUp(panel, trigger) {
    trigger.setAttribute("aria-expanded", "false");

    // фиксируем текущую высоту и едем к 0
    panel.style.height = panel.scrollHeight + "px";
    panel.style.transition = "height 300ms ease";
    requestAnimationFrame(() => {
      panel.style.height = "0px";
    });

    const done = (e) => {
      if (e.propertyName !== "height") return;
      panel.removeEventListener("transitionend", done);
      panel.style.transition = "";
      panel.hidden = true; // чтобы не мешало табом и экранным читалкам
    };
    panel.addEventListener("transitionend", done);
  }
  //   Конец Мобильного меню футера

  // 3D визуализация
  // Слайдеры картинок
  //   const models = document.querySelectorAll("model-viewer");
  //   if (models) {
  //     models.forEach((mv) => {
  //       if (!mv.classList.contains("product_page")) {
  //         mv.addEventListener("mouseenter", () => mv.dismissPoster());
  //         mv.addEventListener("mouseleave", () => mv.showPoster());
  //       }
  //     });
  //   }

  //Расчет высоты помо карточки товара на странице товара
  if (window.innerWidth > 999) {
    calcHeihgtPromoCard();

    let bFunc; // таймер

    window.addEventListener("resize", () => {
      clearTimeout(bFunc); // отменить предыдущий таймер
      bFunc = setTimeout(() => {
        calcHeihgtPromoCard(); // вызвать после 1 секунды "покоя"
      }, 1000);
    });
  }
});
