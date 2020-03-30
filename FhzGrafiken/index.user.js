// ==UserScript==
// @name         ReSi: Fahrzeuggrafiken ersetzen
// @version      0.1
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/map
// @match        https://rettungssimulator.online/alarming-choose-vehicles?missionid=*
// @updateURL    https://github.com/DispoOhnePlan/ReSi-Scripte/raw/master/FhzGrafiken/index.user.js
// @grant        none
// ==/UserScript==
(function() {
  function update() {
    $.each(replace, function(k, v) {
      $("img[src='Bilder/vehicles/" + k + "/vehicle" + k + "_animation.png'").each(function(i, e) {
        $("img[src='Bilder/vehicles/8/vehicle8_animation.png'").attr("src", v[3]).css("hight", v[0]).css("width", v[1]);
      });
      $("img[src='Bilder/vehicles/" + k + "/vehicle" + k + "_normal.png'").each(function(i, e) {
        $("img[src='Bilder/vehicles/8/vehicle8_normal.png'").attr("src", v[2]).css("hight", v[0]).css("width", v[1]);
      });
    });
  }
  var replace = {
    "": [ // Fahrzeug ID
      "90px", //Höhe
      "105px", // Breite
      "", // Bild normal (URL)
      "", // Bild SoSi (URL)
    ]
  };
  update();
  setInterval(function() {
    update()
  }, 20 * 1000);

})();
