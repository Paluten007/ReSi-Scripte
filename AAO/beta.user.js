// ==UserScript==
// @name         ReSi: AAO
// @version      BETA 0.1
// @description  Alarm- und Ausrückeordnung für den ReSi
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/alarming-choose-vehicles?missionid=*
// @grant        none
// ==/UserScript==
(function() {
  'use strict';
  const aao = [{
    name: "Löschzug",
    vehicles: {
      lf: 2,
      dlk: 1,
      elw: 1
    }
  }, {
    name: "LF",
    vehicles: {
      lf: 1,
    }
  }, {
    name: "ELW",
    vehicles: {
      elw: 1
    }
  }, {
    name: "DLK",
    vehicles: {
      dlk: 1
    }
  }, ];
  // AB HIER NICHTS ÄNDERN!
  $("head").append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"><style>
#aao{
  width: 100%;
  margin-bottom: 20px;
}
.aao_element {
  border: none;
  color: white;
  background: none;
  cursor: pointer;
  display: inline-block;
  margin: 3px 0;
  font-weight: bold;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.2s;
  padding: 15px 40px 15px 70px;
}
.aao_element:before {
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 2.5;
  font-size: 140%;
  width: 45px;
  background: rgba(0,0,0,0.05);
}
.aao_element:active{
      top: 2px;
}
.aao_element.aao_fail:before {
    font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\\f06a";
  }
  .aao_element.aao_success:before {
      font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\\f058";
    }
.aao_title {
    width: 100%;
    background: #D93636;
    color: white;
    padding: 20px 0px;
    text-align: center;
}
.aao_element.aao_fail {
  background: #D93636;
}.aao_element.aao_fail:hover {
  background: #BF3030;
}.aao_element.aao_fail:active {
  background: #A62929;
}
.aao_element.aao_success {
  background: #30BF97;
}.aao_element.aao_success:hover {
  background: #29A683;
}.aao_element.aao_success:active {
  background: #238C6E;
}</style>`);
  $('form .box_single:eq(1)').after('<div id="aao"><div class="aao_title">Alarm- und Ausrückeordnung</div></div>');
  const vehicles = {
    "HLF 20": "lf",
    "HLF 10": "lf",
    "LF 16-TS": "lf",
    "LF 10": "lf",
    "LF 10 KatS": "lf",
    "LF 20": "lf",
    "LF 20 KatS": "lf",
    "LF 20/16": "lf",
    "LF 24": "lf",
    "LF 8": "lf",
    "LF 8/6": "lf",
    "LF 16-12": "lf",
    "LF 16/12": "lf",
    "TLF 16/24 Tr": "lf",
    "TLF 16/25": "lf",
    "TLF 16/45": "lf",
    "TLF 20/40": "lf",
    "TLF 20/40 SL": "lf",
    "TLF 2000": "lf",
    "TLF 24/50": "lf",
    "TLF 3000": "lf",
    "TLF 4000": "lf",
    "TLF 8/18": "lf",
    "TLF 8/8": "lf",
    "TroTLF ": "lf",
    "DLK 23/12": "dlk",
    "MTW": "mtw",
    "ELW": "elw",
    "KdoW": "elw",
    "RW": "rw",
  };
  var availableFhz = {};
  $.each(vehicles, function(index, el) {
      availableFhz[el] = 0;
    }),
    $(".alarming-window-vehicles").find("td:eq(3)").each(function(el, i) {
      var name = vehicles[$(i).text().replace(/[\n\r]+|[\s]{2,}/g, '')];
      availableFhz[name]++;
    });
  $.each(aao, function(index, el) {
    var available = true;
    $.each(el["vehicles"], function(fhz, c) {
      if (availableFhz[fhz] < c) {
        available = false;
        return false;
      }
    });
    if (available) {
      $("#aao").append('<button class="aao_element aao_success" aao_id="' + index + '">' + el["name"] + '</button> ');
    } else {
      $("#aao").append('<button class="aao_element aao_fail" aao_id="' + index + '">' + el["name"] + '</button> ');
    }
  });
  $(".aao_element").click(function(event) {
    event.preventDefault();
    var aao_vehicles = JSON.parse(JSON.stringify(aao[$(this).attr("aao_id")]["vehicles"]));
    $(".alarming-window-vehicles").find("td:eq(3)").each(function(el, i) {
      var name = vehicles[$(i).text().replace(/[\n\r]+|[\s]{2,}/g, '')];
      if (aao_vehicles[name] != null && aao_vehicles[name] > 0) {
        if ($(i).siblings().find("input").prop('checked') == false) {
          $(i).siblings().find("input").click();
          aao_vehicles[name]--;
        }
      }
    });
  });
})();
