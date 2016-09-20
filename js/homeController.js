(function(){
angular
    .module('app')
    .controller('homeController', homeController);
    homeController.$inject = ['$scope', '$state', '$stateParams', 'factory'];
    function homeController($scope, $state, $stateParams, factory) {
        var newTree = [];
        var obj;
        var treeId = $stateParams.id;
        console.log(treeId);
        function getTreeStructure(array){
        factory.getTreeStructure(treeId)
        .then( function(data){
          var obj = data.data;
          obj["parent"] = 'null';
          obj["completion"] = 0;
          if (obj.completion == 0) {
          obj["status"] = "skyblue";
        }
          newTree.push(obj);
        })
      }
      getTreeStructure(newTree);

      console.log(newTree);



        // newTree.push($scope.data);
        // console.log(newTree);

        var treeData = [{
            "id": "1",
            "completion": 0,
            "parent": "null",
            "status": "skyblue",
            "children": [{
                "id": "2",
                "completion": 0,
                "parent": "Top Level",
                "status": "skyblue",
                "children": [{
                    "id": "4",
                    "completion": 100,
                    "parent": "Level 2: A",
                    "status": "darkseagreen",
                }, {
                    "id": "5",
                    "completion": 85,
                    "parent": "Level 2: A",
                    "status": "darkseagreen",
                }]
            }, {
                "id": "3",
                "completion": 15,
                "parent": "Top Level",
                "value": 10,
                "status": "crimson",
            }]
        }];

        // ************** Generate the tree diagram	 *****************
        var margin = {
                top: 50,
                right: 120,
                bottom: 20,
                left: 500
            },
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;

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

        root = treeData[0];

        update(root);

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) {
                d.y = d.depth * 180;
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
                .attr("r", 25)
                .style("stroke", function(d) {
                    return d.status;
                });

            nodeEnter
                .append("text")
                //  .attr("x", function(d) {
                // 	  return d.children})
                .attr("dy", ".35em")
                .attr("transform", "rotate(-90)")
                .text(function(d) {
                    complete = d.completion + "% complete";
                    return complete;
                })
                .style("fill-opacity", 1)
                //.html("<a id='nodeLinkModal' class='waves-effect waves-light btn modal-trigger' href='node'>" + complete + "</a>")
                .style("stroke", function(d) {
                    return d.status;
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
                    return d.target.status;
                })
                .attr("d", diagonal);
        }


        // socket.on('init', function (data) {
        //     // $scope.id = data.id;
        //     // $scope.users = data.users;
        //   });
        // socket.on('user:join', function (data) {
        //       // $scope.messages.push({
        //       //   user: 'chatroom',
        //       //   text: 'User ' + data.id + ' has joined.'
        //       // });
        //       // $scope.users.push(data.id);
        //     });
        //$scope.modalTrigger = function () { $('#modal1').openModal() }
    };
  })();
