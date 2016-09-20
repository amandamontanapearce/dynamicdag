(function() {
angular.
  module('app')
  .factory('factory', factory);
  factory.$inject = ['$http'];
  function factory($http) {
    return {
      getTreeStructure: function(id) {
        return $http.get('http://localhost:8080/dag-server/dag/dagnode/' + id);
      }
    }
  }
})();


// app.factory('$socket', function ($rootScope) {
//   var socket = io.connect();
//   return {
//     on: function (eventName, callback) {
//       socket.on(eventName, function () {
//         var args = arguments;
//         $rootScope.$apply(function () {
//           callback.apply(socket, args);
//         });
//       });
//     },
//     emit: function (eventName, data, callback) {
//       socket.emit(eventName, data, function () {
//         var args = arguments;
//         $rootScope.$apply(function () {
//           if (callback) {
//             callback.apply(socket, args);
//           }
//         });
//       })
//     }
//   };
// });
