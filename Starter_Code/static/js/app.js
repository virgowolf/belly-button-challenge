//Define URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

//Fetch the JSON data and console log it
let data = d3.json(url).then(function(data)) {
    console.log(data);
};
      
    // Filter the metadata for the object with the desired sample number
      var metadata = data.metadata.filter(obj => obj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
      var metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
      metadataPanel.html("");

    // Inside a loop, use d3 to append new tags for each key-value pair in the filtered metadata.
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
  var samples = data.samples;

    // Filter the samples for the object with the desired sample number
  var sampleData = samples.filter(obj => obj.id == sample) [0];

    // Get the otu_ids, otu_labels, and sample_values
  var otuIds = sampleData.otu_ids;
  var otuLabels = sampleData.otu_labels;
  var sampleValues = sampleData.sample_values;

    // Build a Bubble Chart
  let trace1 = {
    x: otuIds,
    y: sampleValues,
    mode: otuLabels,
    marker: {
    sampleValues,
    color: otuIds,
  },
  text: otuLabels
};

    // Render the Bubble Chart
    var data = [trace1];

    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('myDiv', data, layout);
  });
}
document.getElementById('myDiv');
//
document.addEventListener("DOMContentLoaded", function() {
  const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {
    console.log(data);

    // Function to build metadata panel
    function buildMetadata(sample) {
      var metadata = data.metadata.filter(obj => obj.id == sample)[0];
      var metadataPanel = d3.select("#sample-metadata");
      metadataPanel.html("");
      Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
      });
    }

    // Function to build bar chart
    function buildBarChart(sample) {
      var sampleData = data.samples.filter(obj => obj.id == sample)[0];
      var otuIds = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
      var sampleValues = sampleData.sample_values.slice(0, 10);
      var trace = {
        x: sampleValues,
        y: otuIds,
        text: sampleData.otu_labels.slice(0, 10),
        type: "bar",
        orientation: "h"
      };
      var layout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
      var data = [trace];
      Plotly.newPlot("plot", data, layout);
    }

    // Function to initialize the dashboard
    function init() {
      var dropdownMenu = d3.select("#selDataset");
      var sampleNames = data.names;
      sampleNames.forEach((name) => {
        dropdownMenu.append("option")
          .text(name)
          .property("value", name);
      });
      var firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildBarChart(firstSample);
    }

    // Call init to initialize the dashboard
    init();

    // Function for event listener
    function optionChanged(sampleID) {
      buildMetadata(sampleID);
      buildBarChart(sampleID);
    }
  }).catch(function(error) {
    console.error("Error fetching data:", error);
  });
});

  
// Initialize the dashboard
init()

