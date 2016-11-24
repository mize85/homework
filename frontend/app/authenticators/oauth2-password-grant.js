// app/authenticators/oauth2.js
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Ember from 'ember';

const {isEmpty, RSVP} = Ember;

export default
OAuth2PasswordGrant.extend({
  serverTokenEndpoint: '/api/v1/api-token-auth/',
  serverTokenRevocationEndpoint: '/api/v1/api-token-auth/',

  restore: function restore(data) {
    const _this = this;

    return new RSVP.Promise(function (resolve, reject) {
      const now = new Date().getTime();
      const refreshAccessTokens = _this.get('refreshAccessTokens');
      if (!isEmpty(data['expires_at']) && data['expires_at'] < now) {
        if (refreshAccessTokens) {
          _this._refreshAccessToken(data['expires_in'], data['refresh_token']).then(resolve, reject);
        } else {
          reject();
        }
      } else {
        if (isEmpty(data['token'])) {
          reject();
        } else {
          _this._scheduleAccessTokenRefresh(data['expires_in'], data['expires_at'], data['refresh_token']);
          resolve(data);
        }
      }
    });
  }
});
