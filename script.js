// Get the start and end date input fields
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

function getMaxPrice(data) {
    return Math.max(...data.map(d => d.Price));
  }


// Function to update the chart
function updateChart() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
  
    // Filter the data based on the start and end dates
    const filteredData = spData.filter(data => {
      const date = new Date(data.Date);
      return date >= startDate && date <= endDate;
    });
  
    // Sort the filtered data by date
    const sortedData = filteredData.slice().sort((a, b) => new Date(a.Date) - new Date(b.Date));
    const sortedLabels = sortedData.map(data => data.Date);
    const sortedDataPoints = sortedData.map(data => data.Price);
    const sortedAdjustedDataPoints = sortedData.map(data => data.AdjustedForInflation);
  
    // Update the chart data
    spChart.data.labels = sortedLabels;
    spChart.data.datasets[0].data = sortedDataPoints;
    spChart.data.datasets[1].data = sortedAdjustedDataPoints;
    spChart.update();
  }
  
// Add event listeners to the start and end date input fields
startDateInput.addEventListener('change', updateChart);
endDateInput.addEventListener('change', updateChart);

// Initial setup of the chart data and configurations
const data = {
    labels: [],
    datasets: [{
      label: 'Price',
      backgroundColor: 'rgba(54, 162, 235, 0.25)',
      borderColor: 'rgba(54, 162, 235, 0.6)',
      data: [],
      fill: false,
    },
    {
      label: 'Adjusted for Inflation',
      backgroundColor: 'rgba(153, 102, 255, 0.25)',
      borderColor: 'rgba(153, 102, 255, 0.6)',
      data: [],
      fill: false,
      enabled: false,
      hidden: true
    }]
  };
  
const zoomOptions = {
    limits: {
    //   x: {min: -200, max: 200, minRange: 50},
      y: {min: 0, max: 5500, minRange: 50}
    },
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      wheel: {
        enabled: true,
      },
      pinch: {
        enabled: true
      },
      mode: 'xy',
      onZoomComplete({chart}) {
        chart.update('none');
      }
    }
  };


const config = {
    type: 'line',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        annotation: {
          annotations: {
            momentum1970: {
                type: 'box',
                xMin: '1/1/1971',
                xMax: '5/1/1971',
                backgroundColor: 'rgba(75, 192, 192, 0.25)',
                borderWidth: 1,
                borderColor: 'rgb(75, 192, 192)',
                  },  
            momentum2023: {
                type: 'box',
                xMin: '11/1/2023',
                xMax: '2/1/2024',
                backgroundColor: 'rgba(75, 192, 192, 0.25)',
                borderWidth: 1,
                borderColor: 'rgb(75, 192, 192)',
                  },  
            recession1973: {
              type: 'box',
              xMin: '11/1/1973',
              xMax: '3/1/1975',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
                          },
            recession1980: {
              type: 'box',
              xMin: '1/1/1980',
              xMax: '7/1/1980',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
                          },
            recession1981: {
              type: 'box',
              xMin: '7/1/1981',
              xMax: '11/1/1982',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
                          },
            early1990sRecession: {
              type: 'box',
              xMin: '7/1/1990',
              xMax: '3/1/1991',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
                          },
            early2000sRecession: {
              type: 'box',
              xMin: '3/1/2001',
              xMax: '11/1/2001',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
                          },
            greatRecession: {
              type: 'box',
              xMin: '12/1/2007',
              xMax: '6/1/2009',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
                          },
            covidRecession: {
              type: 'box',
              xMin: '2/1/2020',
              xMax: '4/1/2020',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
                          }
        }
      },
      zoom: zoomOptions,
    }
  }
};
  
window.addEventListener('resize', function() {
    spChart.resize();
  });
  
// Render the chart
const spChart = new Chart(
  document.getElementById('Chart'),
  config
);

// Initial update of the chart
updateChart();