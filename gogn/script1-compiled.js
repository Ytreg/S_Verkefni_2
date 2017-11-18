'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);
  }

  _createClass(Video, [{
    key: 'load',
    value: function load() {
      var _this = this;

      $.getJSON("videos.json", function (json) {
        _this.json = json;
        console.log(_this.json);
        _this.done();
      });
      this.id = location.search.substring(4);
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
      var video = $('<video src="' + this.video.video + '" poster="' + this.video.poster + '">');
      $('main').append($('<div class="row">').append($('<div class="col col-10 offset-1 video--wrapper">').append(video).append('<button class="buttons--button buttons--play buttons--video">'))).append($('<div class="row">').append($('<div class="buttons">').append('<button class="buttons--button buttons--back">').append('<button class="buttons--button buttons--play">').append('<button class="buttons--button buttons--mute">').append('<button class="buttons--button buttons--fullscreen">').append('<button class="buttons--button buttons--next">'))).append($('<div class="row">').append($('<div class="col col-12 error">').append($('<a href="/" class="error--back">').text('Til baka'))));

      $('video').css("opacity", "0.7");

      $('.buttons--play').click(function () {
        var video = $('video').get(0);

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
      $('video').bind('ended', function () {
        $('.buttons--pause').removeClass('buttons--pause').addClass('buttons--play');
      });

      $('.buttons--mute').click(function () {
        var video = $('video').get(0);
        if (video.muted) {
          video.muted = false;
          $('.buttons--unmute').removeClass('buttons--unmute').addClass('buttons--mute');
        } else {
          video.muted = true;
          $('.buttons--mute').removeClass('buttons--mute').addClass('buttons--unmute');
        }
      });

      $('.buttons--back').click(function () {
        $('video').get(0).currentTime -= 5;
      });

      $('.buttons--next').click(function () {
        $('video').get(0).currentTime += 5;
      });

      $('.buttons--fullscreen').click(function () {
        $('video').css("opacity", "1");
        $('video').get(0).webkitRequestFullscreen();
      });

      $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
        if (!document.webkitIsFullScreen && $('video').get(0).paused) {
          $('video').css("opacity", "0.7");
        }
      });
    }
  }, {
    key: 'failure',
    value: function failure() {
      $('main').append($('<div class="row">').append($('<p class="col col-12 error">').text('Videó er ekki til'))).append($('<div class="row">').append($('<div class="col col-12 error">').append($('<a href="/" class="error--back">').text('Til baka'))));
    }
  }]);

  return Video;
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = new Video();
  video.load();
});

//# sourceMappingURL=script1-compiled.js.map