/**
 * Niðurteljari!
 */
class Video {
  /**
   * Finnur container fyrir niðurteljara og form.
   * Bindur submit eventhandler við form.
   */
  constructor() {
    /*
    this.keyName = 'countdown';
    this.container = document.querySelector('.countdown');
    this.form = document.querySelector('form');

    // til þess að submit hafi þennan klasa sem "this" verðum við
    // að nota bind hér (og í öðrum föllum sem við bindum!)
    this.form.addEventListener('submit', this.submit.bind(this));
    */
  }

  /**
   * Sækir gögn úr localStorage eftir this.keyName
   * Ef gögn eru til, hleður þeim inn með því að kalla í this.create()
   */
  load() {
    /*
    const saved = window.localStorage.getItem(this.keyName);

    if (saved) {
      const parsed = JSON.parse(saved);
      this.create(parsed.title, new Date(parsed.date));
    }
    */

    $.getJSON("videos.json", json => {
      this.json = json;
      console.log(this.json);
      this.done();
    });
  }

  createCategoryElements() {
    for (var i = 0; i < this.json.categories.length; i++) {
      $('main')
        .append($(`<section id="${this.json.categories[i].id}">`)
          .append($(`<div class="row">`)
            .append($('<div class="col col-12">')
              .append($('<h1 class="heading heading--category">')
                .text(this.json.categories[i].title))))
          .append(this.createPosterElements(i)))
        .append('<hr>');
    }
  }

  done() {
    this.createCategoryElements();
  }

  createPosterElements(id) {
    const container = $('<div class="row">');
    const c = this.json.categories[id].videos;

    for (var i = 0; i < this.json.categories[id].videos.length; i++) {
      container.append(this.createPosterElement(this.json.videos[c[i] - 1]));
    }
    return container;
  }

  createPosterElement(video) {
    const container = document.createElement('figure');
    container.setAttribute('class', 'col');
    container.classList.add('col-4');
    container.classList.add('col-sm-6');
    container.classList.add('col-sm-sm-12');

    const thumbnail = document.createElement('a');
    thumbnail.setAttribute('href', `/video.html?id=${video.id}`);

    const img = document.createElement('img');
    img.src = video.poster;

    const duration = document.createElement('span');

    // Sýna lengdina á myndbandi
    let d = video.duration;
    d = `${Math.floor(d/60)}:${d%60 < 10 ? "0"+d%60 : d%60}`;

    duration.appendChild(document.createTextNode(d));
    thumbnail.appendChild(img);
    thumbnail.appendChild(duration);

    const caption = document.createElement('figcaption');
    caption.appendChild(document.createTextNode(video.title));

    const p = document.createElement('p');
    const now = new Date();
    let time = new Date(video.created);
    time = now.getTime() - time.getTime();
    let time1 = new Date(video.created);

    const totalSecs = Math.ceil(time / 1000);

    const totalMin = Math.floor(totalSecs / 60);

    const totalHrs = Math.floor(totalSecs / (60 * 60));

    // Fá fylki sem inniheldur árs-, mánaðar- og dagsmun
    const dmy = this.diffDate(now, time1);

    if (dmy.years > 0) time = `Fyrir ${dmy.years} árum síðan`;
    else if (dmy.months > 0) time = `Fyrir ${dmy.months} mánuðum síðan`;
    else if (dmy.days > 0) {
      if (dmy.days >= 7) {
        time = `Fyrir ${Math.floor(dmy.days / 7)} vikum síðan`;
      } else {
        time = `Fyrir ${dmy.days} dögum síðan`;
      }
    }
    else if (totalHrs > 0) time = `Fyrir ${totalHrs} klukkutímum síðan`;
    else if (totalMin > 0) time = `Fyrir ${totalMin} mínútum síðan`;
    else time = `Fyrir ${totalSecs} sekúndum síðan`;

    p.appendChild(document.createTextNode(time));

    container.appendChild(thumbnail);
    container.appendChild(caption);
    container.appendChild(p);

    return container;
  }



  diffDate(date1, date2) {
    const arr = { years: 0, months: 0, days: 0 };

    if (date1 > date2) {
      const tmp = date1;
      date1 = date2;
      date2 = tmp;
    }

    const years1 = date1.getFullYear();
    const years2 = date2.getFullYear();

    const months1 = date1.getMonth();
    const months2 = date2.getMonth();

    const days1 = date1.getDate();
    const days2 = date2.getDate();

    arr.years = years2 - years1;
    arr.months = months2 - months1;
    arr.days = days2 - days1;

    if (arr.days < 0) {
      const tmpDate = new Date(date1.getFullYear(), date1.getMonth() + 1, 1, 0, 0, -1);

      const numDays = tmpDate.getDate();

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

}

document.addEventListener('DOMContentLoaded', () => {
  const video = new Video();
  video.load();

});
