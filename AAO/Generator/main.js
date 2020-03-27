const vehicles = {
  "lf": "Löschfahrzeug",
  "dlk": "Drehleiter",
  "elw": "Einsatzleitwagen",
  "mtw": "Mannschaftstransportwagen",
  "rw": "Rüstwagen"
};
const aao = parent.getAAO();

function option(fhz) {
  var option = "";
  $.each(vehicles, function(short, long) {
    if (short == fhz) {
      option += "<option selected value='" + short + "'>" + long + "</option>";
    } else {
      option += "<option  value='" + short + "'>" + long + "</option>";
    }
  });
  return option;
}
$.each(aao, function(index, el) {
  var res = '<div class="card"><ul class="list-group list-group-flush"><li class="list-group-item aao_editor_head"><input aao_id="' + index + '" type="text" class="input_nv" value="' + el["name"] + '"></input></li>'
  $.each(el["vehicles"], function(fhz, c) {
    res += '<li class="list-group-item" aao_id="' + index + '"><select class="aao_fhz_typ" aao_old_fhz="' + fhz + '">' + option(fhz) + '</select><span class="badge badge-primary badge-pill"><input aao_id="' + index + '" type="text" class="input_nv aao_fhz_value" value="' + c + '" aao_fhz="' + fhz + '"/></span><button type="button" class="btn btn-danger aao_btn aao_fhz_delete" aao_id="' + index + '" aao_fhz="' + fhz + '"><i class="far fa-trash-alt"></i></button></li>';
  });
  $("#container").append(res + '</ul><div class="card-footer"><button type="button" class="btn_aao btn btn-success aao_btn aao_fhz_add" aao_id="' + index + '"><i class="fas fa-plus"></i></button> <button type="button" class=" btn_aao btn btn-danger aao_btn aao_aao_delete" aao_id="' + index + '"><i class="far fa-trash-alt"></i></button></div></div>'); //el

});
$(document).on('change', '.aao_editor_head input', function(event) {
  event.preventDefault();
  aao[$(this).attr("aao_id")]["name"] = $(this).val();
});
$(document).on('change', '.aao_fhz_value', function(event) {
  event.preventDefault();
  aao[$(this).attr("aao_id")]["vehicles"][$(this).attr("aao_fhz")] = $(this).val();
});
$(document).on('change', '.aao_fhz_typ', function(event) {
  event.preventDefault();
  var aao_id = $(this).parent().attr("aao_id");
  if (aao[aao_id]["vehicles"][$(this).val()] === undefined) {
    if ($(this).attr("aao_old_fhz") !== $(this).val()) {
      aao[aao_id]["vehicles"][$(this).val()] = parseInt(aao[aao_id]["vehicles"][$(this).attr("aao_old_fhz")]);
      delete aao[aao_id]["vehicles"][$(this).attr("aao_old_fhz")];
      $(this).attr("aao_old_fhz", $(this).val());
    }
  } else {
    $(this).val($(this).attr("aao_old_fhz"));
    alert("Es kann das gleiche Fahrzeug nicht mehrfach angegeneben werden")
  }

});
$(document).on('click', '.aao_fhz_delete', function(event) {
  event.preventDefault();
  delete aao[$(this).attr("aao_id")]["vehicles"][$(this).attr("aao_fhz")];
  $(this).parent().remove();
});
$(document).on('click', '.aao_aao_delete', function(event) {
  delete aao[$(this).attr("aao_id")];
  $(this).parents(".card").remove();
});
$(document).on('click', '.aao_fhz_add', function(event) {
  console.log("click");
  var fhz = false;
  var element = $(this);
  $.each(vehicles, function(short, long) {

    if (element.parent().parent().find("ul option:selected[value='" + short + "']").length < 1) {
      fhz = short;
    }
  });
  if (fhz) {
    var c = 1;
    var id = $(this).attr("aao_id");
    $(this).parent().parent().find("ul").append('<li class="list-group-item" aao_id="' + id + '"><select class="aao_fhz_typ" aao_old_fhz="' + fhz + '">' + option(fhz) + '</select><span class="badge badge-primary badge-pill"><input aao_id="' + id + '" type="text" class="input_nv aao_fhz_value" value="' + c + '" aao_fhz="' + fhz + '"/></span><button type="button" class="btn btn-danger aao_btn aao_fhz_delete" aao_id="' + id + '" aao_fhz="' + fhz + '"><i class="far fa-trash-alt"></i></button></li>');
  } else {
    alert("Es gibt kein weiteres Fahrzeug!");
  }
});
$(document).on('click', '#aao_save', function(event) {
  parent.saveAAO(aao);
});
