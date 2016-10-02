var sock = new SockJS('https://stark-mountain-64311.herokuapp.com/chat');
//var sock = new SockJS('http://localhost:3000/chat');
angular
    .module('app')
    .controller('homeController', homeController);
homeController.$inject = ['$scope', '$state', '$stateParams', 'factory'];

function homeController($scope, $state, $stateParams, factory) {
    $scope.show = false;
    var treeId = $stateParams.id;
    console.log(treeId);
    $scope.messages = [];
    $scope.messageStatus = [];
    var margin = {
            top: 100,
            right: 120,
            bottom: 20,
            left: 500
        },
        width = 550 - margin.right - margin.left,
        height = 600 - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    var svg = d3.select(".forSVG").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")rotate(90)");

    var key = d3.select("svg").append("text")
        .text("* percent completed")
        .attr("x", "26rem")
        .attr("y", "2rem")

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) {
                d.y = d.depth * 200;
            });

            // Declare the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

            // Enter the nodes.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            //original
            nodeEnter.append("circle")
                .attr("r", 40)
                .style("stroke", function(d) {
                    return d.colorStatus;
                });

            nodeEnter
                .append("text")
                //  .attr("x", function(d) {
                // 	  return d.children})
                .style("font-size", "30px")
                .attr("dx", "-.65em")
                .attr("dy", ".5em")
                .attr("transform", "rotate(-90)")
                .text(function(d) {
                    complete = d.percentComplete + "%";
                    return complete;
                })
                .style("fill-opacity", 1)
                //.html("<a id='nodeLinkModal' class='waves-effect waves-light btn modal-trigger' href='node'>" + complete + "</a>")
                .style("stroke", function(d) {
                    return d.colorStatus;
                });

            nodeEnter
                .append("text")
                .style("font-size", "35px")
                .attr("dx", "-.65em")
                .attr("dy", "-.5em")
                .attr("transform", "rotate(-90)")
                .text(function(d) {
                    complete = "Node " + d.NodeId;
                    return complete;
                })
                .style("fill-opacity", 1)
                //.html("<a id='nodeLinkModal' class='waves-effect waves-light btn modal-trigger' href='node'>" + complete + "</a>")
                .style("stroke", function(d) {
                    return d.colorStatus;
                });

            // Declare the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            // Enter the links.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .style("stroke", function(d) {
                    return d.target.colorStatus;
                })
                .attr("d", diagonal);
        }

    sock.onmessage = function(e) {
        obj = JSON.parse(e.data);
        $scope.messages.pop();
        $scope.messages.unshift(obj);
        $scope.$apply();
        d3.select("nodeEnter").remove()
        $scope.messageStatus.push("Node " + obj.NodeId + ": " + obj.status);
        $scope.messageStatus.push("Node " + obj.children[0].NodeId + ": " + obj.children[0].status);
        $scope.messageStatus.push("Node " + obj.children[1].NodeId + ": " + obj.children[1].status);
        $scope.messageStatus.push("Node " + obj.children[0].children[0].NodeId + ": " + obj.children[0].children[0].status);
        $scope.messageStatus.push("Node " + obj.children[0].children[0].NodeId + ": " + obj.children[0].children[1].status);
        console.log($scope.messageStatus);
        root = $scope.messages[0];
        console.log(root);
        update(root);
        if (obj.children[1].status == "ERROR") {
          $scope.show = true;
        }
    }
};

// var treeData = [{
//     "NodeId": "1",
//     "percentComplete": 0,
//     "parent": "null",
//     "colorStatus": "skyblue",
//     "children": [{
//         "NodeId": "2",
//         "percentComplete": 0,
//         "parent": "Top Level",
//         "colorStatus": "skyblue",
//         "children": [{
//             "NodeId": "4",
//             "percentComplete": 100,
//             "parent": "Level 2: A",
//             "colorStatus": "darkseagreen",
//         }, {
//             "NodeId": "5",
//             "percentComplete": 85,
//             "parent": "Level 2: A",
//             "colorStatus": "darkseagreen",
//         }]
//     }, {
//         "NodeId": "3",
//         "percentComplete": 15,
//         "parent": "Top Level",
//         "value": 10,
//         "colorStatus": "crimson",
//     }]
// }];
