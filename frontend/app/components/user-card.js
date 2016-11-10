import Ember from 'ember';

export default Ember.Component.extend({
  randomImage: Ember.computed('model.id', function() {
    return `http://lorempixel.com/output/people-q-g-640-480-${this.get("model.id")}.jpg`;
  })
});
