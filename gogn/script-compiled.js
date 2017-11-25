'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Videos = function () {
  function Videos() {
    _classCallCheck(this, Videos);
  }

  _createClass(Videos, [{
    key: 'load',
    value: function load() {
      var _this = this;

      $.getJSON('videos.json', function (json) {
        _this.json = json;
        _this.done();
      });
    }
  }, {
    key: 'createCategoryElements',
    value: function createCategoryElements() {
      for (var i = 0; i < this.json.categories.length; i += 1) {
        $('main').append($('<section id="' + this.json.categories[i].id + '">').append($('<div class="row">').append($('<div class="col col-12">').append($('<h1 class="heading heading--category">').text(this.json.categories[i].title)))).append(this.createPosterElements(i))).append('<hr>');
      }
    }
  }, {
    key: 'done',
    value: function done() {
      this.createCategoryElements();
    }
  }, {
    key: 'createPosterElements',
    value: function createPosterElements(id) {
      var container = $('<div class="row">');
      var c = this.json.categories[id].videos;

      for (var i = 0; i < this.json.categories[id].videos.length; i += 1) {
        container.append(this.createPosterElement(this.json.videos[c[i] - 1]));
      }
      return container;
    }
  }, {
    key: 'createPosterElement',
    value: function createPosterElement(video) {
      var container = $('<figure class="col col-4 col-sm-6 col-sm-sm-12">');

      var thumbnail = $('<a href="video.html?id=' + video.id + '">');

      var img = $('<img src="' + video.poster + '">');

      var span = $('<span>');

      // Sýna lengdina á myndbandi
      var d = video.duration;
      var sec = d % 60 < 10 ? '0' + d % 60 : d % 60;
      d = Math.floor(d / 60) + ':' + sec;

      span.text(d);
      thumbnail.append(img).append(span);

      var caption = $('<figcaption>').text(video.title);

      var p = $('<p>');

      var now = new Date();
      var created = new Date(video.created);
      var millisec = now.getTime() - created.getTime();

      var totalSecs = Math.ceil(millisec / 1000);

      var totalHrs = Math.floor(totalSecs / (60 * 60));

      var days = Math.floor(totalHrs / 24);

      var duration = void 0;

      if (days > 365) {
        duration = 'Fyrir ' + Math.floor(days / 365) + ' ' + (Math.floor(days / 365) === 1 ? 'ári' : 'árum') + ' s\xED\xF0an';
      } else if (days > 30) {
        duration = 'Fyrir ' + Math.floor(days / 30) + ' ' + (Math.floor(days / 30) === 1 ? 'mánuði' : 'mánuðum') + ' s\xED\xF0an';
      } else if (days > 7) {
        duration = 'Fyrir ' + Math.floor(days / 7) + ' ' + (Math.floor(days / 7) === 1 ? 'viku' : 'vikum') + ' s\xED\xF0an';
      } else if (totalHrs > 24) {
        duration = 'Fyrir ' + days + ' ' + (days === 1 ? 'degi' : 'dögum') + ' s\xED\xF0an';
      } else {
        duration = 'Fyrir ' + totalHrs + ' ' + (totalHrs === 1 ? 'klukkutíma' : 'klukkutímum') + ' s\xED\xF0an';
      }

      p.text(duration);

      container.append(thumbnail);
      container.append(caption);
      container.append(p);

      return container;
    }
  }]);

  return Videos;
}();

document.addEventListener('DOMContentLoaded', function () {
  var videos = new Videos();
  videos.load();
});

//# sourceMappingURL=script-compiled.js.map