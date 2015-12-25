angular.module('postService', ['ngResource', 'ngCookies']).
    factory('Post', ['$resource', '$http',
        function ($resource, $http) {
            //if (sessionStorage.getItem("token")) {
            //    $http.defaults.headers.common['X-Auth-Token'] = sessionStorage.getItem("token");
            //}api/userprofile/:_id
            return $resource('http://internectual:8000/posts/:id', {}, {
                query: {
                    method:'GET',
                    isArray:true
                },
                update: {
                    method:'PUT'
                },
                save: {
                    method: 'POST'
                },
                remove: {
                    method: 'DELETE'
                }
            });
        }
    ]);