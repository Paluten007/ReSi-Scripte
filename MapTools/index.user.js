// ==UserScript==
// @name         ReSi: MapTools
// @version      0.1.1
// @description  Mehr Map Optionen
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/map
// @grant        none
// @updateURL    https://github.com/DispoOhnePlan/ReSi-Scripte/raw/master/MapTools/index.user.js
// ==/UserScript==

//(function() {

    mymap.createPane('semitransparent');
    mymap.getPane('semitransparent').style.opacity = '0.2';
    var departments = [];
    var missions = [];
    var routes = [];
    var vehiclesArr = [];
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
                    weight: 0,
                    fillColor: '#696969',
                    fillOpacity: 1,
                    radius: 3000,
                    renderer: canvasRenderer
                })/*.bindTooltip(layer._tooltip._content)*/.addTo(borderGroup).addTo(mymap);
            } else if (layer.options.url.indexOf("mission") != -1) {
                missions.push(eval(layer.options.url.replace("?id=", "")));
            } else if (layer.options.url.indexOf("vehicle") != -1) {
                vehiclesArr.push(vehicles[layer.options.url.replace("?id=", "")]);
            }
        }else if(layer.options && layer.options.pane === "overlayPane"){
            if(layer.options.id !== undefined){
                routes.push(pathlines["pathline_"+layer.options.id]);
            }
        }
    });
    var departmentsGroup = L.layerGroup(departments);
    var missionsGroup = L.layerGroup(missions);
    var vehiclesGroup = L.layerGroup(vehiclesArr);
    var routesGroup = L.layerGroup(routes);
    var baseMaps = {
        "Karte": daymode,
    };

    var overlayMaps = {
        "Wachen": departmentsGroup,
        "Einsätze": missionsGroup,
        "Einsatzgebiet": borderGroup,
        "Fahrzeuge": vehiclesGroup,
        "Fahrzeugrouten": routesGroup
    };
    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
    departmentsGroup.addTo(mymap);
    missionsGroup.addTo(mymap);
    vehiclesGroup.addTo(mymap);
    routesGroup.addTo(mymap);
    borderGroup.addTo(mymap);
    mymap.on('zoomend', function() {
        if (mymap.getZoom() <= 14) {
            mymap.getPane('semitransparent').style.opacity = '0.2';
        } else if (mymap.getZoom() == 13) {
            mymap.getPane('semitransparent').style.opacity = '0.15';
        } else if (mymap.getZoom() > 13) {
            mymap.getPane('semitransparent').style.opacity = '0.1';
        }
    });
//})();
