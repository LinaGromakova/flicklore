export function preloaderShow() {
  const preloaderEl = document.querySelector('.preloader');
  const fullscreenEl = document.querySelector('.fullscreen');
  setTimeout(() => {
    preloaderEl.classList.add('hidden');
    document.body.style.overflowY = 'scroll';
    fullscreenEl.style.display = 'block';
  }, 3000);
  setTimeout(() => {
    preloaderEl.remove();
  }, 3500);
}
