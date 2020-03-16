// ==UserScript==
// @name         ReSi: MapTools
// @version      0.1
// @description  Mehr Map Optionen
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/map
// @grant        none
// ==/UserScript==

(function() {

    mymap.createPane('semitransparent');
    mymap.getPane('semitransparent').style.opacity = '0.2';
    var departments = [];
    var missions = [];
    var borderGroup = L.layerGroup();
    var canvasRenderer = L.canvas({
        pane: 'semitransparent'
    });
    mymap.eachLayer(function(layer) {
        if (layer.options && layer.options.pane === "markerPane") {
            if (layer.options.url.indexOf("department") != -1) {
                var lat = layer._latlng.lat;
                var lng = layer._latlng.lng;
                var tooltip = layer._tooltip._content;
                departments.push(eval(layer.options.url.replace("?id=", "")));
                var circle = L.circle([lat, lng], {
                    //color: '#000000',
                    weight: 0,
                    fillColor: 'red',
                    fillOpacity: 1,
                    radius: 3000,
                    renderer: canvasRenderer
                }).bindTooltip("Feuer-  und Rettungswache 1").addTo(borderGroup).addTo(mymap);
            } else if (layer.options.url.indexOf("mission") != -1) {
                missions.push(eval(layer.options.url.replace("?id=", "")));
            }

        }
    });
    var departmentsGroup = L.layerGroup(departments);
    var missionsGroup = L.layerGroup(missions);
    var baseMaps = {
        "Karte": daymode,
    };

    var overlayMaps = {
        "Wachen": departmentsGroup,
        "Einsätze": missionsGroup,
        "Einsatzgebiet": borderGroup
    };
    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
    mymap.on('zoomend', function() {
        if (mymap.getZoom() <= 14) {
            mymap.getPane('semitransparent').style.opacity = '0.2';
        } else if (mymap.getZoom() == 13) {
            mymap.getPane('semitransparent').style.opacity = '0.1';
        } else if (mymap.getZoom() > 13) {
            mymap.getPane('semitransparent').style.opacity = '0.05';
        }
    });
})();
