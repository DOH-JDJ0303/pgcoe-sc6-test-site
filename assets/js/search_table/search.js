/* 
======================
  UTILS
======================
*/

function updateArray(key, value, array) {
  if (!array[key]) array[key] = new Set();
  array[key].add(value);
}

/* 
======================
  RENDER CATEGORY
======================
*/

function renderCategory(containerId = "search-category") {
  const allCategory = {}
  
  Object.entries(window.categoryMap).forEach(([slug, data]) => {
    data.forEach( it => {
      Object.entries(it).forEach(([group, values]) => {
        values.forEach( v => {updateArray(group, v, allCategory)} );
      });
    });
  });

  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (const [group, values] of Object.entries(allCategory)) {
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


/* 
======================
  FILTER CLICK
======================
*/
function handleFilterClick(e) {
  const btn = e.currentTarget;
  const { group, value } = btn.dataset;

  btn.classList.toggle("active");
  const isActive = btn.classList.contains("active");

  if (!window.selectedCategory[group]) window.selectedCategory[group] = new Set();

  if (isActive) window.selectedCategory[group].add(value);
  else window.selectedCategory[group].delete(value);

  if (window.selectedCategory[group].size === 0) delete window.selectedCategory[group];

  // for logging / passing to filter:
  const selectedObj = Object.fromEntries(
    Object.entries(window.selectedCategory).map(([g, set]) => [g, [...set].sort()])
  );
  
  // Re-render the table with the new filters
  renderTable();
}

// Initialize and render table on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize selectedCategory if needed
  if (!window.selectedCategory) {
    window.selectedCategory = {};
  }
  
  // Render the table immediately with no filters
  renderTable();
});


/* 
======================
  RENDER TABLE
======================
*/
function renderTable(containerId = "workflow-table") {
  // Build allCategory from window.categoryMap
  const allCategory = {};
  Object.entries(window.categoryMap).forEach(([slug, data]) => {
    data.forEach(it => {
      Object.entries(it).forEach(([group, values]) => {
        values.forEach(v => {
          updateArray(group, v, allCategory);
        });
      });
    });
  });

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  const table = document.createElement("table");
  table.className = "workflow-table";

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Header
  const headerRow = document.createElement("tr");
  const titleTh = document.createElement("th");
  titleTh.textContent = "Title";
  headerRow.appendChild(titleTh);

  const categoryTh = document.createElement("th");
  categoryTh.textContent = "Tags";
  headerRow.appendChild(categoryTh);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  console.log(window.categoryMap)

  // Filter and render workflows
  Object.entries(window.categoryMap).forEach(([slug, data]) => {
    // Check if this workflow matches the filter criteria
    let matchesAllGroups = true;

    // Get all unique groups that have selections
    const groupsWithSelections = Object.keys(window.selectedCategory).filter(
      group => window.selectedCategory[group] && window.selectedCategory[group].size > 0
    );

    // For each group with selections, check if workflow has ALL selected category
    for (const group of groupsWithSelections) {
      const selectedForGroup = window.selectedCategory[group]; // This is a Set
      
      // Collect all category this workflow has for this group
      const workflowCategoryForGroup = new Set();
      data.forEach(categoryObj => {
        const category = categoryObj[group] || [];
        category.forEach(category => workflowCategoryForGroup.add(category));
      });

      // Check if workflow has ALL selected category for this group
      const hasAllCategory = [...selectedForGroup].every(selectedTerm => 
        workflowCategoryForGroup.has(selectedTerm)
      );

      if (!hasAllCategory) {
        matchesAllGroups = false;
        break;
      }
    }

    // Only render if matches all groups (or if no groups have selections)
    if (matchesAllGroups) {
      const row = document.createElement("tr");
      
      const titleTd = document.createElement("td");
      const titleLink = document.createElement("a");
      const title = [...window.titleMap[slug]][0];
      titleLink.href = `${window.baseUrl}/workflows/${slug}/index/`;
      titleLink.target = "_blank";
      titleLink.rel = "noopener noreferrer";  // Security best practice
      titleLink.textContent = title;
      titleTd.appendChild(titleLink);
      row.appendChild(titleTd);

      console.log(title)

      const categoryTd = document.createElement("td");
      // Collect all category from all data items for display
      const allWorkflowCategory = {};
      data.forEach(categoryObj => {
        Object.entries(categoryObj).forEach(([group, values]) => {
          if (!allWorkflowCategory[group]) {
            allWorkflowCategory[group] = new Set();
          }
          values.forEach(v => allWorkflowCategory[group].add(v));
        });
      });

      // Format category for display (group bolded, one category per line)
      Object.entries(allWorkflowCategory).forEach(([group, category]) => {
        const groupDiv = document.createElement("div");

        const groupLabel = document.createElement("strong");
        groupLabel.textContent = group + ":";
        groupDiv.appendChild(groupLabel);

        [...category].sort().forEach(category => {
          const categoryDiv = document.createElement("div");
          categoryDiv.textContent = category;
          groupDiv.appendChild(categoryDiv);
        });

        categoryTd.appendChild(groupDiv);
      });

      row.appendChild(categoryTd);

      tbody.appendChild(row);
    }
  });

  table.appendChild(tbody);
  container.appendChild(table);
}