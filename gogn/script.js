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
      newVideos.appendChild(this.createVideoElement(this.json.videos[cNewVideosId[i] - 1].poster));
    }
    for (var i = 0; i < this.json.categories[1].videos.length; i++) {
      tutoringVideos.appendChild(this.createVideoElement(this.json.videos[cTutoringVideosId[i] - 1].poster));
    }
    for (var i = 0; i < this.json.categories[2].videos.length; i++) {
      entertainmentVideos.appendChild(this.createVideoElement(this.json.videos[cEntertainmentVideosId[i] - 1].poster));
    }
  }

  createVideoElement(video) {
    const container = document.createElement('div');
    container.setAttribute('class', 'col');
    container.classList.add('col-4');

    const element = document.createElement('img');
    element.src = video;

    container.appendChild(element);

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
