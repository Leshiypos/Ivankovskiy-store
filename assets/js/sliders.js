document.addEventListener("DOMContentLoaded", () => {
  let sliders_stripe = document.querySelectorAll(".stripe_slider");

  if (sliders_stripe) {
    sliders_stripe.forEach((slider) => {
      new Swiper(slider, {
        speed: 400,
        slidesPerView: 5,
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
});
