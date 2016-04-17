/**
 * Created by larsbunting on 05.12.15.
 */
import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';
import Ember from 'ember';

export default
OAuth2Bearer.extend({
    identificationAttributeName: 'Token',
    authorize(data, block) {
        const accessToken = data['token'];
        if (!Ember.isEmpty(accessToken)) {
            block('Authorization', `Token ${accessToken}`);
        }
    }

});
