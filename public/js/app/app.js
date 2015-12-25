/**
 * Created by Zeus on 20/12/2015.
 */

var app = angular.module("app", ['ngRoute', 'app.controllers', 'app.services', 'postService']);

angular.module('app.controllers', []);
angular.module('app.services', ['ngResource']);

app.config(function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: 'js/app/views/index.html',
            controller: 'PostController'
        });
});

app.provider('appConfig', function(){
    var config = {
        baseUrl: 'http://internectual:8000'
    };

    return {
        $get: function(){
            return config;
        }
    }
});

