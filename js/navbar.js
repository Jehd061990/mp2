$(document).ready(function () {
  $(".navbar-toggler").click(function () {
    // $(".navbar-bg").addClass("active");
    $(".navbar-bg").toggleClass("active");

    $(".top").toggleClass("active");
    $(".middle").toggleClass("active");
    $(".bottom").toggleClass("active");
  });
});
