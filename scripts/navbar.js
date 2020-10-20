let scrolled = window.scrollY
    

if (scrolled < 50) {
    let navbar = document.getElementById('nav-holder')
    navbar.style.backgroundColor = "transparent"
    navbar.style.boxShadow = "none"
    
}
window.addEventListener('scroll', function () {
    scrolled = window.scrollY
    let navbar = document.getElementById('nav-holder')
    if (scrolled > 50) {
        navbar.style.backgroundColor = "var(--mainred)"
        navbar.style.boxShadow = "0 10px 20px -10px black"
    } else {
        navbar.style.backgroundColor = "transparent"
        navbar.style.boxShadow = "none"
    }
})