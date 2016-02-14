$(function(){

    var config = {    
         sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
         interval: 200,  // number = milliseconds for onMouseOver polling interval    
         over: doOpen,   // function = onMouseOver callback (REQUIRED)    
         timeout: 200,   // number = milliseconds delay before onMouseOut    
         out: doClose    // function = onMouseOut callback (REQUIRED)    
    };
    
    function doOpen() {
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
    }
 
    function doClose() {
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    }

    $("ul.dropdown li").hoverIntent(config);
    
    $("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");

});


    <!--build:js js/homeScene.js-->
    <script src="js/homeScene.js"></script>
    <!-- endbuild -->


    <!--build:js css/style.css.js-->
    <script src="css/style.css"></script>
        <!-- endbuild -->


    <div tabindex="0" class="standardDropdown" id="resDropdown">
      <h1 id="currentRes"></h1>
      <ul class="dropdownList">
        <li id="1280x720">1280x720</li>
        <li id="1366x768">1366x768</li>
        <li id="1440x900">1440x900</li>
        <li id="1920x1080">1920x1080</li>
        <li id="1920x1200">1920x1200</li>
        <li id="2560x1440">2560x1440</li>
      </ul>
    </div>