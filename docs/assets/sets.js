document.addEventListener("DOMContentLoaded", function () {

  // --- Tabelas de set (h4 com .set-title) ---
  document.querySelectorAll("h4.set-title, h4 .set-title").forEach(function (el) {
    var h4 = el.closest("h4") || el;
    findNextTables(h4, ["H2", "H3", "H4"]).forEach(function (t) {
      t.classList.add("set-table");
    });
  });

  // --- Tabela de únicos (h2 com .unique-title) ---
  document.querySelectorAll("h2.unique-title, h2 .unique-title").forEach(function (el) {
    var h2 = el.closest("h2") || el;
    findNextTables(h2, ["H2"]).forEach(function (t) {
      t.classList.add("unique-table");
    });
  });

  // --- Tabelas de classe ---
  document.querySelectorAll("h3").forEach(function (h3) {
    var text = h3.textContent || "";
    var tables = findNextTables(h3, ["H2", "H3"]);
    if (tables.length === 0) return;

    if (text.includes("Talentos")) {
      tables[0].classList.add("talent-table");
      // Destaca a linha 19 (ultimate)
      var rows = tables[0].querySelectorAll("tbody tr");
      rows.forEach(function (row) {
        var cell = row.querySelector("td");
        if (cell && cell.textContent.trim().startsWith("19")) {
          row.classList.add("ultimate-row");
        }
      });
    } else if (text.includes("Objetivos")) {
      tables[0].classList.add("objective-table");
    }
  });

  // Utilitário: percorre irmãos e retorna tabelas encontradas
  function findNextTables(heading, stopTags) {
    var tables = [];
    var el = heading.nextElementSibling;
    while (el) {
      if (stopTags.includes(el.tagName)) break;
      var table = el.tagName === "TABLE" ? el : el.querySelector("table");
      if (table) tables.push(table);
      el = el.nextElementSibling;
    }
    return tables;
  }
});
