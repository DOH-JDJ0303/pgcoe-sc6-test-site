---
title: Guide Selection Tool
layout: page
nav_order: 2
---

<style>
#filterTables {
  display: flex;
  gap: 2em;
  align-items: flex-start;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Container for filter buttons */
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  max-width: 250px;
}

.filter-group h3 {
  margin-bottom: 0.5em;
  color: #007acc;
  user-select: none;
}

/* Filter buttons styling */
.filter-group button {
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #f5f8fa;
  color: #333;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  text-align: center;
  width: 100%;
}

.filter-group button:hover {
  background-color: #e1efff;
  color: #005aab;
}

.filter-group button.active {
  background-color: #007acc;
  color: #fff;
  border-color: #005fa3;
  box-shadow: 0 0 8px rgba(0, 122, 204, 0.6);
}

/* Pages result table */
#resultsTable {
  border-collapse: collapse;
  width: 100%;
  max-width: 700px;
  margin-top: 1.5em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

/* #resultsTable thead {
  background-color: #007acc;
  color: white;
  user-select: none;
} */

#resultsTable th, #resultsTable td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

#resultsTable tbody tr:hover {
  background-color: #e6f0ff;
}

#resultsTable a {
  color: #007acc;
  font-weight: 600;
  text-decoration: none;
}

#resultsTable a:hover {
  text-decoration: underline;
}

/* Hide organism filter until outbreak selected */
#organismFilter {
  display: none;
}
</style>

<div id="filterTables">
  <div id="outbreakFilter" class="filter-group">
    <h3>Outbreak</h3>
    <!-- buttons added by JS -->
  </div>
  <div id="organismFilter" class="filter-group">
    <h3>Organism</h3>
    <!-- buttons added by JS -->
  </div>
</div>

<table id="resultsTable">
  <thead>
    <tr>
      <th>Title</th>
      <th>Outbreak</th>
      <th>Organism</th>
    </tr>
  </thead>
  <tbody id="resultsBody"></tbody>
</table>

<ul id="pageList" style="display:none;">
  {% for page in site.pages %}
    {% if page.outbreak contains "determined" or page.outbreak contains "undetermined" %}
      <li
        data-title="{{ page.title | escape }}"
        data-url="{{ page.url }}"
        data-outbreak="{{ page.outbreak | join: ',' | downcase }}"
        data-organism="{{ page.organism | join: ',' | downcase }}">
        {{ page.title }}
      </li>
    {% endif %}
  {% endfor %}
</ul>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const pageItems = [...document.querySelectorAll('#pageList li')];

  const outbreakFilter = document.getElementById('outbreakFilter');
  const organismFilter = document.getElementById('organismFilter');
  const resultsBody = document.getElementById('resultsBody');

  let selectedOutbreak = null;
  let selectedOrganism = null;

  const outbreakSet = new Set();
  pageItems.forEach(item => {
    item.dataset.outbreak.split(',').forEach(o => outbreakSet.add(o.trim()));
  });
  const outbreaks = [...outbreakSet].sort();

  outbreaks.forEach(outbreak => {
    const btn = document.createElement('button');
    btn.textContent = outbreak.charAt(0).toUpperCase() + outbreak.slice(1);
    btn.dataset.outbreak = outbreak;
    btn.addEventListener('click', () => {
      if (selectedOutbreak === outbreak) {
        selectedOutbreak = null;
        selectedOrganism = null;
        clearActiveButtons(outbreakFilter);
        clearActiveButtons(organismFilter);
        organismFilter.style.display = 'none';
      } else {
        selectedOutbreak = outbreak;
        selectedOrganism = null;
        setActiveButton(outbreakFilter, outbreak);
        organismFilter.style.display = 'flex';
        populateOrganisms();
      }
      filterResults();
    });
    outbreakFilter.appendChild(btn);
  });

  function clearActiveButtons(container) {
    container.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  }

  function setActiveButton(container, value) {
    clearActiveButtons(container);
    const btn = container.querySelector(`button[data-outbreak="${value}"], button[data-organism="${value}"]`);
    if (btn) btn.classList.add('active');
  }

  function populateOrganisms() {
    const organismsSet = new Set();
    pageItems.forEach(item => {
      if (item.dataset.outbreak.split(',').map(o => o.trim()).includes(selectedOutbreak)) {
        item.dataset.organism.split(',').forEach(org => organismsSet.add(org.trim()));
      }
    });
    const organisms = [...organismsSet].sort();

    organismFilter.innerHTML = '<h3>Organism</h3>'; 

    organisms.forEach(org => {
      const btn = document.createElement('button');
      btn.textContent = org.charAt(0).toUpperCase() + org.slice(1);
      btn.dataset.organism = org;
      btn.addEventListener('click', () => {
        if (selectedOrganism === org) {
          selectedOrganism = null;
          clearActiveButtons(organismFilter);
        } else {
          selectedOrganism = org;
          setActiveButton(organismFilter, org);
        }
        filterResults();
      });
      organismFilter.appendChild(btn);
    });
  }

  function filterResults() {
    resultsBody.innerHTML = '';

    const filteredPages = pageItems.filter(item => {
      const outbreaks = item.dataset.outbreak.split(',').map(o => o.trim());
      const organisms = item.dataset.organism.split(',').map(o => o.trim());

      if (selectedOutbreak && selectedOrganism) {
        return outbreaks.includes(selectedOutbreak) && organisms.includes(selectedOrganism);
      } else if (selectedOutbreak) {
        return outbreaks.includes(selectedOutbreak);
      } else {
        return true;
      }
    });

    if (filteredPages.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 3;
      td.style.textAlign = 'center';
      td.textContent = 'No results found.';
      tr.appendChild(td);
      resultsBody.appendChild(tr);
      return;
    }

    filteredPages.forEach(item => {
      const tr = document.createElement('tr');

      const titleTd = document.createElement('td');
      const link = document.createElement('a');
      link.href = item.dataset.url;
      link.textContent = item.dataset.title;
      titleTd.appendChild(link);

      const outbreakTd = document.createElement('td');
      outbreakTd.textContent = item.dataset.outbreak;

      const organismTd = document.createElement('td');
      organismTd.textContent = item.dataset.organism;

      tr.appendChild(titleTd);
      tr.appendChild(outbreakTd);
      tr.appendChild(organismTd);

      resultsBody.appendChild(tr);
    });
  }

  filterResults();
});
</script>
