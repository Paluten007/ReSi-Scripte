// ==UserScript==
// @name         [DEV] ReSi: MapTools Autoupdate
// @version      0.1
// @description  Mehr Map Optionen
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/map
// @grant        none
// ==/UserScript==
(function() {
  $.getScript("https://cdn.jsdelivr.net/gh/jjimenezshaw/Leaflet.Control.Layers.Tree/L.Control.Layers.Tree.js", function() {
    $("head").append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jjimenezshaw/Leaflet.Control.Layers.Tree/L.Control.Layers.Tree.css"/>');
    mymap.createPane('semitransparent');
    mymap.getPane('semitransparent').style.opacity = '0.2';
    var missions = [];
    var departments = [];
    var vehiclesArr = [];
    var routes = [];
    var overlaysTree = {
      label: 'Anzeigen',
      selectAllCheckbox: 'Un/select all',
      children: [{
        label: 'Einsätze',
      }, {
        label: 'Wachen',
      }, {
        label: 'Einsatzradius',
        selectAllCheckbox: true,
        children: [{}],
      }, {
        label: 'Fahrzeuge',
      }, {
        label: 'Fahrzeugrouten',
      }],
    };
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
          overlaysTree["children"][2]["children"].push({
            layer: circle = L.circle([lat, lng], {
              weight: 0,
              fillColor: '#696969',
              fillOpacity: 1,
              radius: 3000,
              renderer: canvasRenderer
            }),
            label: tooltip,
          });

        } else if (layer.options.url.indexOf("mission") != -1) {

          missions.push(eval(layer.options.url.replace("?id=", "")));
        } else if (layer.options.url.indexOf("vehicle") != -1) {
          vehiclesArr.push(vehicles[layer.options.url.replace("?id=", "")]);
        }
      } else if (layer.options && layer.options.pane === "overlayPane") {
        if (layer.options.id !== undefined) {
          routes.push(pathlines["pathline_" + layer.options.id]);
        }
      }
    });
    var departmentsGroup = L.layerGroup(departments);
    var missionsGroup = L.layerGroup(missions);
    var vehiclesGroup = L.layerGroup(vehiclesArr);
    var routesGroup = L.layerGroup(routes);
    overlaysTree["children"][0]["layer"] = missionsGroup;
    overlaysTree["children"][1]["layer"] = departmentsGroup;
    overlaysTree["children"][3]["layer"] = vehiclesGroup;
    overlaysTree["children"][4]["layer"] = routesGroup;
    console.log(overlaysTree);
    var baseTree = {
      label: 'Karte',
      layer: daymode

    };

    L.control.layers.tree(baseTree, overlaysTree).addTo(mymap);
    mymap.on('zoomend', function() {
      if (mymap.getZoom() <= 14) {
        mymap.getPane('semitransparent').style.opacity = '0.2';
      } else if (mymap.getZoom() == 13) {
        mymap.getPane('semitransparent').style.opacity = '0.15';
      } else if (mymap.getZoom() > 13) {
        mymap.getPane('semitransparent').style.opacity = '0.1';
      }
    });
    $($("input.leaflet-control-layers-selector")).each(function(index) {
      var text = $(this).next().text();
      if (text == "Wachen" || text == "Einsätze" || text == "Fahrzeuge" || text == "Fahrzeugrouten") {
        $(this).click();
      }
    });
  });
})();
