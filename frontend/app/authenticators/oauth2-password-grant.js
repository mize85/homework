// app/authenticators/oauth2.js
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Ember from 'ember';

export default
OAuth2PasswordGrant.extend({
    serverTokenEndpoint: '/api/v1/api-token-auth/',
    serverTokenRevocationEndpoint: '/api/v1/api-token-auth/',

    restore: function restore(data) {
        var _this = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            var now = new Date().getTime();
            var refreshAccessTokens = _this.get('refreshAccessTokens');
            if (!Ember.isEmpty(data['expires_at']) && data['expires_at'] < now) {
                if (refreshAccessTokens) {
                    _this._refreshAccessToken(data['expires_in'], data['refresh_token']).then(resolve, reject);
                } else {
                    reject();
                }
            } else {
                if (Ember.isEmpty(data['token'])) {
                    reject();
                } else {
                    _this._scheduleAccessTokenRefresh(data['expires_in'], data['expires_at'], data['refresh_token']);
                    resolve(data);
                }
            }
        });
    }

});