document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("h4.set-title").forEach(function (h4) {
    var el = h4.nextElementSibling;
    while (el) {
      if (el.tagName === "TABLE") {
        el.classList.add("set-table");
      }
      if (el.tagName === "H4" || el.tagName === "H3" || el.tagName === "H2") break;
      el = el.nextElementSibling;
    }
  });
});
