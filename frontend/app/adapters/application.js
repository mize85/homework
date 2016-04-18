import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    coalesceFindRequests: true,
    namespace: 'api/v1',
    authorizer: 'authorizer:oauth2-bearer',

    //this is dependent on production/development environment
    //It is configured in config/environment.js
    //host: ClientENV.hostUrl
    //add IP from $DOCKER_HOST if --docker flag is set
    //host: 'http://192.168.59.103:1337'

    handleResponse: function (status, headers, payload) {
        if (this.isSuccess(status, headers, payload)) {
            return payload;
        } else if (this.isInvalid(status, headers, payload)) {
            return new DS.InvalidError(payload.errors);
        } else if (status === 403) {

            var session = this.container.lookup('controller:application').get('session');

            if (session.get('isAuthenticated')) {
                return session.invalidate();
            } else {
                return this.container.lookup('controller:application').transitionToRoute('login');
            }
        }
        return this._super(...arguments);
    }
});
