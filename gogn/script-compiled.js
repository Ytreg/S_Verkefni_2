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

      var totalMin = Math.floor(totalSecs / 60);

      var totalHrs = Math.floor(totalSecs / (60 * 60));

      // Fá fylki sem inniheldur réttan árs-, mánaðar- og dagsmun
      var dmy = this.diffDate(now, created);
      var duration = void 0;

      if (dmy.years > 0) {
        duration = 'Fyrir ' + dmy.years + ' ' + (dmy.years === 1 ? 'ári' : 'árum') + ' s\xED\xF0an';
      } else if (dmy.months > 0) {
        duration = 'Fyrir ' + dmy.months + ' ' + (dmy.months === 1 ? 'mánuði' : 'mánuðum') + ' s\xED\xF0an';
      } else if (dmy.days > 0) {
        if (dmy.days >= 7) {
          var weeks = Math.floor(dmy.days / 7);
          duration = 'Fyrir ' + weeks + ' ' + (weeks === 1 ? 'viku' : 'vikum') + ' s\xED\xF0an';
        } else {
          duration = 'Fyrir ' + dmy.days + ' ' + (dmy.days === 1 ? 'degi' : 'dögum') + ' s\xED\xF0an';
        }
      } else if (totalHrs > 0) {
        duration = 'Fyrir ' + totalHrs + ' ' + (totalHrs === 1 ? 'klukkutíma' : 'klukkutímum') + ' s\xED\xF0an';
      } else if (totalMin > 0) {
        duration = 'Fyrir ' + totalMin + ' ' + (totalMin === 1 ? 'mínútu' : 'mínútum') + ' s\xED\xF0an';
      } else {
        duration = 'Fyrir ' + totalSecs + ' ' + (totalSecs === 1 ? 'sekúndu' : 'sekúndum') + ' s\xED\xF0an';
      }

      p.text(duration);

      container.append(thumbnail);
      container.append(caption);
      container.append(p);

      return container;
    }
  }, {
    key: 'diffDate',
    value: function diffDate(date1, date2) {
      var d1 = date1;
      var d2 = date2;
      var arr = { years: 0, months: 0, days: 0 };

      if (d1 > d2) {
        var tmp = d1;
        d1 = d2;
        d2 = tmp;
      }

      var years1 = d1.getFullYear();
      var years2 = d2.getFullYear();

      var months1 = d1.getMonth();
      var months2 = d2.getMonth();

      var days1 = d1.getDate();
      var days2 = d2.getDate();

      arr.years = years2 - years1;
      arr.months = months2 - months1;
      arr.days = days2 - days1;

      if (arr.days < 0) {
        var tmpDate = new Date(d1.getFullYear(), d1.getMonth() + 1, 1, 0, 0, -1);

        var numDays = tmpDate.getDate();

        arr.months -= 1;
        arr.days += numDays;
      }

      if (arr.months < 0) {
        arr.months += 12;
        arr.years -= 1;
      }

      return arr;
    }
  }]);

  return Videos;
}();

document.addEventListener('DOMContentLoaded', function () {
  var videos = new Videos();
  videos.load();
});

//# sourceMappingURL=script-compiled.js.map