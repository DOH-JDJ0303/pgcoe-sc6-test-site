function renderTable(containerId = "workflow-table") {
  // Build allTerms from window.termMap
  const allTerms = {};
  Object.entries(window.termMap).forEach(([slug, data]) => {
    data.forEach(it => {
      Object.entries(it).forEach(([group, values]) => {
        values.forEach(v => {
          updateArray(group, v, allTerms);
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

  const termsTh = document.createElement("th");
  termsTh.textContent = "Tags";
  headerRow.appendChild(termsTh);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  console.log(window.termMap)

  // Filter and render workflows
  Object.entries(window.termMap).forEach(([slug, data]) => {
    // Check if this workflow matches the filter criteria
    let matchesAllGroups = true;

    // Get all unique groups that have selections
    const groupsWithSelections = Object.keys(window.selectedTerms).filter(
      group => window.selectedTerms[group] && window.selectedTerms[group].size > 0
    );

    // For each group with selections, check if workflow has ALL selected terms
    for (const group of groupsWithSelections) {
      const selectedForGroup = window.selectedTerms[group]; // This is a Set
      
      // Collect all terms this workflow has for this group
      const workflowTermsForGroup = new Set();
      data.forEach(termObj => {
        const terms = termObj[group] || [];
        terms.forEach(term => workflowTermsForGroup.add(term));
      });

      // Check if workflow has ALL selected terms for this group
      const hasAllTerms = [...selectedForGroup].every(selectedTerm => 
        workflowTermsForGroup.has(selectedTerm)
      );

      if (!hasAllTerms) {
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

      const termsTd = document.createElement("td");
      // Collect all terms from all data items for display
      const allWorkflowTerms = {};
      data.forEach(termObj => {
        Object.entries(termObj).forEach(([group, values]) => {
          if (!allWorkflowTerms[group]) {
            allWorkflowTerms[group] = new Set();
          }
          values.forEach(v => allWorkflowTerms[group].add(v));
        });
      });

      // Format terms for display (group bolded, one term per line)
      Object.entries(allWorkflowTerms).forEach(([group, terms]) => {
        const groupDiv = document.createElement("div");

        const groupLabel = document.createElement("strong");
        groupLabel.textContent = group + ":";
        groupDiv.appendChild(groupLabel);

        [...terms].sort().forEach(term => {
          const termDiv = document.createElement("div");
          termDiv.textContent = term;
          groupDiv.appendChild(termDiv);
        });

        termsTd.appendChild(groupDiv);
      });

      row.appendChild(termsTd);

      tbody.appendChild(row);
    }
  });

  table.appendChild(tbody);
  container.appendChild(table);
}