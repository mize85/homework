import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
  randomImage: computed('model.id', function() {
    return `http://lorempixel.com/output/people-q-c-640-480-${this.get("model.id")}.jpg`;
  })
});
