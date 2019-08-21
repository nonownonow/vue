// Minimalize menu
(function () {
  $(document).on("click", ".navbar-minimalize", function (event) {
    event.preventDefault();
    $('body').toggleClass('mini-navbar');
  });
})();
