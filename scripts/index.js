$(function () {
    $("#header-holder").load("../structs/header.html");
});
$(function () {
    $("#nav-holder").load("../structs/nav.html");
});
$(function () {
    $("#mobile-nav-holder").load("../structs/mobile-nav.html");
});
$(function () {
    $("#footer-holder").load("../structs/footer.html");
});
$(function () {
    $("#backtotop-holder").load("../structs/backtotop.html");
});


window.onload = overlay;

function overlay() {
    let overlay = document.getElementById("overlay")
    overlay.style.display = "none"
}