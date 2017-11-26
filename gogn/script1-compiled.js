'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);

    this.id = window.location.search.substring(4);
  }

  _createClass(Video, [{
    key: 'load',
    value: function load() {
      var _this = this;

      $.getJSON('videos.json', function (json) {
        _this.json = json;
        _this.done();
      });
    }
  }, {
    key: 'done',
    value: function done() {
      this.video = this.json.videos[this.id - 1];
      if (this.video === undefined) {
        this.failure();
      } else {
        this.success();
      }
    }
  }, {
    key: 'success',
    value: function success() {
      $('.heading--video').text(this.video.title);
      var videoElement = $('<video src="' + this.video.video + '" poster="' + this.video.poster + '">');
      $('main').append($('<div class="video--wrapper">').append(videoElement).append($('<div class="video--overlay">').append('<button class="buttons--button buttons--play buttons--video">'))).append($('<div class="row">').append($('<div class="buttons">').append('<button class="buttons--button buttons--back">').append('<button class="buttons--button buttons--play">').append('<button class="buttons--button buttons--mute">').append('<button class="buttons--button buttons--fullscreen">').append('<button class="buttons--button buttons--next">'))).append($('<div class="row">').append($('<div class="col col-12 error">').append($('<a href="index.html" class="error--back">').text('Til baka'))));

      $('.buttons--play').click(function () {
        var video = videoElement.get(0);
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
      $('video').bind('ended', function () {
        $('.buttons--pause').removeClass('buttons--pause').addClass('buttons--play');
        $('.video--overlay').css('display', 'block');
      });

      $('.buttons--mute').click(function () {
        var video = videoElement.get(0);
        if (video.muted) {
          video.muted = false;
          $('.buttons--unmute').removeClass('buttons--unmute').addClass('buttons--mute');
        } else {
          video.muted = true;
          $('.buttons--mute').removeClass('buttons--mute').addClass('buttons--unmute');
        }
      });

      $('.buttons--back').click(function () {
        if (!$('video').get(0).paused) {
          $('video').get(0).currentTime -= 3;
        }
      });

      $('.buttons--next').click(function () {
        if (!$('video').get(0).paused) {
          $('video').get(0).currentTime += 3;
        }
      });

      $('.buttons--fullscreen').click(function () {
        return $('video').get(0).webkitRequestFullscreen();
      });
    }
  }, {
    key: 'failure',
    value: function failure() {
      $('main').append($('<div class="row">').append($('<p class="col col-12 error">').text('Videó er ekki til'))).append($('<div class="row">').append($('<div class="col col-12 error">').append($('<a href="index.html" class="error--back">').text('Til baka'))));
    }
  }]);

  return Video;
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = new Video();
  video.load();
});

//# sourceMappingURL=script1-compiled.js.map