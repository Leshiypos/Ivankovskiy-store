document.addEventListener("DOMContentLoaded", () => {
  let sliders_stripe = document.querySelectorAll(".stripe_slider");

  if (sliders_stripe) {
    sliders_stripe.forEach((slider) => {
      new Swiper(slider, {
        speed: 400,
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          430: {
            slidesPerView: 2,
          },
          730: { slidesPerView: 2 },
          1000: {
            slidesPerView: 5,
          },
        },
      });
    });
  }

  let sliders_section = document.querySelectorAll(
    ".slider_section .img_slider"
  );

  if (sliders_section) {
    sliders_section.forEach((slider) => {
      new Swiper(slider, {
        speed: 400,
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 10,
      });
    });
  }

  //   Блок новости
  let news_section = document.querySelectorAll(
    ".news_section .swiper.news_slider"
  );
  if (news_section) {
    news_section.forEach((slider) => {
      new Swiper(slider, {
        speed: 400,
        slidesPerView: 1.3,
        spaceBetween: 16,
        breakpoints: {
          530: {
            spaceBetween: 36,
          },

          1000: {
            slidesPerView: 3,
          },
        },
      });
    });
  }
});
