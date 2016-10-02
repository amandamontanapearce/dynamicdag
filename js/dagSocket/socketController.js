//var sock = new SockJS('http://localhost:3000/chat');
// var sock = new SockJS('http://localhost:8080/dag-server/dag/dagstatus');
// var url = "ws://localhost:61614/stomp";
// var client = Stomp.client(url);
// angular
//   .module('app')
//   .controller('socketController', function socketController($scope) {
//     $scope.messages = [];
//     $scope.sendMessage = function() {
//             //sock.send($scope.messageText);
//             //$scope.messageText = "";
//         };
//
//         sock.onmessage = function(e) {
//             $scope.messages.push(e.data);
//             console.log(e.data);
//             $scope.$apply();
//         };
    // sock.onopen = function() {
    //     console.log('open');
    // };
    // sock.onmessage = function(e) {
    //     console.log('message', e.data);
    // };
    // sock.onclose = function() {
    //     console.log('close');
    // };
    //
    // sock.send('test');
    // sock.close();
// $socket.on('echo', function(data) {
//     $scope.serverResponse = data;
// });
// $scope.emitBasic = function emitBasic() {
//     $socket.emit('echo', $scope.dataToSend);
//     $scope.dataToSend = 'hi';
// };
//
// $scope.emitACK = function emitACK() {
//     $socket.emit('echo-ack', $scope.dataToSend, function(data) {
//         $scope.serverResponseACK = data;
//     });
//     $scope.dataToSend = 'hello';
// };
//})
