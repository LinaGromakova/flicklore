import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
export default function generateSlider() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    keyboard: true,
    touchMove: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
