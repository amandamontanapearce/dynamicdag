angular
  .module('app', [ 'ui.router', 'ui.materialize', 'socket.io'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $socketProvider) {
    $socketProvider.setConnectionUrl('http://localhost:3000');

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('home', {
      url:'/',
      controller: "homeController",
      templateUrl: "templates/home.html"
    })
  })

  // angular.module('app')
  //   .controller("graphController", function graphController($scope) {
  //     $scope.treeData = [  {
  //         "name": "1",
  //         "completion": 0,
  //         "parent": "null",
  //         "value": 10,
  //         "status": "skyblue",
  //         "children": [
  //           {
  //             "name": "2",
  //             "completion": 0,
  //             "parent": "Top Level",
  //             "value": 15,
  //             "status": "skyblue",
  //             "children": [
  //               {
  //                 "name": "4",
  //                 "completion": 100,
  //                 "parent": "Level 2: A",
  //                 "value": 5,
  //                 "status": "darkseagreen",
  //               },
  //               {
  //                 "name": "5",
  //                 "completion": 85,
  //                 "parent": "Level 2: A",
  //                 "value": 8,
  //                 "status": "darkseagreen",
  //               }
  //             ]
  //           },
  //           {
  //             "name": "3",
  //             "completion": 15,
  //             "parent": "Top Level",
  //             "value": 10,
  //             "status": "crimson",
  //           }
  //         ]
  //       }];
  //   });
