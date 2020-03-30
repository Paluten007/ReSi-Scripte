// ==UserScript==
// @name         ReSi: DarkMap
// @version      0.1
// @description  Dunklere Karte
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/map
// @updateURL    https://github.com/DispoOhnePlan/ReSi-Scripte/raw/master/DarMap/index.user.js
// @grant        none
// ==/UserScript==
(function() {
  'use strict';
  // ================
  const dependingTime = true; // (true|false) zeitabhängig oder permanent
  const start = 22; // Beginn der DarMap in Stunden
  const end = 6; // Ende der DarMap in Stunden
  // ================
  function check() {
    var time = new Date();
    var h = time.getHours();
    if (h >= start && h < end) {
        if($("#darkmap").length == 0){
            $("head").append("<style id='darkmap'>.leaflet-tile {-webkit-filter: invert(1) grayscale(.7);filter: invert(1) grayscale(.7);}</style>");
        }
    }else{
        if($("#darkmap").length){
            $("#darkmap").remove();
        }
    }
  }
  var time = new Date();
  var h = time.getHours();
  if (dependingTime) {
    check();
    setInterval(function() {
      check();
    }, 60 * 1000 * 5);
  } else {
    $("head").append("<style>.leaflet-tile {-webkit-filter: invert(1) grayscale(.7);filter: invert(1) grayscale(.7);}</style>");
  }
})();
