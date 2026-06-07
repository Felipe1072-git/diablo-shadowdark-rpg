document.addEventListener("DOMContentLoaded", function () {
  // Busca h4 que contenham elemento com classe set-title, OU h4 com a classe diretamente
  var headings = document.querySelectorAll("h4.set-title, h4 .set-title");
  headings.forEach(function (el) {
    var h4 = el.closest("h4") || el;
    var sibling = h4.nextElementSibling;
    while (sibling) {
      if (sibling.tagName === "TABLE") {
        sibling.classList.add("set-table");
      }
      if (["H2", "H3", "H4"].includes(sibling.tagName)) break;
      sibling = sibling.nextElementSibling;
    }
  });
});
