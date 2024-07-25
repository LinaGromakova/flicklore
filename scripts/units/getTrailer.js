export async function getTrailer(movie) {
  let obj = {};
  await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=ru-RU&api_key=298a48829dc126ce25273ee5142aee47`
  )
    .then((response) => response.json())
    .then((video) => {
      if (video.results[0]) {
        obj = video.results[0];
        document.querySelectorAll('.link-wrapper').forEach((link) => {
          let matchingId = link.dataset.jsLinkId;

          if (matchingId == video.id) {
            link.innerHTML = `
            <a class="js-link-btn" href="https://www.youtube.com/embed/${obj.key}" target="blank">
              <button class="btn-main">
                    <svg height="14" viewBox="0 -960 440 560" width="11">
                      <path d="m 0,-400 v -560 l 440,280 z m 80,-280 z m 0,134 210,-134 -210,-134 z" />
                    </svg>
                    Смотреть трейлер
                  </button>
            </a>`;
          }
        });
      }
    });
}
