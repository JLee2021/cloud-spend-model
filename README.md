# **FishSTOC Cost Forecast Dashboard**

The **FishSTOC Cost Forecast Dashboard** is a dynamic, web-based tool for forecasting and analyzing Oracle Cloud Infrastructure (OCI) costs for tenants. It allows users to:

- Dynamically add tenants with OCI resource usage based on t-shirt sizing (Small, Medium, Large, XL).
- Calculate and visualize both tenant-specific and platform-wide costs.
- Analyze spending trends over time and compare against budget allocations.

---

## **Features**

- **Dynamic Tenant Addition:** Add tenants (e.g., FMC-1, FMC-2) with resource consumption defined by t-shirt sizing.
- **Platform Costs Integration:** Incorporates fixed monthly platform costs for managing the OCI platform.
- **Interactive Visualizations:**
  - **Pie Chart:** Distribution of cloud spend across tenants and platform costs.
  - **Column Chart:** Quarterly and monthly forecasted spend for tenants and platform costs.
  - **Line Chart:** Trends in monthly spend (tenant-specific and platform-wide).
  - **Gauge Chart:** Budget utilization for tenants and platform costs.
  - **Bar Chart:** Horizontal comparison of tenant spend.
- **Filters and Controls:**
  - Filter visualizations by date range or tenant.
  - Automatically adjusts charts based on user inputs.

---

## **How It Works**

1.  **Input Parameters:** Users specify the annual budget, platform costs, and dynamically add tenants with their OCI usage.
2.  **Cost Calculation:**
    - **Tenant Costs:** Determined by t-shirt size and multiplied by the forecast period (e.g., 3 months).
    - **Platform Costs:** Fixed monthly costs multiplied by the forecast period.
3.  **Visualization:** The model generates dynamic charts to help analyze spend distribution, trends, and budget utilization.
4.  **Summary Table:** Summarizes total tenant costs, platform costs, and remaining budget.

---

## **Assumptions**

1.  **T-Shirt Sizing for Tenants:**
    - Small (S): $500/month
    - Medium (M): $1,000/month
    - Large (L): $2,000/month
    - XL: $4,000/month
2.  **Platform Costs:** Fixed costs, e.g., $10,000/month.
3.  **Forecast Period:** 3 months (one fiscal quarter).
4.  **Annual Budget Allocation:** Covers tenant and platform costs.

---

## **Inputs**

### 1\. **Global Parameters**

| Parameter                | Description                              | Example Value |
| ------------------------ | ---------------------------------------- | ------------- |
| **Annual Budget**        | Total budget for the fiscal year.        | `$1,200,000`  |
| **Platform Admin Costs** | Monthly cost to manage the OCI platform. | `$10,000`     |

### 2\. **Tenants**

- **Name:** Custom tenant name (e.g., `FMC-1`, `FMC-2`).
- **T-Shirt Size:** Defines OCI resource usage:
  - **S:** Small (`$500/month`)
  - **M:** Medium (`$1,000/month`)
  - **L:** Large (`$2,000/month`)
  - **XL:** Extra Large (`$4,000/month`)

---

## **Outputs**

### 1\. **Visualizations**

#### a. **Pie Chart**

- **Purpose:** Shows the distribution of total spend across tenants and platform costs.
- **Key Features:**
  - Highlights tenant-specific costs.
  - Separates platform costs for comparison.
  - Hover-over tooltips display percentages and absolute values.

#### b. **Column Chart**

- **Purpose:** Displays quarterly spend for each tenant and platform costs.
- **Key Features:**
  - Grouped columns for tenant and platform costs.
  - Clearly compares tenant contributions to total costs.

#### c. **Line Chart**

- **Purpose:** Tracks trends in monthly spend for tenants and platform costs.
- **Key Features:**
  - Differentiates actual vs. projected spend using distinct line styles.
  - Combines tenant and platform trends into a single view.

#### d. **Gauge Chart**

- **Purpose:** Indicates budget utilization for tenants and platform costs.
- **Key Features:**
  - Uses green, yellow, and red zones to visualize budget performance.
  - Displays percentages of budget used for tenants and platform costs.

#### e. **Bar Chart**

- **Purpose:** Compares tenant spend in absolute terms or percentages.
- **Key Features:**
  - Horizontal bars sorted by spend (descending).
  - Toggle feature for absolute vs. percentage comparison.

---

### 2\. **Summary Table**

| Category               | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Total Tenant Costs** | Sum of tenant spend over the forecast period.  |
| **Platform Costs**     | Total platform spend over the forecast period. |
| **Total Costs**        | Sum of tenant and platform costs.              |
| **Remaining Budget**   | Budget left after accounting for all costs.    |

---

## **How to Use the Dashboard**

1.  **Adjust Global Parameters:**

    - Set the annual budget and platform admin costs.

2.  **Add Tenants:**

    - Click "Add Tenant" to input a tenant name and t-shirt size.
    - Repeat to add multiple tenants.

3.  **Update Forecast:**

    - Click "Update Forecast" to calculate and visualize costs.

4.  **Filter Visualizations:**

    - Use filters to focus on specific tenants or time periods.

5.  **Analyze Outputs:**

    - Review charts and the summary table for insights into spending trends, budget utilization, and tenant contributions.

---

## **Technical Details**

### **Frameworks and Tools**

- **Google Charts API:** For interactive and responsive visualizations.
- **HTML/CSS/JavaScript:** For frontend structure and styling.
- **Dynamic Interactivity:** Real-time chart updates based on user inputs.

---

## **Future Enhancements**

1.  **Toggle Options:**

    - Switch between quarterly and monthly forecasts in the column chart.
    - Add absolute vs. percentage toggle in the bar chart.

2.  **Export Feature:**

    - Enable export of visualizations and summary table to PDF or CSV.

3.  **Expanded Forecast Periods:**

    - Support for 6-month or 12-month forecasts.

4.  **Custom Resource Pricing:**

    - Allow users to input custom pricing for OCI services.

---

## **Support**

For questions or issues, contact:

- **Email:** support@fishstoc-dashboard.com
- **GitHub Issues:** [Submit an issue](https://github.com/fishstoc/fishstoc-dashboard/issues)
