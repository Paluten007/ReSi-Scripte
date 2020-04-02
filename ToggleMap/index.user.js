// ==UserScript==
// @name         ReSi: MapToggle
// @namespace    https://github.com/DispoOhnePlan/ReSi-Scripte
// @version      0.1
// @description  Map im Einsatzfenter ein- oder ausblenden
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/alarming-choose-vehicles?missionid=*
// @run          document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(localStorage.getItem("toggle_map") == null){
         localStorage.setItem("toggle_map", "fa-toggle-on");
    }else if(localStorage.getItem("toggle_map") == "fa-toggle-off"){
        $("#mapid").hide();
    }
    $("#mapid").siblings(".box_single_headline").append('<i class="fas '+localStorage.getItem("toggle_map")+' map_toggle" style="float:right; transition: 0.3s"></i>');
    $(document).on("click", $(".map_toggle"), function(){
        $(".map_toggle").toggleClass("fa-toggle-off").toggleClass("fa-toggle-on");
        $("#mapid").toggle("slow", function(){
         if($("#mapid").is(":hidden")){
            localStorage.setItem("toggle_map", "fa-toggle-off");
        }else{
            localStorage.setItem("toggle_map", "fa-toggle-on");
        }
        });
    });
})();
