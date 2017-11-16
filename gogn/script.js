/**
 * Niðurteljari!
 */
class Countdown {
  /**
   * Finnur container fyrir niðurteljara og form.
   * Bindur submit eventhandler við form.
   */
  constructor() {
    this.keyName = 'countdown';
    this.container = document.querySelector('.countdown');
    this.form = document.querySelector('form');

    // til þess að submit hafi þennan klasa sem "this" verðum við
    // að nota bind hér (og í öðrum föllum sem við bindum!)
    this.form.addEventListener('submit', this.submit.bind(this));
  }

  /**
   * Sækir gögn úr localStorage eftir this.keyName
   * Ef gögn eru til, hleður þeim inn með því að kalla í this.create()
   */
  load() {
    const saved = window.localStorage.getItem(this.keyName);

    if (saved) {
      const parsed = JSON.parse(saved);
      this.create(parsed.title, new Date(parsed.date));
    }
  }

  /**
   * Tekur við title sem streng og date sem Date hlut
   * Vistar sem json gögn í localStorage undir this.keyName
   */
  save(title, date) {
    const data = { title, date };
    const json = JSON.stringify(data);
    window.localStorage.setItem(this.keyName, json);
  }

  /**
   * Handler fyrir submit á formi.
   * Sækir gögn úr formi og kallar í this.parseDate()
   * Vistar gögn með this.save() og sýnir niðurteljara með this.create()
   */
  submit(e) {
    e.preventDefault();

    const title = this.form.querySelector('input[type=text]');
    const date = this.form.querySelector('input[type=date]');
    const time = this.form.querySelector('input[type=time]');

    const parsedDate = this.parseDate(date.value, time.value);
    this.save(title.value, parsedDate);
    this.create(title.value, parsedDate);
  }

  /**
   * Tekur við:
   *  - date sem streng á forminu "yyyy-mm-dd", t.d. "2017-11-06"
   *  - time sem streng á forminu "hh:mm", t.d. "09:00"
   * Skilar date hlut með gögnum úr date og time
   */
  parseDate(date, time) {
    return new Date(`${date} ${time}`);
  }

  /**
   * Býr til element fyrir niðurteljara og bætir við this.container
   * Setur this.date sem dagsetningu sem talið er niður að
   * Setur this.element sem element sem geymir niðurteljara
   * Bætir við "eyða" takka sem sér um að eyða niðurteljara með this.delete
   * Byrjar niðurteljara með this.startCounter() og
   * felur form með this.hideForm()
   */
  create(title, date) {
    const titleElement = document.createElement('h2');
    titleElement.setAttribute('class', 'countdown__heading');
    titleElement.appendChild(document.createTextNode(title));

    this.container.appendChild(titleElement);

    this.element = document.createElement('div');

    const countdownContainer = document.createElement('div');
    countdownContainer.setAttribute('class', 'countdown__container');

    this.element.appendChild(countdownContainer);

    this.container.appendChild(this.element);

    this.date = new Date(date);
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'button');
    deleteButton.appendChild(document.createTextNode('Eyða'));

    this.container.appendChild(deleteButton);

    deleteButton.addEventListener('click', this.delete.bind(this));

    this.startCounter();

    this.hideForm();
  }

  /**
   * Felur form með CSS
   */
  hideForm() {
    this.form.style.display = 'none';
  }

  /**
   * Sýnir form með CSS
   */
  showForm() {
    this.form.style.display = 'block';
  }

  /**
   * Byrjar niðurteljara með this.count() og keyrir á 1000ms fresti
   * með window.setInterval og setur id á teljara í this.interval
   */
  startCounter() {
    this.count();
    if (this.date - new Date() > 0) {
      this.interval = setInterval(() => { this.count(); }, 1000);
    }
  }

  /**
   * Stöðvar teljara með window.clearInterval á this.interval
   */
  stopCounter() {
    window.clearInterval(this.interval);
  }

  /**
   * Býr til element sem heldur utan um teljara, á forminu:
   * <div class="countdown__box">
   *   <span class="countdown__num">num</span>
   *   <span class="countdown__title">title</span>
   * </div>
   * og skilar element
   */
  createElement(num, title) {
    const div = document.createElement('div');
    div.setAttribute('class', 'countdown__box');

    const numSpan = document.createElement('span');
    numSpan.setAttribute('class', 'countdown__num');
    numSpan.appendChild(document.createTextNode(num));

    const titleSpan = document.createElement('span');
    titleSpan.setAttribute('class', 'countdown__title');
    titleSpan.appendChild(document.createTextNode(title));

    div.appendChild(numSpan);
    div.appendChild(titleSpan);

    return div;
  }

  /**
   * Eyðir niðurteljara með því að fjarlægja úr localStorage og
   * fjarlægja allt úr this.container.
   * Kallar líka í this.stopCounter() og this.showForm()
   */
  delete() {
    window.localStorage.removeItem(this.keyName);
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.stopCounter();
    this.showForm();
  }

  /**
   * Tekur við remaining sem eru millisekúndur í dagsetningu sem talið er
   * niður í.
   * Útbýr og skilar element sem inniheldur element fyrir daga, klukkustundir,
   * mínútur og sekúndur þar til remaining gerist. Hver „partur“ er búinn til
   * með kalli í this.createElement
   */
  countdown(remaining) {
    const totalSecs = Math.ceil(remaining / 1000);

    const totalMin = Math.floor(totalSecs / 60);

    const totalHrs = Math.floor(totalSecs / (60 * 60));

    const days = Math.floor(totalSecs / (60 * 60 * 24));

    const div = document.createElement('div');
    div.setAttribute('class', 'countdown__container');

    div.appendChild(this.createElement(days, 'Dagar'));
    div.appendChild(this.createElement(totalHrs % 24, 'Klst'));
    div.appendChild(this.createElement(totalMin % 60, 'Mín'));
    div.appendChild(this.createElement(totalSecs % 60, 'Sek'));

    return div;
  }

  /**
   * Telur niður.
   * Fjarlægir allt úr this.element (ef eitthvað er þar) og athugar síðan hvort
   * this.date (dagsetning sem talið er niður að) sé liðin og ef svo er birtir
   * textann "Komið!" og stoppa teljara með this.stopCounter()
   * Ef ekki liðið uppfærir teljara með því að bæta element úr this.countdown()
   * við this.element
   */
  count() {
    if (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    if (this.date - new Date() <= 0) {
      const done = document.createElement('h3');
      done.setAttribute('class', 'countdown__heading');
      done.appendChild(document.createTextNode('Komið!'));
      this.element.appendChild(done);
      this.stopCounter();
    } else {
      const newCountdown = this.countdown(this.date - new Date());
      this.element.appendChild(newCountdown);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const countdown = new Countdown();
  countdown.load();
});
