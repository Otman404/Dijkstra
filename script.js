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
      capacity: document.getElementById("edge-capacity").value
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
      to: document.getElementById("edge-to").value
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
  nodes.on("*", function() {
    document.getElementById("nodes").innerHTML = JSON.stringify(
      nodes.get(),
      null,
      4
    );
  });
  nodes.add([
    { id: "1", label: "A" },
    { id: "2", label: "Node 2" },
    { id: "3", label: "Node 3" }
    // { id: "4", label: "Node 4" },
    // { id: "5", label: "Node 5" }
  ]);

  // create an array with edges
  edges = new vis.DataSet();
  edges.on("*", function() {
    document.getElementById("edges").innerHTML = JSON.stringify(
      edges.get(),
      null,
      4
    );
  });
  var myRedColor = "red";
  edges.add([
    { id: "1", from: "1", to: "2",capacity:10,color: {highlight: myRedColor} },
    { id: "2", from: "1", to: "3",capacity:5,color: {highlight: myRedColor} }
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

var gNodes = JSON.parse(!document.getElementById("nodes").innerHTML);
var gEdges = JSON.parse(!document.getElementById("edges").innerHTML);

// for i .. gEdges.length
//     for j .. gEdges.id.lengh
//var b = gEdges.id[i]:{gEdges.to[i]};+var;

const graph = {
  start: {A: 5, B: 2},
  A: {C: 4, D: 2},
  B: {A: 8, D: 7},
  C: {D: 6, finish: 3},
  D: {finish: 1},
  finish: {}
};


window.addEventListener("load", () => {
  draw();
});

