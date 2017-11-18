'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Niðurteljari!
 */
var Video = function () {
  /**
   * Finnur container fyrir niðurteljara og form.
   * Bindur submit eventhandler við form.
   */
  function Video() {
    _classCallCheck(this, Video);
  }
  /*
  this.keyName = 'countdown';
  this.container = document.querySelector('.countdown');
  this.form = document.querySelector('form');
    // til þess að submit hafi þennan klasa sem "this" verðum við
  // að nota bind hér (og í öðrum föllum sem við bindum!)
  this.form.addEventListener('submit', this.submit.bind(this));
  */


  /**
   * Sækir gögn úr localStorage eftir this.keyName
   * Ef gögn eru til, hleður þeim inn með því að kalla í this.create()
   */


  _createClass(Video, [{
    key: 'load',
    value: function load() {
      var _this = this;

      /*
      const saved = window.localStorage.getItem(this.keyName);
        if (saved) {
        const parsed = JSON.parse(saved);
        this.create(parsed.title, new Date(parsed.date));
      }
      */

      $.getJSON("videos.json", function (json) {
        _this.json = json;
        console.log(_this.json);
        _this.done();
      });
    }
  }, {
    key: 'createCategoryElements',
    value: function createCategoryElements() {
      for (var i = 0; i < this.json.categories.length; i++) {
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

      for (var i = 0; i < this.json.categories[id].videos.length; i++) {
        container.append(this.createPosterElement(this.json.videos[c[i] - 1]));
      }
      return container;
    }
  }, {
    key: 'createPosterElement',
    value: function createPosterElement(video) {
      var container = document.createElement('figure');
      container.setAttribute('class', 'col');
      container.classList.add('col-4');
      container.classList.add('col-sm-6');
      container.classList.add('col-sm-sm-12');

      var thumbnail = document.createElement('a');
      thumbnail.setAttribute('href', '/video.html?id=' + video.id);

      var img = document.createElement('img');
      img.src = video.poster;

      var duration = document.createElement('span');

      // Sýna lengdina á myndbandi
      var d = video.duration;
      d = Math.floor(d / 60) + ':' + (d % 60 < 10 ? "0" + d % 60 : d % 60);

      duration.appendChild(document.createTextNode(d));
      thumbnail.appendChild(img);
      thumbnail.appendChild(duration);

      var caption = document.createElement('figcaption');
      caption.appendChild(document.createTextNode(video.title));

      var p = document.createElement('p');
      var now = new Date();
      var time = new Date(video.created);
      time = now.getTime() - time.getTime();
      var time1 = new Date(video.created);

      var totalSecs = Math.ceil(time / 1000);

      var totalMin = Math.floor(totalSecs / 60);

      var totalHrs = Math.floor(totalSecs / (60 * 60));

      // Fá fylki sem inniheldur árs-, mánaðar- og dagsmun
      var dmy = this.diffDate(now, time1);

      if (dmy.years > 0) time = 'Fyrir ' + dmy.years + ' \xE1rum s\xED\xF0an';else if (dmy.months > 0) time = 'Fyrir ' + dmy.months + ' m\xE1nu\xF0um s\xED\xF0an';else if (dmy.days > 0) {
        if (dmy.days >= 7) {
          time = 'Fyrir ' + Math.floor(dmy.days / 7) + ' vikum s\xED\xF0an';
        } else {
          time = 'Fyrir ' + dmy.days + ' d\xF6gum s\xED\xF0an';
        }
      } else if (totalHrs > 0) time = 'Fyrir ' + totalHrs + ' klukkut\xEDmum s\xED\xF0an';else if (totalMin > 0) time = 'Fyrir ' + totalMin + ' m\xEDn\xFAtum s\xED\xF0an';else time = 'Fyrir ' + totalSecs + ' sek\xFAndum s\xED\xF0an';

      p.appendChild(document.createTextNode(time));

      container.appendChild(thumbnail);
      container.appendChild(caption);
      container.appendChild(p);

      return container;
    }
  }, {
    key: 'diffDate',
    value: function diffDate(date1, date2) {
      var arr = { years: 0, months: 0, days: 0 };

      if (date1 > date2) {
        var tmp = date1;
        date1 = date2;
        date2 = tmp;
      }

      var years1 = date1.getFullYear();
      var years2 = date2.getFullYear();

      var months1 = date1.getMonth();
      var months2 = date2.getMonth();

      var days1 = date1.getDate();
      var days2 = date2.getDate();

      arr.years = years2 - years1;
      arr.months = months2 - months1;
      arr.days = days2 - days1;

      if (arr.days < 0) {
        var tmpDate = new Date(date1.getFullYear(), date1.getMonth() + 1, 1, 0, 0, -1);

        var numDays = tmpDate.getDate();

        arr.months--;
        arr.days += numDays;
      }

      if (arr.months < 0) {
        arr.months += 12;
        arr.years--;
      }

      return arr;
    }
    /**
     * Tekur við title sem streng og date sem Date hlut
     * Vistar sem json gögn í localStorage undir this.keyName
     */
    /*
    save(title, date) {
     const data = { title, date };
     const json = JSON.stringify(data);
     window.localStorage.setItem(this.keyName, json);
    }
    */

    /**
     * Tekur við:
     *  - date sem streng á forminu "yyyy-mm-dd", t.d. "2017-11-06"
     *  - time sem streng á forminu "hh:mm", t.d. "09:00"
     * Skilar date hlut með gögnum úr date og time
     */
    /*
    parseDate(date, time) {
     return new Date(`${date} ${time}`);
    }
    */

  }]);

  return Video;
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = new Video();
  video.load();
});

//# sourceMappingURL=script-compiled.js.map