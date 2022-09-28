import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function (currentTime) {
    const lastPlace = currentTime.seconds;
    console.log(lastPlace);
    localStorage.setItem('videoplayer-current-time', lastPlace);
  }, 1000)
);

const keyLocalStorage = localStorage.getItem('videoplayer-current-time');
player
  .setCurrentTime(keyLocalStorage)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

// throttle(updatePosition, 1000);
