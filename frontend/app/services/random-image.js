import Ember from 'ember';


const topics = [
  'nature',
  'space',
  'water',
  'mountains',
  'sun',
  'architecture',
  'beach'
];

export default Ember.Service.extend({

  topics: null,
  delay: 10000,

  remove(){
    Ember.$("body").removeAttr( 'style' );
  },

  shuffle(){

    let topics = this.get('topics') || [
      'nature',
      'space',
      'water',
      'mountains',
      'wood',
      'street',
      'sun',
      'sunset',
      'architecture',
      'beach'
      ];



    let topic = topics[Math.floor(Math.random() * topics.length)];
    let url, preloadImg, randomPhoto;

    Ember.$.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
      {
        tags: topic,
        format: "json"
      },

      //The callback function
      function (data) {

        //Get random photo from the api's items array
        randomPhoto = data.items[Math.floor(Math.random() * data.items.length)];

        url = randomPhoto.media.m.replace("_m.jpg", "_c.jpg");

        // preload
        preloadImg = new Image;

        preloadImg.onload = function () {
          // image  has been loaded

          Ember.$("body").css({
            'backgroundImage': 'url(' + url + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-attachment': 'fixed'

          });
        };

        preloadImg.src = url;


      }
    );

    Ember.run.later(this, this.shuffle, this.get('delay'));
  }

});
