export function generateStars(vote) {
  let stars = '';
  let fullQuantity = Math.trunc(vote);
  let fractional = String(vote).split('.')[1];
  stars += full.repeat(fullQuantity);
  if ((fractional >= 3) & (fractional < 5)) {
    stars += third;
  } else if (fractional >= 6) {
    stars += thirdQuaters;
  } else if (fractional == 5) {
    stars += half;
  }
  let starsQuantity = stars.split('>').filter((el) => el !== '');
  starsQuantity.length !== 10 ? (stars += empty.repeat(10 - starsQuantity.length)) : stars;
  return stars;
}
const full = '<img class="stars" src="images/icons/rate/star-rate-full.svg"/>';
const half = '<img class="stars" src="images/icons/rate/star-rate-half.svg"/>';
const third = '<img class="stars" src="images/icons/rate/star-rate-third.svg"/>';
const thirdQuaters = '<img class="stars" src="images/icons/rate/star-rate-three-quarters.svg"/>';
const empty = '<img class="stars" src="images/icons/rate/star-rate-empty.svg"/>';
