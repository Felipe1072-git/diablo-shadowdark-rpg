document.addEventListener("DOMContentLoaded", function () {
  var headings = document.querySelectorAll("h4.set-title, h4 .set-title");
  headings.forEach(function (el) {
    var h4 = el.closest("h4") || el;
    var sibling = h4.nextElementSibling;
    while (sibling) {
      if (["H2", "H3", "H4"].includes(sibling.tagName)) break;
      // MkDocs Material envolve tables em divs wrapper
      var table = sibling.tagName === "TABLE"
        ? sibling
        : sibling.querySelector("table");
      if (table) {
        table.classList.add("set-table");
      }
      sibling = sibling.nextElementSibling;
    }
  });
});
