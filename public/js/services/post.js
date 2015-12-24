/**
 * Created by Zeus on 20/12/2015.
 */

angular.module('app.services')
.service('Post', ['$resource', 'appConfig', function($resource, appConfig){
        return $resource(appConfig.config.baseUrl)
    }]);