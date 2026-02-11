function updateArray(key, value, array) {
  if (!array[key]) array[key] = new Set();
  array[key].add(value);
}

function renderTermGroups(containerId = "search-terms") {
  const allTerms = {}
  
  Object.entries(window.termMap).forEach(([slug, data]) => {
    data.forEach( it => {
      Object.entries(it).forEach(([group, values]) => {
        values.forEach( v => {updateArray(group, v, allTerms)} );
      });
    });
  });

  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (const [group, values] of Object.entries(allTerms)) {
    // --- header ---
    const header = document.createElement("h3");
    header.textContent = group;
    container.appendChild(header);

    // --- button container ---
    const btnRow = document.createElement("div");
    btnRow.className = "filter-buttons";
    container.appendChild(btnRow);

    // --- buttons ---
    [...values].sort().forEach(value => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn";
      btn.dataset.group = group;
      btn.dataset.value = value;
      btn.textContent = value;

      btn.addEventListener("click", handleFilterClick);
      btnRow.appendChild(btn);
    });
  }
}

function handleFilterClick(e) {
  const btn = e.currentTarget;
  const { group, value } = btn.dataset;

  btn.classList.toggle("active");
  const isActive = btn.classList.contains("active");

  if (!window.selectedTerms[group]) window.selectedTerms[group] = new Set();

  if (isActive) window.selectedTerms[group].add(value);
  else window.selectedTerms[group].delete(value);

  if (window.selectedTerms[group].size === 0) delete window.selectedTerms[group];

  // for logging / passing to filter:
  const selectedObj = Object.fromEntries(
    Object.entries(window.selectedTerms).map(([g, set]) => [g, [...set].sort()])
  );
  
  // Re-render the table with the new filters
  renderTable();
}

// Initialize and render table on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize selectedTerms if needed
  if (!window.selectedTerms) {
    window.selectedTerms = {};
  }
  
  // Render the table immediately with no filters
  renderTable();
});