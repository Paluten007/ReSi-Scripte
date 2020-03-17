// ==UserScript==
// @name         ReSi: MapTools Autoupdate
// @version      0.1
// @description  Mehr Map Optionen
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/map
// @grant        none
// @updateURL    https://github.com/DispoOhnePlan/ReSi-Scripte/raw/master/MapTools/autoupdate.user.js
// ==/UserScript==

(function() {
    $.ajax({
        url: "https://raw.githubusercontent.com/DispoOhnePlan/ReSi-Scripte/master/MapTools/index.user.js",
        dataType: "text",
        success: function(data) {
            $("head").append('<script type="text/javascript">'+data+'</script>');
        }});
})();
