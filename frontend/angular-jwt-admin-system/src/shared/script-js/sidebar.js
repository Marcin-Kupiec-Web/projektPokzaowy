function sideBarSmallFunc() {   
    var sidebar = document.getElementById("mySidebar");
    var content = document.getElementById("contentMain");
    if (sidebar.className === "sidebar") {
      sidebar.className += " responsiveSidebar";
      content.className += " responsiveContent";
      
      document.getElementById("myTopnav").className = "topnav";  
    } else {
      sidebar.className = "sidebar";
      content.className = "content";     
}
/*
document.getElementById("myTopnav").className = "topnav";  
$("#mySidebar").animate({width:'toggle'},500);
*/
}