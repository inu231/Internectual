/**
 * Created by Zeus on 20/12/2015.
 */

var app = angular.module("app", ['ngRoute', 'app.controllers', 'app.services']);

angular.module('app.controllers', []);

app.config(function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: 'js/views/index.html',
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

