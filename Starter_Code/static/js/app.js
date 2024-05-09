document.addEventListener("DOMContentLoaded", function() {
  const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

  // Fetch the JSON data and console log it
  d3.json(url).then(function(jsonData) {
    console.log(jsonData);

    // Function to build bubble chart
    function buildBubbleChart(sampleID) {
      var sampleData = jsonData.samples.filter(obj => obj.id == sampleID)[0];
      var trace = {
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        mode: 'markers',
        marker: {
          size: sampleData.sample_values,
          color: sampleData.otu_ids,
          colorscale: 'Earth',
          type: 'heatmap'
        },
        text: sampleData.otu_labels
      };
      var layout = {
        title: "Bacteria Cultures Per Sample",
        showlegend: false,
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Value" }
      };
      var data = [trace];
      Plotly.newPlot("bubble", data, layout);
    }

    // Function to build metadata panel
    function buildMetadata(sampleID) {
      var metadata = jsonData.metadata.filter(obj => obj.id == sampleID)[0];
      var metadataPanel = d3.select("#sample-metadata");
      metadataPanel.html("");
      Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
      });
    }

    // Function to build bar chart
    function buildBarChart(sampleID) {
      var sampleData = jsonData.samples.filter(obj => obj.id == sampleID)[0];
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
      Plotly.newPlot("bar", data, layout);
    }

    // Function to initialize the dashboard and dropdown menu
    function init() {
      var dropdownMenu = d3.select("#selDataset");
      var sampleNames = jsonData.names;
      sampleNames.forEach((name) => {
        dropdownMenu.append("option")
          .text(name)
          .property("value", name);
      });
      var firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildBarChart(firstSample);
      buildBubbleChart(firstSample); // Call function to build bubble chart
    }

    // Initialize the dashboard
    init();

    // Function for event listener
    function optionChanged(sampleID) {
      buildMetadata(sampleID);
      buildBarChart(sampleID);
      buildBubbleChart(sampleID);
    }
  }).catch(function(error) {
    console.error("Error fetching data:", error);
  });
});
