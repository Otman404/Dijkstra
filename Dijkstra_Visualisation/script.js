var nodes, edges, network;

// convenience method to stringify a JSON object
function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}

function addNode() {
  try {
    nodes.add({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-id").value
    });
    printNodesTable();
  } catch (err) {
    alert(err);
  }
}

function updateNode() {
  try {
    nodes.update({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-id").value
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
    printEdgesTable();
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




function colorShortestPath(id, from, to, capacity) {
  try {
    edges.update({
      id: id,
      from: from,
      to: to,
      capacity: capacity,
      label: capacity,
      // color: { highlight: "red"},
      font: {
        enabled: true,
        size: 25,
        face: 'solid',
        color: 'black',
      },
      background: {
        enabled: true,
        size: 5,
        color: "rgba(32, 191, 107,1.0)"
      }
    });
  } catch (err) {
    alert(err);
  }
}
function colorShortestPathDefaut(id, from, to, capacity) {
  try {
    edges.update({
      id: id,
      from: from,
      to: to,
      capacity: capacity,
      label: capacity,
      background:{enabled: false}
    });
  } catch (err) {
    alert(err);
  }
}

async function getShortestPath() {
  document.getElementById('pcc').innerText = "";

  var gNodes = document.getElementById("nodes").innerHTML;
  var gEdges = document.getElementById("edges").innerHTML;
  var start = document.getElementById("start").value;
  var finish = document.getElementById("finish").value;
  if (gNodes.length != 0 && gEdges.length != 0 && start.length != 0 && finish.length != 0) {
    gNodes = JSON.parse(document.getElementById("nodes").innerHTML);
    gEdges = JSON.parse(document.getElementById("edges").innerHTML);

    for (var j = 0; j < gEdges.length; j++) {
      colorShortestPathDefaut(gEdges[j].id, gEdges[j].from, gEdges[j].to, gEdges[j].capacity);
    }
    //Testing algorithm
    let graph = []
    for (var i = 0; i < gEdges.length; i++) {
      graph.push([gEdges[i].from, gEdges[i].to, parseInt(gEdges[i].capacity)]);

    }

    let [path, length] = dijkstra(graph, start, finish);

    for (var i = 0; i < path.length; i++) {
      for (var j = 0; j < gEdges.length; j++) {

        if ((gEdges[j].from === path[i]) && (gEdges[j].to === path[i + 1]) ||  (gEdges[j].to === path[i]) && (gEdges[j].from === path[i + 1]) ) {
          colorShortestPath(gEdges[j].id, gEdges[j].from, gEdges[j].to, gEdges[j].capacity);
          await sleep(1000);
        }
      }
    }

    for(var k =0;k<path.length;k++){
      document.getElementById('pcc').innerText += path[k];
      if(k<path.length-1)
      document.getElementById('pcc').innerText += ' -> ';


    }
    // document.getElementById('pcc').innerText = path;
    document.getElementById('longueur').innerText = length;
    console.log(path) //[ 'a', 'c', 'f', 'e' ]
    console.log(length) //20
  }else{
    alert('Please specify the start and the finish nodes');
  }

}



window.addEventListener("load", () => {
  draw();
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function resetGraphColor(gEdges){
  for (var j = 0; j < gEdges.length; j++) {
    colorShortestPathDefaut(gEdges[j].id, gEdges[j].from, gEdges[j].to, gEdges[j].capacity);
  }
}

function printNodesTable(){
  document.getElementById('nodesTable').innerText="";
    var nodes = document.getElementById('nodes').innerText;
    if(nodes.length!=0){

      nodes = JSON.parse(document.getElementById('nodes').innerText);
      var table = document.getElementById("nodesTable");
   
      for(var k =0;k<nodes.length;k++){
        var row = table.insertRow(k);
        var cell1 = row.insertCell(0)
        cell1.innerHTML = nodes[k].id;
      }
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0)
      cell1.innerHTML = "nodes";
    }
}

function printEdgesTable(){
  document.getElementById('edgesTable').innerText="";
    var edges = document.getElementById('edges').innerText;
    var t=['id','from','to','capacity'];
    if(nodes.length!=0){

      edges = JSON.parse(document.getElementById('edges').innerText);
      var table = document.getElementById("edgesTable");
      var cell1;
      for(var k =0;k<edges.length;k++){
        var row = table.insertRow(k);
        for(var i=0;i<4;i++){
          cell1  = row.insertCell(i);
          cell1.innerHTML = edges[k][t[i]];
          //console.log(edges[k][i]);
        }
        
      }
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = "ID";
      cell2.innerHTML = "Source";
      cell3.innerHTML = "Destination";
      cell4.innerHTML = "Longueur";
    }
}