export function preloaderShow() {
  const preloaderEl = document.querySelector('.preloader');
  setTimeout(() => {
    preloaderEl.classList.add('preloader-hidden');
    document.body.style.overflowY = 'scroll';
  }, 3000);
}
