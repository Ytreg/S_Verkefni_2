/**
 * Niðurteljari!
 */
class Countdown {
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
    this.headings = document.querySelectorAll('.heading--category');

    $.getJSON("videos.json", json => {
      this.json = json;
      console.log(this.json);
      this.done();
    });
  }


  done() {
    for (var i = 0; i < this.headings.length; i++) {
      this.headings[i].innerText = this.json.categories[i].title;
    }
    const newVideos = document.querySelector('#new-videos');
    const tutoringVideos = document.querySelector('#tutoring-videos');
    const entertainmentVideos = document.querySelector('#entertainment-videos');

    const cNewVideosId = this.json.categories[0].videos;
    const cTutoringVideosId = this.json.categories[1].videos;
    const cEntertainmentVideosId = this.json.categories[2].videos;

    for (var i = 0; i < this.json.categories[0].videos.length; i++) {
      newVideos.appendChild(this.createVideoElement(this.json.videos[cNewVideosId[i] - 1]));
    }
    for (var i = 0; i < this.json.categories[1].videos.length; i++) {
      tutoringVideos.appendChild(this.createVideoElement(this.json.videos[cTutoringVideosId[i] - 1]));
    }
    for (var i = 0; i < this.json.categories[2].videos.length; i++) {
      entertainmentVideos.appendChild(this.createVideoElement(this.json.videos[cEntertainmentVideosId[i] - 1]));
    }
  }

  createVideoElement(video) {
    const container = document.createElement('figure');
    container.setAttribute('class', 'col');
    container.classList.add('col-4');

    const img = document.createElement('img');
    img.src = video.poster;

    const caption = document.createElement('figcaption');
    caption.appendChild(document.createTextNode(video.title));

    const p = document.createElement('p');
    const now = new Date();
    let time = new Date(new Date(video.created) - now);
    let time1 = now - new Date(video.created);
    console.log(now, new Date(video.created));
    console.log(time1);
    if (time.getFullYear() > 0) time = `Fyrir ${time.getFullYear()} árum síðan`;
    else if (time.getMonth() > 0) time = `Fyrir ${time.getMonth()} mánuðum síðan`;
    else if (time.get() > 0) time = `Fyrir ${time.getMonth()} mánuðum síðan`;

    else if (time.getDay() > 0) {
      if (time.getDay() >= 7) {
        time = `Fyrir ${Math.floor(time.getDay() / 7)} vikum síðan`;
      } else {
        time = `Fyrir ${time.getDay()} dögum síðan`;
      }
    }
    else if (time.getHours() > 0) time = `Fyrir ${time.getHours()} klukkutímum síðan`;
    else time = `Fyrir ${time.getMinutes()} mínútum síðan`;
    p.appendChild(document.createTextNode(time));

    container.appendChild(img);
    container.appendChild(caption);
    container.appendChild(p);

    return container;
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
  const countdown = new Countdown();
  countdown.load();

});
