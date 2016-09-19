angular.module('app')
    .directive('d3graph', function() {
        return {
            restrict: 'EA',
            scope: {
                val: '=',
            },
            link: function(scope, element, attrs) {

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

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")rotate(90)");

                //console.log(treeData[0]);
                console.log(scope.val[0]);
                root = scope.val[0];

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

                scope.$watch('val', function(newVal, oldVal) {

                    // clear the elements inside of the directive
                    svg.selectAll('*').remove();
                    if (!newVal) {
                        return;
                    }
                })
                return svg;
            }
        }
    })
