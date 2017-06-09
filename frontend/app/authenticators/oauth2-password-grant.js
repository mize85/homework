// app/authenticators/oauth2.js
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Ember from 'ember';

const {isEmpty} = Ember;

export default
OAuth2PasswordGrant.extend({
  serverTokenEndpoint: '/api/v1/api-token-auth/',
  serverTokenRevocationEndpoint: '/api/v1/api-token-auth/',

  _validate(data) {
    return !isEmpty(data['token']);
  }

});
