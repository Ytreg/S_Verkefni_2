class Video {
  load() {
    $.getJSON("videos.json", json => {
      this.json = json;
      console.log(this.json);
      this.done();
    });
    this.id = location.search.substring(4);
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
    const video = $(`<video src="${this.video.video}" poster="${this.video.poster}">`);
    $('main')
      .append($(`<div class="row">`)
        .append($(`<div class="col col-10 offset-1 video--wrapper">`)
          .append(video)
          .append('<button class="buttons--button buttons--play buttons--video">')))
      .append($('<div class="row">')
        .append($(`<div class="buttons">`)
          .append('<button class="buttons--button buttons--back">')
          .append('<button class="buttons--button buttons--play">')
          .append('<button class="buttons--button buttons--mute">')
          .append('<button class="buttons--button buttons--fullscreen">')
          .append('<button class="buttons--button buttons--next">')))
      .append($(`<div class="row">`)
        .append($(`<div class="col col-12 error">`)
          .append($('<a href="/" class="error--back">')
            .text('Til baka'))));

    $('video').css("opacity", "0.7");

    $('.buttons--play').click(() => {
      const video = $('video').get(0);

      if (video.paused) {
        video.play();
        $('.buttons--play').removeClass('buttons--play').addClass('buttons--pause');
        $('.buttons--video').css('display', 'none');
        $('video').css('opacity', '1');
      } else {
        video.pause();
        $('.buttons--pause').removeClass('buttons--pause').addClass('buttons--play');
        $('.buttons--video').css('display', 'inline-block');
        $('video').css('opacity', '0.7');
      }
    });

    // láta pause takkan vera play takki þegar video-ið klárast
    $('video').bind('ended', () => {
      $('.buttons--pause').removeClass('buttons--pause').addClass('buttons--play');
    });

    $('.buttons--mute').click(() => {
      const video = $('video').get(0);
      if (video.muted) {
        video.muted = false;
        $('.buttons--unmute').removeClass('buttons--unmute').addClass('buttons--mute');
      } else {
        video.muted = true;
        $('.buttons--mute').removeClass('buttons--mute').addClass('buttons--unmute');
      }
    });

    $('.buttons--back').click(() => {
      $('video').get(0).currentTime -= 5;
    });

    $('.buttons--next').click(() => {
      $('video').get(0).currentTime += 5;
    });

    $('.buttons--fullscreen').click(() => {
      $('video').css("opacity", "1");
      $('video').get(0).webkitRequestFullscreen();
    });

    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', e => {
      if (!document.webkitIsFullScreen && $('video').get(0).paused) {
        $('video').css("opacity", "0.7");
      }
    })
  }

  failure() {
    $('main')
      .append($(`<div class="row">`)
        .append($(`<p class="col col-12 error">`)
          .text('Videó er ekki til')))
      .append($(`<div class="row">`)
        .append($(`<div class="col col-12 error">`)
          .append($('<a href="/" class="error--back">')
            .text('Til baka'))));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.load();

});
