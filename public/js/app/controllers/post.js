/**
 * Created by Zeus on 20/12/2015.
 */

angular.module('app.controllers')
.controller('PostController', ['$scope' , '$sce', '$routeParams', 'Post',
        function($scope, $sce, $routeParams, Post ){
        //scope.posts = [];
        //scope.ht  = scope.trustAsHtml("<h1> Isso é um H1 </h1>");

        //$scope.ht= $sce.trustAsHtml("<i>Hello</i> <b>World!</b>");
        Post.query({
        }, function (success) {
            console.log(success);
            console.log("aaa");
        }, function(error) {
            console.log(error);
            console.log("aaa");
        });


}]);