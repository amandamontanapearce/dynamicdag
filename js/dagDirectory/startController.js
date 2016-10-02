(function(){
angular
  .module('app')
  .controller('startController', startController);
  startController.$inject = ['$scope', '$state'];
  function startController($scope, $state) {
    $scope.getDAG = function(input) {
      $state.go('home', {
        id: input
      })
    }
  }
})();
