document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  //   Анимация логотипа
  gsap.from(".logo", { y: 30, opacity: 0, duration: 0.8, delay: 0.3 });

  //   Функция анимации слайдера
  function animateStripeOnce(section) {
    const cards = gsap.utils.toArray(
      section.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)")
    );
    const triger = section.querySelector(".swiper");

    gsap.from(cards, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2, // задержка 1 сек между карточками
      scrollTrigger: {
        trigger: triger,
        start: "top 70%",
        once: true,
        markers: false,
      },
    });
  }

  //   Анимация секциии ряда
  let stripeSections = document.querySelectorAll(".stripe_section");
  if (stripeSections) {
    stripeSections.forEach(animateStripeOnce);
  }
  //   Анимация секциии Слайдера
  let sliderSection = document.querySelectorAll(".slider_section");
  if (sliderSection) {
    sliderSection.forEach(animateStripeOnce);
  }
  //   Анимация секциии Новости
  let newsSection = document.querySelectorAll(".news_section");
  if (newsSection) {
    newsSection.forEach(animateStripeOnce);
  }

  //   Анимация банера
  function banerAnimation(selector) {
    const banerSections = document.querySelectorAll(selector);
    if (banerSections) {
      banerSections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          //   delay: 1,

          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
            markers: false,
          },
        });
      });
    }
  }

  banerAnimation(".baner_section");
  banerAnimation(".video_baner");
});
