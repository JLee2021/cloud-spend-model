OCI Cost Forecasting Dashboard
This project is a web-based tool for forecasting cloud costs on Oracle Cloud Infrastructure (OCI). It combines platform HR costs (networking, engineering, security, compliance, etc.) with OCI service costs to provide a dynamic and visualized cost forecasting dashboard. The project uses Google Charts API for data visualization.

Features
Input form for adjusting budget and HR costs.
Dynamic monthly spend forecasting for tenants using OCI services.
Visualization of:
Monthly Spend Forecast: Displays how much will be spent each month.
Cost Breakdown: Shows the percentage of costs allocated to HR vs. OCI services.
Responsive and user-friendly interface.
Technologies Used
HTML5: Structure of the application.
CSS3: Styling for a clean and modern interface.
JavaScript: Logic for calculations and Google Charts integration.
Google Charts API: Interactive charts for visualizing data.
Installation Instructions
Step 1: Download or Clone the Repository
bash
Copy code
git clone https://github.com/your-repo-name/oci-cost-dashboard.git
cd oci-cost-dashboard
Step 2: Open the Application
Open index.html in any modern web browser.
Usage Instructions
Open the Application:
Launch the index.html file in your browser.

Adjust Parameters:

Enter the total annual budget in dollars.
Enter the total annual HR costs for platform staff (networking, engineering, security, and compliance).
View Forecasts:

The Monthly Spend Forecast bar chart shows the total costs per month for tenants and HR.
The Cost Breakdown pie chart shows the percentage of costs between OCI services and HR.
Modify Inputs:
Adjust budget or HR costs in the form and click Update Forecast to recalculate and redraw the charts.

File Structure
bash
Copy code
project/
│
├── index.html # Main HTML file
├── style.css # CSS for styling the dashboard
├── script.js # JavaScript for logic and Google Charts integration
└── data.json # (Optional) Predefined inputs for tenants (not yet implemented)
Code Overview

1. Input Form
   The form in index.html accepts the annual budget and HR costs.
   Example:

html
Copy code

<form id="inputForm">
    <label>Annual Budget ($):</label>
    <input type="number" id="budget" value="1000000" required>
    <label>HR Costs ($):</label>
    <input type="number" id="hrCost" value="360000" required>
    <button type="submit">Update Forecast</button>
</form>
2. Cost Calculations
The cost is computed in script.js using predefined OCI pricing for compute, memory, storage, and data transfer. HR costs are distributed evenly across 12 months.

Example (Compute Cost):

javascript
Copy code
const computeCost = tenant.compute \* pricing.compute; // Per tenant cost 3. Visualization
Uses Google Charts to render two charts:

Bar chart for monthly spend:
javascript
Copy code
google.visualization.ColumnChart(document.getElementById('monthlySpendChart')).draw(data, options);
Pie chart for cost breakdown:
javascript
Copy code
google.visualization.PieChart(document.getElementById('costBreakdownChart')).draw(data, options);
Customization
Modify OCI Pricing: Update the pricing object in script.js to reflect your actual OCI service costs:

javascript
Copy code
const pricing = {
compute: 0.0125 _ 730,
memory: 0.0015 _ 730,
storage: 0.025,
dataTransfer: 0.05,
};
Add or Remove Tenants: Modify the tenants array in script.js to add more tenants:

javascript
Copy code
const tenants = [
{ name: 'Tenant A', goLiveMonth: 2, compute: 50, memory: 128, storage: 5, dataTransfer: 1, otherCost: 500 },
{ name: 'Tenant B', goLiveMonth: 4, compute: 100, memory: 256, storage: 10, dataTransfer: 2, otherCost: 1000 },
];
Update HR Costs: Adjust HR cost inputs via the form in the application or set defaults in the script.

Future Enhancements
Predefined Tenant Data: Use data.json to load tenants dynamically.
Dynamic Charts: Allow users to add tenants via the interface.
Expanded Cost Categories: Break HR costs into more detailed categories.
Export Functionality: Export forecasts as CSV or PDF reports.
