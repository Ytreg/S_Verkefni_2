class Videos {
  load() {
    $.getJSON('videos.json', (json) => {
      this.json = json;
      this.done();
    });
  }

  createCategoryElements() {
    for (let i = 0; i < this.json.categories.length; i += 1) {
      $('main')
        .append($(`<section id="${this.json.categories[i].id}">`)
          .append($('<div class="row">')
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

    for (let i = 0; i < this.json.categories[id].videos.length; i += 1) {
      container.append(this.createPosterElement(this.json.videos[c[i] - 1]));
    }
    return container;
  }

  createPosterElement(video) {
    const container = $('<figure class="col col-4 col-sm-6 col-sm-sm-12">');

    const thumbnail = $(`<a href="/video.html?id=${video.id}">`);

    const img = $(`<img src="${video.poster}">`);

    const span = $('<span>');

    // Sýna lengdina á myndbandi
    let d = video.duration;
    const sec = d % 60 < 10 ? `0${d % 60}` : d % 60;
    d = `${Math.floor(d / 60)}:${sec}`;

    span.text(d);
    thumbnail.append(img).append(span);

    const caption = $('<figcaption>').text(video.title);

    const p = $('<p>');

    const now = new Date();
    const created = new Date(video.created);
    const millisec = now.getTime() - created.getTime();

    const totalSecs = Math.ceil(millisec / 1000);

    const totalMin = Math.floor(totalSecs / 60);

    const totalHrs = Math.floor(totalSecs / (60 * 60));

    // Fá fylki sem inniheldur réttan árs-, mánaðar- og dagsmun
    const dmy = this.diffDate(now, created);
    let duration;

    if (dmy.years > 0) {
      duration = `Fyrir ${dmy.years} ${dmy.years === 1 ? 'ári' : 'árum'} síðan`;
    } else if (dmy.months > 0) {
      duration = `Fyrir ${dmy.months} ${dmy.months === 1 ? 'mánuði' : 'mánuðum'} síðan`;
    } else if (dmy.days > 0) {
      if (dmy.days >= 7) {
        const weeks = Math.floor(dmy.days / 7);
        duration = `Fyrir ${weeks} ${weeks === 1 ? 'viku' : 'vikum'} síðan`;
      } else {
        duration = `Fyrir ${dmy.days} ${dmy.days === 1 ? 'degi' : 'dögum'} síðan`;
      }
    } else if (totalHrs > 0) {
      duration = `Fyrir ${totalHrs} ${totalHrs === 1 ? 'klukkutíma' : 'klukkutímum'} síðan`;
    } else if (totalMin > 0) {
      duration = `Fyrir ${totalMin} ${totalMin === 1 ? 'mínútu' : 'mínútum'} síðan`;
    } else {
      duration = `Fyrir ${totalSecs} ${totalSecs === 1 ? 'sekúndu' : 'sekúndum'} síðan`;
    }

    p.text(duration);

    container.append(thumbnail);
    container.append(caption);
    container.append(p);

    return container;
  }

  diffDate(date1, date2) {
    let d1 = date1;
    let d2 = date2;
    const arr = { years: 0, months: 0, days: 0 };

    if (d1 > d2) {
      const tmp = d1;
      d1 = d2;
      d2 = tmp;
    }

    const years1 = d1.getFullYear();
    const years2 = d2.getFullYear();

    const months1 = d1.getMonth();
    const months2 = d2.getMonth();

    const days1 = d1.getDate();
    const days2 = d2.getDate();

    arr.years = years2 - years1;
    arr.months = months2 - months1;
    arr.days = days2 - days1;

    if (arr.days < 0) {
      const tmpDate = new Date(d1.getFullYear(), d1.getMonth() + 1, 1, 0, 0, -1);

      const numDays = tmpDate.getDate();

      arr.months -= 1;
      arr.days += numDays;
    }

    if (arr.months < 0) {
      arr.months += 12;
      arr.years -= 1;
    }

    return arr;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new Videos();
  videos.load();
});
