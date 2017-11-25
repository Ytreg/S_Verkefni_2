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

    const thumbnail = $(`<a href="video.html?id=${video.id}">`);

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

    const totalHrs = Math.floor(totalSecs / (60 * 60));

    const days = Math.floor(totalHrs / 24);

    let duration;

    if (days > 365) {
      duration = `Fyrir ${Math.floor(days / 365)} ${Math.floor(days / 365) === 1 ? 'ári' : 'árum'} síðan`;
    } else if (days > 30) {
      duration = `Fyrir ${Math.floor(days / 30)} ${Math.floor(days / 30) === 1 ? 'mánuði' : 'mánuðum'} síðan`;
    } else if (days > 7) {
      duration = `Fyrir ${Math.floor(days / 7)} ${Math.floor(days / 7) === 1 ? 'viku' : 'vikum'} síðan`;
    } else if (totalHrs > 24) {
      duration = `Fyrir ${days} ${days === 1 ? 'degi' : 'dögum'} síðan`;
    } else {
      duration = `Fyrir ${totalHrs} ${totalHrs === 1 ? 'klukkutíma' : 'klukkutímum'} síðan`;
    }

    p.text(duration);

    container.append(thumbnail);
    container.append(caption);
    container.append(p);

    return container;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new Videos();
  videos.load();
});
