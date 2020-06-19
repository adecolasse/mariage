var animationEndEvent = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

const galerie = {
  photos: [
    {
      name: 'Example',
      year: "12/09/2020",
      img: "image1.jpg",
      code: "skip"
    },
    {
      name: 'Photo #1',
      year: 2019,
      img: "image1.jpg",
      code: "cmVhbA==" // real
    },
    {
      name: 'Photo #2',
      year: 2019,
      img: "image1.jpg",
      code: "ZmFrZQ==" // fake
    },
  ],
  total: 0
};

var App = {
  yesButton: $('.tinderbut.yes .trigger'),
  noButton: $('.tinderbut.no .trigger'),
  blocked: false,

  evaluate: function (real) {
    var animate = real ? 'animateYes' : 'animateNo';
    var self = this;
    if (!this.blocked) {
      this.blocked = true;
      var current = $('.photo').eq(0);
      var id = current.attr("id");
      if (id !== 'result') {
        current.eq(0).addClass(animate).one(animationEndEvent, function () {
          $(this).remove();
          self.blocked = false;
        });

        var code = galerie.photos[parseInt(id.slice(5))].code;
        if (code !== "skip" && (real && atob(code) === "real" || !real && atob(code) === "fake")) {
          galerie.total++;
        }
        this.score();
      }
    }
  },

  score: function () {
    $('#result').html("<span><strong>Ton score:</strong> " + galerie.total + "</span>")

  }
};

App.yesButton.on('mousedown', function () {
  App.evaluate(true);
});

App.noButton.on('mousedown', function () {
  App.evaluate(false);
});

$(document).ready(function () {
  galerie.photos.forEach(function (photo, index) {
    new Image().src = photo.img;
    $('#galerie').append("<div id='index" + index + " ' class='photo'><img alt='" + photo.name + "' src='tinder/" + photo.img + "' /><span><strong>" + photo.name + "</strong>, " + photo.year + "</span></div>");
  });
  $('#galerie').append("<div id='result' class='photo'></div>");
});