class Video {
  constructor() {
    this.id = window.location.search.substring(4);
  }

  load() {
    $.getJSON('videos.json', (json) => {
      this.json = json;
      this.done();
    });
  }

  done() {
    this.video = this.json.videos[this.id - 1];
    if (this.video === undefined) {
      this.failure();
    } else {
      this.success();
    }
  }

  success() {
    $('.heading--video').text(this.video.title);
    const videoElement = $(`<video src="${this.video.video}" poster="${this.video.poster}">`);
    $('main')
      .append($('<div class="video--wrapper">')
        .append(videoElement)
        .append($('<div class="video--overlay">')
          .append('<button class="buttons--button buttons--play buttons--video">')))
      .append($('<div class="row">')
        .append($('<div class="buttons">')
          .append('<button class="buttons--button buttons--back">')
          .append('<button class="buttons--button buttons--play">')
          .append('<button class="buttons--button buttons--mute">')
          .append('<button class="buttons--button buttons--fullscreen">')
          .append('<button class="buttons--button buttons--next">')))
      .append($('<div class="row">')
        .append($('<div class="col col-12 error">')
          .append($('<a href="index.html" class="error--back">')
            .text('Til baka'))));

    $('.buttons--play').click(() => {
      const video = videoElement.get(0);
      if (video.paused) {
        video.play();
        $('.buttons--play').removeClass('buttons--play').addClass('buttons--pause');
        $('.video--overlay').css('display', 'none');
      } else {
        video.pause();
        $('.buttons--pause').removeClass('buttons--pause').addClass('buttons--play');
        $('.video--overlay').css('display', 'block');
      }
    });

    // láta pause takkan vera play takki þegar video-ið klárast og birta overlay-ið
    $('video').bind('ended', () => {
      $('.buttons--pause').removeClass('buttons--pause').addClass('buttons--play');
      $('.video--overlay').css('display', 'block');
    });

    $('.buttons--mute').click(() => {
      const video = videoElement.get(0);
      if (video.muted) {
        video.muted = false;
        $('.buttons--unmute').removeClass('buttons--unmute').addClass('buttons--mute');
      } else {
        video.muted = true;
        $('.buttons--mute').removeClass('buttons--mute').addClass('buttons--unmute');
      }
    });

    $('.buttons--back').click(() => {
      if (!$('video').get(0).paused) {
        $('video').get(0).currentTime -= 3;
      }
    });

    $('.buttons--next').click(() => {
      if (!$('video').get(0).paused) {
        $('video').get(0).currentTime += 3;
      }
    });

    $('.buttons--fullscreen').click(() => $('video').get(0).webkitRequestFullscreen());
  }

  failure() {
    $('main')
      .append($('<div class="row">')
        .append($('<p class="col col-12 error">')
          .text('Videó er ekki til')))
      .append($('<div class="row">')
        .append($('<div class="col col-12 error">')
          .append($('<a href="index.html" class="error--back">')
            .text('Til baka'))));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.load();
});
