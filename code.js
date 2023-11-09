// Upload the map of the United Kingdom using gb.json this the starting point for the assignment 
d3.json('gb.json')
  .then((ukMapData) => {
    // Defining the map projection for the provided map code above.
    const projection = d3.geoAlbers()
      .center([0, 55.4])
      .rotate([0, 0])
      .fitSize([700, 700], ukMapData); // Adjusting the map to fit inside the container using the varibles (center, rotate 
      // and fitsize)

    // Generating an SVG element for the map inside the div with the id map 
    const svg = d3.select('#map-container').append('svg')
      .attr('width', 700)
      .attr('height', 700);

    // Now the code below is simply adding an image to the SVG
    svg.append('image')
      .attr('x', 600) // simply setting the x-coordinate
      .attr('y', 10)  // simply setting the y-coordinate
      .attr('width', 100) // now setting the width of the image in order to display the map
      .attr('height', 100) // now setting the height of the image in order to display the map
      .attr('xlink:href', 'compass.png'); 


    // defining and creating a color scale for different subunits or regions on the map
    const colorScale = d3.scaleOrdinal()
      .domain(ukMapData.features.map(feature => feature.properties.SUBUNIT)) // modifying to the property you want to use
      .range(d3.schemeCategory10); // this allows us to use a different color scheme

    // Initiaite the UK map
    svg.selectAll('path')
      .data(ukMapData.features)
      .enter()
      .append('path')
      .attr('class', 'country') // then we add a class to style the map
      .attr('d', d3.geoPath().projection(projection))
      .style('fill', d => colorScale(d.properties.SUBUNIT));

    // creating a function to update the map with new town data
    function updateMap(townData) {
      //simply remove existing town markers and labels
      svg.selectAll('.town').remove();

      // Appending circles for towns using latitude and longitude
      // Appending circles for towns using latitude and longitude with bounce animation
      const towns = svg.selectAll('.town')
        .data(townData)
        .enter()
        .append('circle')
        .attr('class', 'town')
        .attr('r', 0) // Starting with a radius of 0

      towns
        .transition()
        .duration(1600) // Transition duration in milliseconds
        .ease(d3.easeBounceOut) // Use bounce easing (this is where we implement the transition)
        .attr('cx', d => projection([d.lng, d.lat])[0])
        .attr('cy', d => projection([d.lng, d.lat])[1])
        .attr('r', 5); // Transition to a radius of 5


      // On mouseover, display the town label and update information in the <p> tag
      towns.on('mouseover', function (event, d) {
        const townInfo = d3.select('#townInfo');
        townInfo.text(`Town: ${d.Town}, Population: ${d.Population}`);

        const townInfoContainer = d3.select('#townInfoContainer');
        townInfoContainer.style('left', (event.pageX + 10) + 'px');
        townInfoContainer.style('top', (event.pageY - 25) + 'px');
      });

      // Here we simply mouseout event to hide town label and clear town information
      towns.on('mouseout', function () {
        const townInfo = d3.select('#townInfo');
        townInfo.text('Town : ' + ' ,Population');

      });
    }

    

    // Having done the steps above now we simply load town data from the JSON feed and update the map
    function loadDataAndPlotMap(townCount) {
      // Fetching the town data
      fetch(`http://34.38.72.236/Circles/Towns/${townCount}`)
        .then(response => response.json())
        .then(data => {
          // Making sure the data contains at least townCount entries
          const limitedData = data.slice(0, townCount);
          updateMap(limitedData);
        })
        .catch(err => {
          console.error('Error fetching town data:', err);
        });
    }

    // Initial data load and map plot
    loadDataAndPlotMap(50);

    // Reload data button click event
    document.getElementById('reloadData').addEventListener('click', () => {
      const townCount = document.getElementById('townCount').value;
      loadDataAndPlotMap(townCount);
    });

    // This is where we have our slider and its function : Slider change event
    document.getElementById('townCount').addEventListener('input', () => {
      const townCount = document.getElementById('townCount').value;
      document.getElementById('townCountLabel').textContent = townCount;
    });
  })
  .catch(err => {
    console.error('Error loading the UK map:', err);
  });
