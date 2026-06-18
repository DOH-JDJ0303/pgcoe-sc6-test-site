/* ============================================================
   Workflow search table
   - Table markup is rendered server-side by Jekyll (build.html)
   - DataTables provides pagination, sorting, and global search
   - Facet buttons filter on each row's data-category attribute
   ============================================================ */

(function () {
  "use strict";

  var TABLE_SELECTOR = "#workflow-table";
  var FACET_SELECTOR = "#search-facets";
  var CLEAR_SELECTOR = "#search-clear";

  /* Read and cache the {group: [values]} object stored on a row. */
  function rowCategory(tr) {
    if (tr._category) return tr._category;
    var cat = {};
    try {
      cat = JSON.parse(tr.getAttribute("data-category") || "{}");
    } catch (e) {
      cat = {};
    }
    tr._category = cat;
    return cat;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var tableEl = document.querySelector(TABLE_SELECTOR);
    var facetEl = document.querySelector(FACET_SELECTOR);
    var clearEl = document.querySelector(CLEAR_SELECTOR);
    if (!tableEl || !facetEl) return;

    // selected = { group: Set(values) }. A row passes when, for every group
    // with selections, the row contains all of that group's selected values.
    var selected = {};

    /* ---- Collect every group/value present in the table ---- */
    var groups = {}; // group -> Set(values)
    tableEl.querySelectorAll("tbody tr").forEach(function (tr) {
      var cat = rowCategory(tr);
      Object.keys(cat).forEach(function (group) {
        if (!groups[group]) groups[group] = new Set();
        (cat[group] || []).forEach(function (v) {
          groups[group].add(v);
        });
      });
    });

    /* ---- DataTables custom filter (runs on every draw) ---- */
    DataTable.ext.search.push(function (settings, data, dataIndex) {
      if (settings.nTable.id !== "workflow-table") return true;

      var activeGroups = Object.keys(selected).filter(function (g) {
        return selected[g].size > 0;
      });
      if (activeGroups.length === 0) return true;

      var tr = settings.aoData[dataIndex].nTr;
      var cat = rowCategory(tr);

      return activeGroups.every(function (group) {
        var have = new Set(cat[group] || []);
        return Array.from(selected[group]).every(function (v) {
          return have.has(v);
        });
      });
    });

    /* ---- Initialise DataTables ---- */
    var table = new DataTable(TABLE_SELECTOR, {
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100],
      order: [[0, "asc"]],
      columnDefs: [{ targets: 1, orderable: false }], // Tags column
      language: {
        search: "",
        searchPlaceholder: "Search workflows\u2026",
        lengthMenu: "Show _MENU_",
        info: "_START_\u2013_END_ of _TOTAL_ workflows",
        infoFiltered: " (filtered from _MAX_)",
        infoEmpty: "No workflows",
        zeroRecords: "No workflows match these filters",
        emptyTable: "No workflows available",
        paginate: { previous: "\u2039", next: "\u203a" }
      }
    });

    /* ---- Clear-filters control ---- */
    function refreshClear() {
      if (!clearEl) return;
      var count = Object.keys(selected).reduce(function (n, g) {
        return n + selected[g].size;
      }, 0);
      clearEl.textContent = count ? "Clear filters (" + count + ")" : "Clear filters";
      clearEl.disabled = count === 0;
    }

    if (clearEl) {
      clearEl.addEventListener("click", function () {
        selected = {};
        facetEl.querySelectorAll(".facet-btn.active").forEach(function (b) {
          b.classList.remove("active");
        });
        refreshClear();
        table.draw();
      });
    }

    /* ---- Build the facet buttons ---- */
    Object.keys(groups).sort().forEach(function (group) {
      var groupEl = document.createElement("div");
      groupEl.className = "facet-group";

      var header = document.createElement("button");
      header.type = "button";
      header.className = "facet-toggle";
      header.setAttribute("aria-expanded", "false");
      header.textContent = group;

      var options = document.createElement("div");
      options.className = "facet-options";

      // Toggle only this group open/closed.
      header.addEventListener("click", function () {
        var open = groupEl.classList.toggle("open");
        header.setAttribute("aria-expanded", open ? "true" : "false");
      });

      Array.from(groups[group]).sort().forEach(function (value) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "facet-btn";
        btn.textContent = value;

        btn.addEventListener("click", function () {
          var on = btn.classList.toggle("active");
          if (!selected[group]) selected[group] = new Set();
          if (on) selected[group].add(value);
          else selected[group].delete(value);
          if (selected[group].size === 0) delete selected[group];
          refreshClear();
          table.draw();
        });

        options.appendChild(btn);
      });

      groupEl.appendChild(header);
      groupEl.appendChild(options);
      facetEl.appendChild(groupEl);
    });

    refreshClear();
  });
})();