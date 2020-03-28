// ==UserScript==
// @name         ReSi: Fahrzeuggrafiken ersetzen
// @version      0.1
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/map
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
    "8": [ // Fahrzeug ID
      "90px", //Höhe
      "105px", // Breite
      "https://cdn.discordapp.com/attachments/689200017696882877/693441309230235688/grafik.png", // Bild normal
      "https://cdn.discordapp.com/attachments/689200017696882877/693441309230235688/grafik.png", // Bild SoSi
    ]
  };
  update();
  setInterval(function() {
    update()
  }, 20 * 1000);

})();
