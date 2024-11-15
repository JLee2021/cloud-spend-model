google.charts.load("current", { packages: ["corechart"] });

// OCI Product Pricing
const pricing = {
  compute: 0.025, // $0.025/vCPU/hour
  blockStorage: 0.025, // $0.025/GB/month
  objectStorage: 0.03, // $0.03/GB/month
  networking: 0.05, // $0.05/GB
  database: 2.5, // $2.50/hour
};

// Preconfigured tenants
const tenants = [
  {
    name: "FMC-1",
    budget: 120000,
    compute: 10,
    blockStorage: 200,
    objectStorage: 100,
    networking: 500,
    database: 2,
  },
  {
    name: "FMC-2",
    budget: 150000,
    compute: 15,
    blockStorage: 300,
    objectStorage: 200,
    networking: 800,
    database: 3,
  },
  {
    name: "FMC-3",
    budget: 180000,
    compute: 20,
    blockStorage: 400,
    objectStorage: 300,
    networking: 1000,
    database: 1,
  },
  {
    name: "FMC-4",
    budget: 100000,
    compute: 5,
    blockStorage: 100,
    objectStorage: 50,
    networking: 200,
    database: 2,
  },
  {
    name: "FMC-5",
    budget: 90000,
    compute: 8,
    blockStorage: 150,
    objectStorage: 75,
    networking: 300,
    database: 1,
  },
];

// Initialize the form with preconfigured tenants
function populateTenantInputs() {
  const container = document.getElementById("tenantsContainer");
  tenants.forEach((tenant, idx) => {
    const div = document.createElement("div");
    div.className = "tenantInput";
    div.innerHTML = `
            <label for="tenantName${idx}">Tenant Name:</label>
            <input type="text" id="tenantName${idx}" value="${tenant.name}" readonly>
            <label for="budget${idx}">Budget ($):</label>
            <input type="number" id="budget${idx}" value="${tenant.budget}" required>
            <label for="compute${idx}">Compute (vCPUs):</label>
            <input type="number" id="compute${idx}" value="${tenant.compute}" required>
            <label for="blockStorage${idx}">Block Storage (GB):</label>
            <input type="number" id="blockStorage${idx}" value="${tenant.blockStorage}" required>
            <label for="objectStorage${idx}">Object Storage (GB):</label>
            <input type="number" id="objectStorage${idx}" value="${tenant.objectStorage}" required>
            <label for="networking${idx}">Networking (GB):</label>
            <input type="number" id="networking${idx}" value="${tenant.networking}" required>
            <label for="database${idx}">Database Instances:</label>
            <input type="number" id="database${idx}" value="${tenant.database}" required>
        `;
    container.appendChild(div);
  });
}

// Add a new tenant dynamically
document.getElementById("addTenantButton").addEventListener("click", () => {
  const idx = tenants.length;
  tenants.push({
    name: `FMC-${idx + 1}`,
    budget: 100000,
    compute: 0,
    blockStorage: 0,
    objectStorage: 0,
    networking: 0,
    database: 0,
  });
  populateTenantInputs();
});

// Event listener for updating the forecast
document.getElementById("inputForm").addEventListener("submit", (e) => {
  e.preventDefault();
  updateForecast();
});

function updateForecast() {
  const adminCost = parseFloat(document.getElementById("adminCost").value);
  const platformCost = calculatePlatformCost(adminCost);
  const tenantCosts = calculateTenantCosts(platformCost);

  drawPieChart(tenantCosts, platformCost);
  drawStackedBarChart(tenantCosts, platformCost);
  updateFiscalSummary(tenantCosts, platformCost);
  updateTenantSummary(tenantCosts);
}

function calculatePlatformCost(adminCost) {
  return adminCost * 3; // Fixed cost for the forecast period (3 months)
}

function calculateTenantCosts(platformCost) {
  const equalPlatformCostShare = platformCost / tenants.length;

  return tenants.map((tenant) => {
    const projectedSpend =
      tenant.compute * pricing.compute * 730 +
      tenant.blockStorage * pricing.blockStorage +
      tenant.objectStorage * pricing.objectStorage +
      tenant.networking * pricing.networking +
      tenant.database * pricing.database * 730;

    const totalCost = projectedSpend + equalPlatformCostShare;

    return {
      ...tenant,
      projectedSpend,
      platformCostShare: equalPlatformCostShare,
      totalCost,
      surplus: tenant.budget - totalCost,
    };
  });
}

function drawPieChart(tenantCosts, platformCost) {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Category");
  data.addColumn("number", "Cost");

  tenantCosts.forEach((tenant) => data.addRow([tenant.name, tenant.totalCost]));
  data.addRow(["Platform Costs", platformCost]);

  const options = { title: "Spend Distribution", pieHole: 0.4 };
  const chart = new google.visualization.PieChart(
    document.getElementById("pieChart")
  );
  chart.draw(data, options);
}

function drawStackedBarChart(tenantCosts, platformCost) {
  const data = new google.visualization.DataTable();
  data.addColumn("string", "Category");
  tenantCosts.forEach((tenant) => data.addColumn("number", tenant.name));
  data.addColumn("number", "Platform Costs");

  data.addRow([
    "Q1",
    ...tenantCosts.map((t) => t.projectedSpend / 3),
    platformCost / 3,
  ]);
  data.addRow([
    "Q2",
    ...tenantCosts.map((t) => t.projectedSpend / 3),
    platformCost / 3,
  ]);
  data.addRow([
    "Q3",
    ...tenantCosts.map((t) => t.projectedSpend / 3),
    platformCost / 3,
  ]);

  const options = { title: "Quarterly Spend", isStacked: true };
  const chart = new google.visualization.ColumnChart(
    document.getElementById("stackedBarChart")
  );
  chart.draw(data, options);
}

function updateFiscalSummary(tenantCosts, platformCost) {
  const totalTenantCost = tenantCosts.reduce(
    (sum, t) => sum + t.projectedSpend,
    0
  );
  const fiscalData = [
    { category: "Total Tenant Costs", value: totalTenantCost.toFixed(2) },
    { category: "Total Platform Costs", value: platformCost.toFixed(2) },
    {
      category: "Overall Costs",
      value: (totalTenantCost + platformCost).toFixed(2),
    },
  ];

  const tbody = document.getElementById("fiscalResults");
  tbody.innerHTML = fiscalData
    .map((row) => `<tr><td>${row.category}</td><td>${row.value}</td></tr>`)
    .join("");
}

function updateTenantSummary(tenantCosts) {
  const tbody = document.getElementById("summaryResults");
  tbody.innerHTML = tenantCosts
    .map(
      (tenant) => `
            <tr>
                <td>${tenant.name}</td>
                <td>${tenant.budget.toFixed(2)}</td>
                <td>${tenant.projectedSpend.toFixed(2)}</td>
                <td>${tenant.platformCostShare.toFixed(2)}</td>
                <td>${tenant.totalCost.toFixed(2)}</td>
                <td>${tenant.surplus.toFixed(2)}</td>
                <td>${(tenant.budget - tenant.projectedSpend).toFixed(2)}</td>
            </tr>
        `
    )
    .join("");
}

// Populate the form with initial tenants
populateTenantInputs();
google.charts.setOnLoadCallback(updateForecast);
