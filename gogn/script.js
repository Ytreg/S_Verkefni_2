class Videos {

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

  load() {
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
    const container1 = $('<figure class="col col-4 col-sm-6 col-sm-sm-12">');
    console.log(container1);
    const container = document.createElement('figure');
    container.setAttribute('class', 'col');
    container.classList.add('col-4');
    container.classList.add('col-sm-6');
    container.classList.add('col-sm-sm-12');
    if (container === container1) console.log('true');

    const thumbnail1 = $(`<a href="/video.html?id=${video.id}">`);
    const thumbnail = document.createElement('a');
    thumbnail.setAttribute('href', `/video.html?id=${video.id}`);
    if (thumbnail === thumbnail1) console.log('true');

    const img1 = $(`<img src="${video.poster}">`);
    const img = document.createElement('img');
    img.src = video.poster;
    if (img === img1) console.log('true');

    const duration1 = $('<span>');
    const duration = document.createElement('span');

    // Sýna lengdina á myndbandi
    let d = video.duration;
    d = `${Math.floor(d/60)}:${d%60 < 10 ? "0"+d%60 : d%60}`;

    duration1.text(d);
    duration.appendChild(document.createTextNode(d));
    console.log(duration1);
    thumbnail.appendChild(img);
    thumbnail.appendChild(duration);

    const caption1 = $('<figcaption>').text(video.title);
    const caption = document.createElement('figcaption');
    caption.appendChild(document.createTextNode(video.title));
    console.log(caption1);

    const p1 = $('<p>');
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

    p1.text(time);
    console.log(p1);
    p.appendChild(document.createTextNode(time));

    container1.append(thumbnail1);
    container1.append(caption1);
    container1.append(p1);
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
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new Videos();
  videos.load();

});
