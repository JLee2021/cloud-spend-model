google.charts.load("current", { packages: ["corechart", "gauge"] });

const baseCosts = { S: 500, M: 1000, L: 2000, XL: 4000 };
const tenants = [];

document
  .getElementById("addTenantButton")
  .addEventListener("click", addTenantInput);
document.getElementById("inputForm").addEventListener("submit", (e) => {
  e.preventDefault();
  updateForecast();
});

function addTenantInput() {
  const container = document.getElementById("tenantsContainer");
  const tenantIdx = tenants.length + 1;

  const div = document.createElement("div");
  div.className = "tenantInput";
  div.innerHTML = `
        <label for="tenantName${tenantIdx}">Tenant Name:</label>
        <input type="text" id="tenantName${tenantIdx}" placeholder="Tenant FMC-${tenantIdx}" required>
        <label for="tenantSize${tenantIdx}">Size:</label>
        <select id="tenantSize${tenantIdx}">
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">XL</option>
        </select>
    `;
  container.appendChild(div);
  tenants.push({ name: `FMC-${tenantIdx}`, size: "M" });
}

function updateForecast() {
  const annualBudget = parseFloat(
    document.getElementById("annualBudget").value
  );
  const adminCost = parseFloat(document.getElementById("adminCost").value);
  const tenantDetails = getTenantDetails();

  const tenantCosts = calculateTenantCosts(tenantDetails);
  const platformCost = calculatePlatformCost(adminCost);

  drawPieChart(tenantCosts, platformCost);
  drawColumnChart(tenantCosts, platformCost);
  drawLineChart(tenantCosts, platformCost);
  drawGaugeChart(tenantCosts, platformCost, annualBudget);
  drawBarChart(tenantCosts);
  updateSummaryTable(tenantCosts, platformCost, annualBudget);
}

function getTenantDetails() {
  return tenants.map((tenant, idx) => {
    const name =
      document.getElementById(`tenantName${idx + 1}`).value || tenant.name;
    const size =
      document.getElementById(`tenantSize${idx + 1}`).value || tenant.size;
    return { name, size };
  });
}

function calculateTenantCosts(tenantDetails) {
  return tenantDetails.map((tenant) => ({
    name: tenant.name,
    monthlyCost: baseCosts[tenant.size],
  }));
}

function calculatePlatformCost(adminCost) {
  return adminCost * 3; // Fixed cost for the forecast period (3 months)
}

function drawPieChart(tenantCosts, platformCost) {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Category");
  data.addColumn("number", "Cost");

  tenantCosts.forEach((tenant) => {
    data.addRow([tenant.name, tenant.monthlyCost * 3]);
  });
  data.addRow(["Platform Costs", platformCost]);

  const options = {
    title: "Spend Distribution (Tenants vs. Platform)",
    pieHole: 0.4,
  };
  const chart = new google.visualization.PieChart(
    document.getElementById("pieChart")
  );
  chart.draw(data, options);
}

function drawColumnChart(tenantCosts, platformCost) {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Quarter");
  tenantCosts.forEach((tenant) => data.addColumn("number", tenant.name));
  data.addColumn("number", "Platform Costs");

  data.addRows([
    ["Q1", ...tenantCosts.map((t) => t.monthlyCost), platformCost / 3],
    ["Q2", ...tenantCosts.map((t) => t.monthlyCost), platformCost / 3],
    ["Q3", ...tenantCosts.map((t) => t.monthlyCost), platformCost / 3],
  ]);

  const options = {
    title: "Quarterly Spend Forecast (Tenants & Platform)",
    isStacked: true,
  };
  const chart = new google.visualization.ColumnChart(
    document.getElementById("columnChart")
  );
  chart.draw(data, options);
}

function drawLineChart(tenantCosts, platformCost) {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Month");
  tenantCosts.forEach((tenant) => data.addColumn("number", tenant.name));
  data.addColumn("number", "Platform Costs");

  data.addRows([
    ["Jan", ...tenantCosts.map((t) => t.monthlyCost), platformCost / 3],
    ["Feb", ...tenantCosts.map((t) => t.monthlyCost), platformCost / 3],
    ["Mar", ...tenantCosts.map((t) => t.monthlyCost), platformCost / 3],
  ]);

  const options = { title: "Monthly Spend Trends (Tenants & Platform)" };
  const chart = new google.visualization.LineChart(
    document.getElementById("lineChart")
  );
  chart.draw(data, options);
}

function drawGaugeChart(tenantCosts, platformCost, annualBudget) {
  const totalTenantCost = tenantCosts.reduce(
    (sum, tenant) => sum + tenant.monthlyCost * 3,
    0
  );
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Label");
  data.addColumn("number", "Value");

  data.addRow(["Tenants", (totalTenantCost / annualBudget) * 100]);
  data.addRow(["Platform", (platformCost / annualBudget) * 100]);

  const options = { width: 800, height: 300, minorTicks: 5 };
  const chart = new google.visualization.Gauge(
    document.getElementById("gaugeChart")
  );
  chart.draw(data, options);
}

function drawBarChart(tenantCosts) {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Tenant");
  data.addColumn("number", "Spend");

  tenantCosts
    .sort((a, b) => b.monthlyCost - a.monthlyCost)
    .forEach((tenant) => {
      data.addRow([tenant.name, tenant.monthlyCost * 3]);
    });

  const options = { title: "Tenant Spend Comparison", bars: "horizontal" };
  const chart = new google.visualization.BarChart(
    document.getElementById("barChart")
  );
  chart.draw(data, options);
}

function updateSummaryTable(tenantCosts, platformCost, annualBudget) {
  const totalTenantCost = tenantCosts.reduce(
    (sum, tenant) => sum + tenant.monthlyCost * 3,
    0
  );
  const tbody = document.getElementById("summaryResults");
  tbody.innerHTML = `
        <tr><td>Total Tenant Costs</td><td>${totalTenantCost}</td></tr>
        <tr><td>Platform Costs</td><td>${platformCost}</td></tr>
        <tr><td>Total Costs</td><td>${totalTenantCost + platformCost}</td></tr>
        <tr><td>Remaining Budget</td><td>${
          annualBudget - totalTenantCost - platformCost
        }</td></tr>
    `;
}

google.charts.setOnLoadCallback(() => {
  addTenantInput();
  updateForecast();
});
