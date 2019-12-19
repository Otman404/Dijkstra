var nodes, edges, network;

// convenience method to stringify a JSON object
function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}

function addNode() {
  try {
    nodes.add({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-label").value
    });
  } catch (err) {
    alert(err);
  }
}

function updateNode() {
  try {
    nodes.update({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-label").value
    });
  } catch (err) {
    alert(err);
  }
}
function removeNode() {
  try {
    nodes.remove({ id: document.getElementById("node-id").value });
  } catch (err) {
    alert(err);
  }
}

function addEdge() {
  try {
    edges.add({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
      capacity: document.getElementById("edge-capacity").value,
      label: document.getElementById("edge-capacity").value
    });
  } catch (err) {
    alert(err);
  }
}
function updateEdge() {
  try {
    edges.update({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
      capacity: document.getElementById("edge-capacity").value,
      label: document.getElementById("edge-capacity").value,
    });
  } catch (err) {
    alert(err);
  }
}

function removeEdge() {
  try {
    edges.remove({ id: document.getElementById("edge-id").value });
  } catch (err) {
    alert(err);
  }
}

function draw() {
  // create an array with nodes
  nodes = new vis.DataSet();
  nodes.on("*", function () {
    document.getElementById("nodes").innerHTML = JSON.stringify(
      nodes.get(),
      null,
      4
    );
  });
  nodes.add([
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
    { id: "D", label: "D" },
    { id: "E", label: "E" },
    { id: "F", label: "F" },
  ]);

  // create an array with edges
  edges = new vis.DataSet();
  edges.on("*", function () {
    document.getElementById("edges").innerHTML = JSON.stringify(
      edges.get(),
      null,
      4
    );
  });
  var myRedColor = "red";
  // var capacity = 10;
  edges.add([
    { id: "1", from: "A", to: "B", capacity: 7, label: "7" },
    { id: "2", from: "A", to: "C", capacity: 9, label: "9" },
    { id: "3", from: "A", to: "F", capacity: 14, label: "14" },
    { id: "4", from: "B", to: "C", capacity: 10, label: "10" },
    { id: "5", from: "B", to: "D", capacity: 15, label: "15" },
    { id: "6", from: "C", to: "D", capacity: 11, label: "11" },
    { id: "7", from: "C", to: "F", capacity: 2, label: "2" },
    { id: "8", from: "D", to: "E", capacity: 6, label: "6" },
    { id: "9", from: "E", to: "F", capacity: 9, label: "9" }
    // { id: "9", from: "E", to: "F", capacity: 9, color: { highlight: myRedColor }, label: "9" },

    // { id: "2", from: "1", to: "3" },
    // { id: "3", from: "2", to: "4" },
    // { id: "4", from: "2", to: "5" }

  ]);

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  network = new vis.Network(container, data, options);
}







  const dijkstra = (edges, source, target) => {
    const Q = new Set(),
      prev = {},
      dist = {},
      adj = {}

    const vertex_with_min_dist = (Q, dist) => {
      let min_distance = Infinity,
        u = null

      for (let v of Q) {
        if (dist[v] < min_distance) {
          min_distance = dist[v]
          u = v
        }
      }
      return u
    }

    for (let i = 0; i < edges.length; i++) {
      let v1 = edges[i][0],
        v2 = edges[i][1],
        len = edges[i][2]

      Q.add(v1)
      Q.add(v2)

      dist[v1] = Infinity
      dist[v2] = Infinity

      if (adj[v1] === undefined) adj[v1] = {}
      if (adj[v2] === undefined) adj[v2] = {}

      adj[v1][v2] = len
      adj[v2][v1] = len
    }

    dist[source] = 0

    while (Q.size) {
      let u = vertex_with_min_dist(Q, dist),
        neighbors = Object.keys(adj[u]).filter(v => Q.has(v)) //Neighbor still in Q 

      Q.delete(u)

      if (u === target) break //Break when the target has been found

      for (let v of neighbors) {
        let alt = dist[u] + adj[u][v]
        if (alt < dist[v]) {
          dist[v] = alt
          prev[v] = u
        }
      }
    }

    {
      let u = target,
        S = [u],
        len = 0

      while (prev[u] !== undefined) {
        S.unshift(prev[u])
        len += adj[u][prev[u]]
        u = prev[u]
      }
      return [S, len]
    }
  }




  function updateEdge1(id,from,to,capacity) {
    try {
      edges.update({
        id: id,
        from: from,
        to: to,
        capacity: capacity,
        label: capacity,
        // color: { highlight: "red"},
        font : {
          enabled: true,
          size: 25,
          face: 'solid',
          color: 'black',
        },
        background: {
          enabled: true,
          size:5,
          color: "rgba(32, 191, 107,1.0)"
        }
      });
    } catch (err) {
      alert(err);
    }
  }

function getShortestPath(){
  var gNodes = document.getElementById("nodes").innerHTML;
  var gEdges = document.getElementById("edges").innerHTML;

  if (gNodes.length!=0 && gEdges.length!=0){
     gNodes = JSON.parse(document.getElementById("nodes").innerHTML);
     gEdges = JSON.parse(document.getElementById("edges").innerHTML);
     
     //Testing algorithm
     let graph = []
     for(var i = 0;i<gEdges.length;i++){
       graph.push([gEdges[i].from, gEdges[i].to, parseInt(gEdges[i].capacity)]);
       
      }
      
      let [path, length] = dijkstra(graph, gNodes[0].id , gNodes[gNodes.length - 2].id);
      var j=0;
      for(var i=0;i<gEdges.length;i++){
 
        if((gEdges[i].from === path[j]) && (gEdges[i].to === path[j+1])){
          updateEdge1(gEdges[i].id,gEdges[i].from,gEdges[i].to,gEdges[i].capacity);
          if(j<path.length) j++;
          console.log("INSIDE THE LOOP");
        }
      }
      
      
      console.log(path) //[ 'a', 'c', 'f', 'e' ]
      console.log(length) //20
    }
      
    }
    


window.addEventListener("load", () => {
  draw();
});

