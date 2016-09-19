angular
  .module('app')
  .controller('socketController', function socketController($scope, $socket) {
$socket.on('echo', function(data) {
    $scope.serverResponse = data;
});
$scope.emitBasic = function emitBasic() {
    $socket.emit('echo', $scope.dataToSend);
    $scope.dataToSend = 'hi';
};

$scope.emitACK = function emitACK() {
    $socket.emit('echo-ack', $scope.dataToSend, function(data) {
        $scope.serverResponseACK = data;
    });
    $scope.dataToSend = 'hello';
};
})
