var animationEndEvent = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

var photo = {
  wrap: $('#galerie'),
  galerie: [
    {
      name: 'Image 1',
      year: 2019,
      img: "tinder/image1.jpg"
    },
    {
      name: 'Image 2',
      year: 2019,
      img: "tinder/image1.jpg"
    },
    {
      name: 'Image 3',
      year: 2019,
      img: "tinder/image1.jpg"
    },
    {
      name: 'Image 4',
      year: 2019,
      img: "tinder/image1.jpg"
    },
    {
      name: 'Image 5',
      year: 2019,
      img: "tinder/image1.jpg"
    }
  ],
  add: function(){
    var random =     this.galerie[Math.floor(Math.random() * this.galerie.length)];
    this.wrap.append("<div class='photo'><img alt='" + random.name + "' src='" + random.img + "' /><span><strong>" + random.name + "</strong>, " + random.year + "</span></div>");
  }
}

var App = {
  yesButton: $('.tinderbut.yes .trigger'),
  noButton: $('.tinderbut.no .trigger'),
  blocked: false,
  like: function(liked){
    var animate = liked ? 'animateYes' : 'animateNo';
    var self = this;
    photo.add();
    if (!this.blocked) {
      this.blocked = true;
      $('.photo').eq(0).addClass(animate).one(animationEndEvent, function() {
        $(this).remove();
        self.blocked = false;
      });
    }
  }
};

App.yesButton.on('mousedown', function() {
  App.like(true);
});

App.noButton.on('mousedown', function() {
  App.like(false);
});

$(document).ready(function() {
  photo.galerie.forEach(function(photo){
    new Image().src = photo.img;
  });

  photo.add();
  photo.add();
  photo.add();
  photo.add();
  
});