function topNavSmallFunc() {
    var content = document.getElementById("contentMain");
    var x = document.getElementById("myTopnav");

    if (x.className === "topnav") {
      x.className += " responsive";
        document.getElementById("mySidebar").className = "sidebar";
        content.className = "content";
        content.style.marginTop = "0px"
    } else {
      x.className = "topnav";
      content.style.marginTop = "49px"
    }
}
window.addEventListener('resize', function() {
  if (window.innerWidth > 600) {
    document.getElementById("myTopnav").className = "topnav";
    document.getElementById("contentMain").style.marginTop = "49px"
  }
});
