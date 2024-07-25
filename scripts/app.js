import generateSlider from './units/slider.js';
import { generateStars } from './units/generateRating.js';
import { getTrailer } from './units/getTrailer.js';
import { preloaderShow } from './units/preloader.js';

let theme = 'dark';
const btnThemeChange = document.querySelector('.js-btn-theme');
btnThemeChange.addEventListener('click', () => {
  document.querySelector('.filter-wrapper').innerHTML = '';
  document.body.dataset.theme == 'dark'
    ? (document.body.dataset.theme = 'light')
    : (document.body.dataset.theme = 'dark');
  if (document.body.dataset.theme == 'dark') {
    theme = 'dark';
    return generateFilters(theme);
  } else {
    theme = 'light';
    return generateFilters(theme);
  }
});
const slider = document.querySelector('.swiper-wrapper');
const wrapperEl = document.querySelector('.movie-card-wrapper');
const btnClearSearch = document.querySelector('#clear-search');
const btnClearFilter = document.querySelector('#clear-filter');
const btnSearch = document.querySelector('.search-btn');
const searchEl = document.querySelector('#search');
const wrapperSearch = document.querySelector('.search-wrapper');
const btnSearchOpen = document.querySelector('.js-btn-search');
btnSearchOpen.addEventListener('click', () => {
  wrapperSearch.classList.add('active');
});
const filterWrapper = document.querySelector('.sidebar-filter');
const btnFilterOpen = document.querySelector('.js-btn-filter');
const btnCloseFilter = document.querySelector('.btn-filter-hide');

btnFilterOpen.addEventListener('click', () => {
  filterWrapper.classList.add('active');
  btnSearchOpen.disabled = true;
});
btnCloseFilter.addEventListener('click', () => {
  filterWrapper.classList.remove('active');
  btnSearchOpen.disabled = false;
});
const btnCloseSearch = document.querySelector('.js-btn-close-search');
btnCloseSearch.addEventListener('click', () => {
  wrapperSearch.classList.remove('active');
});
const genreId = {
  28: 'Экшен',
  12: 'Приключения',
  16: 'Анимация',
  35: 'Комедия',
  80: 'Криминал',
  99: 'Документальный',
  18: 'Драма',
  10751: 'Семейный',
  14: 'Фэнтези',
  36: 'Историческое',
  27: 'Хоррор',
  10402: 'Мюзикл',
  9648: 'Мистика',
  10749: 'Романтика',
  878: 'Сай-фай',
  10770: 'TV Movie',
  53: 'Триллер',
  10752: 'Война',
  37: 'Вестерн',
};
let slideHTML = '';
let filterGenres = [];
let arrayData;
let page = 1;
let pageNext = page + 1;
let pageАfter = pageNext + 1;
let arrPages = [page, pageNext, pageАfter];
const apiKey = '298a48829dc126ce25273ee5142aee47';
let overlayInfo = '';
let generateHTML = '';

let totalPage = 500;
let paginationWrap = document.querySelector('.pagination-wrapper');
let paginationHTML = `
 <button class="btn-pagination btn-prev" title="Прошлая страница">
    <svg height="12" viewBox="0 -960 296 480" width="7.4000001">
      <path d="M 240,-480 0,-720 l 240,-240 56,56 -184,184 184,184 z" id="path2" />
    </svg>
    </button>
    <button class="btn-pagination js-btn-pag-change btn-num-page current">1</button>
    <button class="btn-pagination js-btn-pag-change btn-num-page">2</button>
    <button class="btn-pagination js-btn-pag-change btn-num-page">3</button>
    <button class="btn-pagination btn-select" title="Выбрать страницу">
      <input type="number" name="select page" class="input-select-page" title="Выберите номер страницы" placeholder="№ page" max="${totalPage}" min="1"
      onchange="this.value < this.min ? (this.value = this.min) : true;"/>
      ...
    </button>
    <button class="btn-pagination  btn-num-page btn-last-page" title="Последняя страница">${totalPage}</button>
    <button class="btn-pagination btn-next" title="Следующая страница">
      <svg height="12" viewBox="0 -960 296 480" width="7.4000001">
        <path d="M 56,-480 296,-720 56,-960 0,-904 184,-720 0,-536 Z" id="path2" />
      </svg>
  </button>
  `;
let i = 1;
let j = 1;
let url = ``;
let genres = '';
paginationWrap.innerHTML = paginationHTML;
//preloaderShow();

function generateLibrary() {
  i == 2 ? (btnClearSearch.style.display = ``) : (btnClearSearch.style.display = 'none');
  j == 2 ? (btnClearFilter.style.display = ``) : (btnClearFilter.style.display = 'none');
  let searchValue = searchEl.value;
  if (i == 1) {
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=ru-RU&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`;
    totalPage = 500;
    btnFilterOpen.disabled = false;
    document.querySelectorAll('.filter').forEach((filterEl) => {
      filterEl.disabled = false;
    });
  } else {
    filterGenres = [];
    document.querySelectorAll('.filter').forEach((filterEl) => {
      btnFilterOpen.disabled = true;
      filterEl.disabled = true;
      filterEl.checked = false;
    });
    document.querySelector('.filter-wrapper').children.disabled = true;
    url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=ru-RU&api_key=${apiKey}&page=${page}`;
  }
  if (j == 2) {
    url = url + `&with_genres=` + filterGenres;
    document.querySelector('#clear-filter').style.display = ``;
  }
  async function getLibrary() {
    generateHTML = '';
    await fetch(url)
      .then((response) => response.json())
      .then((movies) => {
        if (i !== 1) {
          document.querySelector('.input-select-page').max = movies.total_pages;
          document.querySelector('.btn-last-page').textContent = movies.total_pages;
        } else {
          document.querySelector('.btn-last-page').textContent = 500;
        }
        if (movies.results.length == 0) {
          generateHTML += `
          <div class="wrapper-error">
            <h3 class="error-title">404</h3>
            <p class="error-subtitle">Страница не найдена, попробуйте позже</p>
          </div>
        `;
          document.querySelector('.btn-next').disabled = true;
          document.querySelector('.btn-prev').disabled = true;
        } else {
          arrayData = movies.results;
          i == 2 ? (totalPage = movies.total_pages) : totalPage;
          movies.results.forEach((movie) => {
            generateHTML += `
            <div class="movie-card" data-card-id="${movie.id}" title="${movie.title}" tabindex="0">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg" alt="${
              movie.title
            }" class="card-img" loading="lazy">
              <div class="movie-rating-card">${movie.vote_average.toFixed(1)}</div>
            </div>
            `;
          });
        }
      })
      .catch((error) => {
        document.querySelector('.content').innerHTML = `
           <div class="wrapper-error">
            <h3 class="error-title">404</h3>
            <p class="error-subtitle">Страница не найдена, попробуйте позже</p>
          </div>
        `;
      });

    wrapperEl.innerHTML = generateHTML;
    pageNext = +page + 1;
    pageАfter = +pageNext + 1;
    arrPages = [page, pageNext, pageАfter];
    document.querySelectorAll('.js-btn-pag-change').forEach((btn, indexBtn) => {
      arrPages.forEach((el, indexPage) => {
        indexBtn == indexPage ? (btn.innerText = el) : undefined;
        btn.textContent > totalPage ? (btn.disabled = true) : (btn.disabled = false);
      });
    });
    getInfo();
  }
  getLibrary();
  paginationWrap.innerHTML = paginationHTML;
  let inpSelectNumPage = document.querySelector('.input-select-page');
  document.querySelector('.btn-select').addEventListener('click', () => {
    inpSelectNumPage.classList.add('active');
  });
  inpSelectNumPage.addEventListener('blur', () => {
    inpSelectNumPage.classList.remove('active');
    inpSelectNumPage.value == '' ? page : (page = inpSelectNumPage.value);
    page > totalPage ? (page = totalPage) : true;
    pageNext = page * 1 + 1;
    pageАfter = pageNext * 1 + 1;

    generateLibrary();
  });

  document.querySelector('.btn-next').addEventListener('click', () => {
    generateHTML = '';
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // });
    if (page !== totalPage) {
      page++;
      pageNext++;
      pageАfter++;
    } else {
      page = totalPage;
    }
    generateLibrary();
  });
  document.querySelector('.btn-prev').addEventListener('click', () => {
    generateHTML = '';
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // });
    if (page == 1) {
      page = 1;
    } else {
      page--;
      pageNext--;
      pageАfter--;
    }
    generateLibrary();
  });
  document.querySelectorAll('.btn-num-page').forEach((btn) => {
    btn.addEventListener('click', () => {
      page = +btn.textContent;
      pageNext = page + 1;
      pageАfter = pageNext + 1;
      generateLibrary();
    });
  });
}
generateLibrary();

function generateSlides() {
  async function getRated() {
    let url = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&page=${Math.floor(
        Math.random() * 50
      )}&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((rated) => {
        rated.results.forEach((movie) => {
          movie.genre_ids.forEach((id) => {
            genres += (genreId[id] + '  ').replaceAll('  ', ' | ').toUpperCase();
          });
          slideHTML += `
          <div class="swiper-slide" data-slide-id="${movie.id}">
            <div class="slide-wrapper">
              <img src="https://image.tmdb.org/t/p/original${
                movie.backdrop_path
              }.jpg" alt="background-fullscreen" class="fullscreen-img">
              <div class="container">
                <div class="slide-content">
                  <h2>${movie.title}</h2>
                  <p class="genres">${genres.slice(0, -2)}</p>
                  <p class="desc">${movie.overview}</p>
                  <div class="link-wrapper" data-js-link-id="${movie.id}"></div>
                </div>
              </div>
            </div>
          </div>
           `;
          getTrailer(movie);
          genres = '';
          slider.innerHTML = slideHTML;
        });
      })
      .catch((error) => {
        document.querySelector('.fullscreen').remove();
      });
  }
  getRated();
}
generateSlides();

function getInfo() {
  document.querySelectorAll('.movie-card').forEach((card, indexCard) => {
    arrayData.forEach((movie, index) => {
      card.addEventListener('click', () => {
        getTrailer(movie);
        if (indexCard === index) {
          genres = '';
          movie.genre_ids.forEach((id) => {
            genres += (genreId[id] + '  ').replaceAll('  ', ' | ').toUpperCase();
          });
          overlayInfo = `
              <div class="card-info">
                <button class="btn-close js-btn-close-card" title="Закрыть" tabindex="1">
                  <svg viewBox="0 -960 560 560">
                    <path
                      d="M 56,-400 0,-456 224,-680 0,-904 l 56,-56 224,224 224,-224 56,56 -224,224 224,224 -56,56 -224,-224 z"
                    />
                  </svg>
                </button>
                <img
                  src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                  alt="poster"
                  class="img-poster"
                />
                <div class="card-info-main">
                  <h2>${movie.title}</h2>
                  <p>${movie.release_date.slice(0, 4)}</p>
                  <p class="genres">${genres.slice(0, -2)}</p>
                  <div class="rating">
                   <div class="rating-num">${movie.vote_average.toFixed(1)}</div>
                   <div class="stars-wrapper">${generateStars(movie.vote_average.toFixed(1))} </div>
                  </div>
                  <span class="description">
                  ${movie.overview}
                  </span>
                  <div class="link-wrapper" data-js-link-id="${movie.id}">

                  </div>
                </div>
              </div>
            `;
          const wrapperCardInfoEl = document.querySelector('.wrapper-card-info');
          wrapperCardInfoEl.innerHTML = overlayInfo;
          wrapperCardInfoEl.classList.add('active');
          document.body.classList.add('active');
          document.querySelector('.js-btn-close-card').addEventListener('click', () => {
            document.body.classList.remove('active');
            wrapperCardInfoEl.classList.remove('active');
            document.querySelector('.card-info').remove();
          });
        }
      });
    });
  });
}

generateSlider();

btnClearSearch.addEventListener('click', () => {
  i = 1;
  page = 1;
  pageNext = page + 1;
  pageАfter = pageNext + 1;

  totalPage = 500;
  // window.scrollTo({
  //   top: 800,
  //   left: 0,
  //   behavior: 'smooth',
  // });
  searchEl.value = '';

  generateLibrary();
});
btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
  i = 2;
  page = 1;
  j = 1;
  wrapperSearch.classList.remove('active');
  generateHTML = '';
  generateLibrary();
});

document.querySelector('.btn-filter-apply').addEventListener('click', () => {
  j = 2;
  filterGenres = [];
  document.querySelectorAll('.filter-btn').forEach((filterEl) => {
    filterEl.checked ? filterGenres.push(filterEl.value) : undefined;
  });
  filterGenres = [...new Set(filterGenres)].join(',');
  generateLibrary();
});
btnClearFilter.addEventListener('click', () => {
  filterGenres = [];
  j = 1;
  document.querySelectorAll('.filter-btn').forEach((filterEl) => {
    filterEl.checked ? (filterEl.checked = false) : undefined;
  });
  generateLibrary();
});

function generateFilters(theme) {
  Object.entries(genreId).forEach((el) => {
    document.querySelector(
      '.filter-wrapper'
    ).innerHTML += `<input type="checkbox" name="${el[1]}" class="filter-btn filter" value="${el[0]}" style="background-image: url('images/icons/filters/${el[1]}-${theme}.svg')"/>`;
  });
}
generateFilters(theme);
