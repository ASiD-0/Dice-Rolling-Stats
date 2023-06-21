function generateButtons() {
  var buttonContainer = document.getElementById('button-container');

  for (var i = 2; i <= 12; i++) {
    var button = document.createElement('button');
    button.innerHTML = i;
    button.className = 'dice-number btn button' + i;
    buttonContainer.appendChild(button);

    button.addEventListener(
      'click',
      function (i, buttonElement) {
        incrementCounter(i, buttonElement);
        renderCounts();
      }.bind(null, i, button)
    ); // Add click event listener
  }

  renderCounts(); // Initial rendering of counts
}

function incrementCounter(buttonValue, buttonElement) {
  var count = parseInt(localStorage.getItem(buttonValue), 10) || 0; // Get the current count from local storage
  count++; // Increment the count
  localStorage.setItem(buttonValue, count); // Store the updated count in local storage
}

function renderCounts() {
  var buttons = document.getElementsByClassName('dice-number');

  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var buttonValue = parseInt(button.innerHTML, 10);
    var count = parseInt(localStorage.getItem(buttonValue), 10) || 0; // Get the count from local storage

    button.innerHTML = buttonValue + ' ' + `<span class="small-number">(${count})</span>` ; // Update the button label with the count
    
  }
}

function clearStats() {
  var canvas = document.getElementById("chart");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  localStorage.clear();
  renderCounts();
  console.log('Session storage cleared.');

  if (chart) {
    // Reset chart data to an empty state
    chart.data.datasets[0].data = [];
    chart.update();
  }
}
// Global chart variable
var chart;

// Function to gather and display the local storage information as a bar chart
function showStats() {
  var buttonStats = [];

  for (var i = 2; i <= 12; i++) {
    var count = parseInt(localStorage.getItem(i), 10) || 0;
    buttonStats.push(count);
  }

  var ctx = document.getElementById("chart").getContext("2d");

  if (chart) {
    // Update chart data and options if chart already exists
    chart.data.datasets[0].data = buttonStats;
    chart.update();
  } else {
    // Create new chart if it doesn't exist
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "Button Statistics",
            data: buttonStats,
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
    });
  }
}

// Call the generateButtons function when the page finishes loading
window.onload = function () {
  generateButtons();
};
