// ==UserScript==
// @name         ReSi Züge
// @namespace    https://github.com/DispoOhnePlan/ReSi-Scripte
// @version      BETA 0.1
// @description  Züge für den Resi
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/Z%C3%BCge
// @match        https://rettungssimulator.online/vehicle?id=*
// @match        https://rettungssimulator.online/Zug-*
// @match        https://rettungssimulator.online/alarming-choose-vehicles?missionid=*
// @grant        none
// ==/UserScript==
(function() {
	'use strict';

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}
	if(window.location.href.indexOf("online/Zug-") != -1) {
		$("head").append("<style>.box_single_content_vehicles_shortname{float: none !important;display: block !important;}</style>");
		$("body").html(`<div class="box_all_headline_border">
      <div class="box_all_headline">Zug bearbeiten</div>
    </div>
    <div id="zug-edit">

    </div>`);
		const vehicles = JSON.parse(localStorage.getItem("resi_zuege_vehicles"));
		const buildingVehicles = JSON.parse(localStorage.getItem("resi_zuege_buildingVehicles"));
		const buildingName = JSON.parse(localStorage.getItem("resi_zuege_buildingName"));
		var zuege = JSON.parse(localStorage.getItem("resi_zuege"));
		if(vehicles == null || buildingVehicles == null || zuege == null) {
			alert("Es ist ein Fehler aufgetreten: missig data");
		} else {
			var zug;
			var key;
			$.each(zuege, function(name, attr) {
				if(attr[1] == window.location.href.replace("https://rettungssimulator.online/Zug-", "")) {
					zug = attr;
					key = name;
				}
			});
			if(zug == undefined || zug == undefined) {
				alert("Es ist ein Fehler aufgetreten: zug not exists");
			} else {
				var res = "";
				$("#zug-edit").append("<h1>" + key + "</h1><hr>");
				$.each(buildingVehicles, function(buildingId, vehicleslist) {
					res += `<div class="box_single border_feuerwehr">
					<div class="box_single_headline background_feuerwehr">` + buildingName[buildingId] + `</div>
				<div class="box_single_content_all">`;
					$.each(vehicleslist, function(i, vehicleId) {
						res += `<li class="box_single_content_single">
								<input type="checkbox" class="zug_checkbox" id="zug_check_` + vehicleId + `"></input><span class="box_single_content_vehicles_name">` + vehicles[vehicleId][0] + `</span>
								<span class="box_single_content_vehicles_shortname">` + vehicles[vehicleId][1] + `</span></li>`;
					});
					res += "</div></div>";
				});
				$("#zug-edit").append(res);
				$.each(zug[0], function(i, vehicleId) {
					$("#zug_check_" + vehicleId).prop('checked', true);
				});
				$(document).on("click", ".zug_checkbox", function() {
					if(getKeyByValue(zug[0], $(this).attr("id").replace("zug_check_", "")) == undefined) {
						zug[0].push($(this).attr("id").replace("zug_check_", ""));
						console.log(zug);
					} else {
						zug[0].splice(getKeyByValue(zug[0], $(this).attr("id").replace("zug_check_", "")), 1);
						console.log(zug);
					}
					zuege[key] = zug;
					localStorage.setItem("resi_zuege", JSON.stringify(zuege));
				});
			}
		}
	} else if(window.location.href.indexOf("online/Z%C3%BCge") != -1) {
		$("head").append("<style>.box_single_content_vehicles_shortname{float: none !important;display: block !important;}.box_single_headline a,.box_single_headline a:hover{color:white!important;}</style>");
		$("body").append("<div id='zuege_cache' style='display:none'></div>");
		var vehicles = {};
		var buildingVehicles = {};
		var buildingName = {};
		$("#zuege_cache").load("https://rettungssimulator.online/start# div#department_list_departments", function() {
			$("#department_list_departments li").each(function(i, e) {
				var buildingId = $(e).parents(".box_single").attr("id").replace("department_", "");
				var vehicleId = $(e).attr("id").replace("vehicleid_", "");
				if(buildingVehicles[buildingId] == undefined) {
					buildingVehicles[buildingId] = [];
				}
				buildingName[buildingId] = $(e).parents(".box_single").find(".box_single_headline").text().replace(/[\n\r]+|[\s]{2,}/g, '');
				buildingVehicles[buildingId].push(vehicleId);
				vehicles[vehicleId] = [$(e).find(".box_single_content_vehicles_name").text().replace(/[\n\r]+|[\s]{2,}/g, ''), $(e).find(".box_single_content_vehicles_shortname").text().replace(/[\n\r]+|[\s]{2,}/g, '')];
			});
			var zuege;
			if(localStorage.getItem("resi_zuege") == undefined) {
				zuege = {};
			} else {
				zuege = JSON.parse(localStorage.getItem("resi_zuege"));
			}

			$("body").html(`<div class="box_all_headline_border"><div class="box_all_headline">Züge <span class="status s2" style="float:right" id="zug_add"><i class="fas fa-plus-circle"></i></span></div></div><div id="zuege"></div>`);
			$.each(zuege, function(name, attr) {
				var fhzHtml = "";
				$.each(attr[0], function(i, id) {
					fhzHtml += `<li class="box_single_content_single">
          <span class="box_single_content_vehicles_name">` + vehicles[id][0] + `</span>
          <span class="box_single_content_vehicles_shortname">` + vehicles[id][1] + `</span>
      </li>`;
				});
				$("#zuege").append(`<div class="box_single border_feuerwehr" id="department_764">
          <div class="box_single_headline background_feuerwehr"><a href="Zug-` + attr[1] + `">` + name + `</a><span class="status s3" style="float:right" id="zug_modify" zug-name="` + name + `"><i class="fas fa-edit"></i></span> <span class="status s4" style="float:right" id="zug_delete" zug-name="` + name + `"><i class="fas fa-trash-alt"></i></span></div>
          <div class="box_single_content_all">` + fhzHtml + `</div></div>`);
			});
			$(document).on("click", "#zug_delete", function() {
				var name = $(this).attr("zug-name");
				delete zuege[name];
				localStorage.setItem("resi_zuege", JSON.stringify(zuege));
				location.reload();
			});
			$(document).on("click", "#zug_modify", function() {
				event.preventDefault();
				var name = $(this).attr("zug-name");
				var newName = prompt("Neuer Name für " + name);
				var zug = zuege[name];
				delete zuege[name];
				localStorage.setItem("resi_zuege", JSON.stringify(zuege));
				location.reload();
			});
			$(document).on("click", "#zug_add", function() {
				var id = 0;
				$.each(zuege, function(name, attr) {
					if(parseInt(attr[1]) > id) {
						id = parseInt(attr[1]);
					}
				});
				var name = prompt("Name des Zuges");
				zuege[name] = [
					[], id + 1
				];
				localStorage.setItem("resi_zuege", JSON.stringify(zuege));
				location.href = "Zug-" + (id + 1);
			});
			localStorage.setItem("resi_zuege", JSON.stringify(zuege));
			localStorage.setItem("resi_zuege_vehicles", JSON.stringify(vehicles));
			localStorage.setItem("resi_zuege_buildingVehicles", JSON.stringify(buildingVehicles));
			localStorage.setItem("resi_zuege_buildingName", JSON.stringify(buildingName));
		});
	} else if(window.location.href.indexOf("online/vehicle?id=") != -1) {
		$(`<div class="box_single border_feuerwehr" id="zuege_fhz">
            <div class="box_single_headline background_feuerwehr">
                Züge
            </div>
<div class="box_single_content_all"></div>
        </div>`).insertAfter($("#hv-center .box_all .box_single ").first());
		if(localStorage.getItem("resi_zuege") != null) {
			const vehicleId = location.href.replace("https://rettungssimulator.online/vehicle?id=", "");
			var c = 0;
			$.each(JSON.parse(localStorage.getItem("resi_zuege")), function(name, attr) {
				$.each(attr[0], function(i, fhzId) {
					if(vehicleId == fhzId) {
						c++;
						$("#zuege_fhz .box_single_content_all").first().append('<div class="box_single_content_single"><span class="status s2">' + name + '</span></div>');
					}
				});
			});
			if(c == 0) {
				$("#zuege_fhz .box_single_content_all").append('<div class="box_single_content_single"><span class="status s4">keine Züge</span></div>');
			}
		}
	} else if(window.location.href.indexOf("online/alarming-choose-vehicles?missionid=") != -1) {
		$("head").append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"><style><style>
#zuege{
  width: 100%;
  margin-bottom: 20px;
}
.zug_element {
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
.zug_element:before {
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
.zug_element:active{
      top: 2px;
}
.zug_element.zug_fail:before {
    font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\\f06a";
  }
  .zug_element.zug_success:before {
      font-family: "Font Awesome 5 Free"; font-weight: 900; content: "\\f058";
    }
.zuege_title {
    width: 100%;
    background: #D93636;
    color: white;
    padding: 20px 0px;
    text-align: center;
}
.zug_element.zug_fail {
  background: #D93636;
}.zug_element.zug_fail:hover {
  background: #BF3030;
}.zug_element.zug_fail:active {
  background: #A62929;
}
.zug_element.zug_success {
  background: #30BF97;
}.zug_element.zug_success:hover {
  background: #29A683;
}.zug_element.zug_success:active {
  background: #238C6E;
}</style>`);
		$('form .box_single:eq(1)').after('<div id="zuege"><div class="zuege_title">Züge</div></div>');
		if(localStorage.getItem("resi_zuege_vehicles") == undefined) {
			$("#zuege").append("<br/><span class='status s4'>Fehler! Es fehlen Daten (vehicles)</span><br/>");
		} else if(localStorage.getItem("resi_zuege") != undefined) {
			const vehicles = JSON.parse(localStorage.getItem("resi_zuege_vehicles"));
			const zuege = JSON.parse(localStorage.getItem("resi_zuege"));
			$.each(zuege, function(name, attr) {
				var available = true;
				$.each(attr[0], function(i, vehicleId) {
					if($("#cbVehicle_" + vehicleId).length == 0) {
						available = false;
					}
				});
				$("#zuege").append('<button class="zug_element ' + (available == true ? "zug_success" : "zug_fail") + '" zug_name="' + name + '">' + name + '</button>');
			});
			$(document).on("click", ".zug_element", function() {
				event.preventDefault();
				var zugName = $(this).attr("zug_name")
				var zug = zuege[zugName];
				var errorFhz = "";
				$.each(zug[0], function(i, vehicleId) {
					if($("#cbVehicle_" + vehicleId).length == 0 || $("#cbVehicle_" + vehicleId).prop('checked')) {
						errorFhz += vehicles[vehicleId][0] + " " + vehicles[vehicleId][1] + " ";
					} else {
						$("#cbVehicle_" + vehicleId).click();
					}
				});
				if(errorFhz != "") {
					alert("Fehler!\nEs konnten nicht alle Fahrzeuge ausgewählt werden:\n\n" + errorFhz);
				}
			});
		} else {
			$("#zuege").append("<br/><span class='status s4'>keine Züge vorhanden</span><br/>");
		}
	}
})();
