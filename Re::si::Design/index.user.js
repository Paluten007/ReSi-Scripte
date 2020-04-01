// ==UserScript==
// @name         Re::si::Design
// @namespace    https://github.com/DispoOhnePlan/ReSi-Scripte
// @version      0.1
// @description  Verändertes Erscheinungsbild
// @author       DispoOhnePlan
// @match        https://rettungssimulator.online/*
// @updateURL    https://github.com/DispoOhnePlan/ReSi-Scripte/raw/master/Re::si::Design/index.user.js
// @grant        none
// ==/UserScript==


$("head").append(`<style>
.status {
	padding: .2em .6em .3em;
	font-weight: 700;
	font-size: 12px;
	color: #fff;
	border-radius: .25em !important;
	float: left;
	margin-right: 5px;
}

.border_feuerwehr:hover {
	box-shadow: none;
}

.box_single_content_vehicles_shortname {
	float: left;
	width: 100%;
	margin-left: 25px;
	padding: 5px 0;
	white-space: nowrap;
	font-weight: normal;
}

.box_single,
.box_all {
	border: 2px solid #EA2027;
	border-left-width: 2px;
	border-right-width: 2px;
}

.box_single_content_single:hover {
	background-color: white;
}

.box_single_headline {
	border: 0;
	margin: 0;
	border-radius: 0;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	box-sizing: border-box;
}

.box_headline_dropdown {
	width: unset;
}

.box_all .box_all_headline_border.box_all_headline_dropdown,
.box_all .box_all_headline_border {
	width: calc(100% + 14px);
	border-radius: 0;
}

.box_all_headline_border {
	padding: 0;
}

.box_all_headline.form-left {
	border-radius: 0;
}

.box_all_headline {
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
}

.box_single_buy {
	border-radius: 0;
	border-bottom: 2px solid #EA2027;
}

.box_single {
	padding: 0;
}

#department_list_departments li.box_single_content_single {
	overflow: hidden;
}

tr.alarming-window-vehicles td:nth-child(4) span {
	font-weight: normal;
}

.alarming-window-vehicles {
	border-bottom: 1px solid #dee2e6;
}

.alarming-window-vehicles:last-child {
	border-bottom: none;
}

.alarming-window-vehicles:nth-child(2n) {
	background-color: rgba(0, 0, 0, .05);
}

#form_alarming_window .buy_information {
	border-radius: 2px;
	border-top-left-radius: 0px;
	border-bottom-left-radius: 0px;
	padding: 1.4rem 2rem 1.6rem;
}

.buy_information {
	border-bottom: none;
}

#form_alarming_window .buy_information input {
	text-align: left;
	box-sizing: border-box;
	padding: 0 0 0 0.8rem;
	font-weight: normal;
	font-size: 15px;
	border-radius: 0;
	border-top-right-radius: 7.5px;
	border-bottom-right-radius: 7.5px;
}

.border_feuerwehr {
	box-shadow: none;
}

.border_feuerwehr:hover {
	box-shadow: none;
}

#form_alarming_window .box_single_headline {
	display: inline;
	padding: 12.5px 7px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;
}

.box_submit {
	border-color: none;
	box-shadow: none;
	transition: .3s;
	background-color: transparent;
	border-radius: 0px;
	padding: 0px;
	width: unset;
	float: right;
	margin-bottom: 20px;
}

.box_submit input,
box_submit input a {
	border-radius: 100px !important;
	color: #28a745;
	background-color: #282c35;
	padding: 10px 25px;
	border: 3px solid #28a745;
}

.box_submit input:hover,
.box_submit a:hover {
	color: #fff;
	background-color: #28a745;
	border-color: #28a745;
}

.box_submit:hover,
.box_cancel:hover {
	box-shadow: none;
}

.box_cancel {
	border-color: none;
	box-shadow: none;
	transition: .3s;
	background-color: transparent;
	border-radius: 0px;
	padding: 0px;
	width: unset;
	float: right;
	margin-bottom: 20px;
}

.box_cancel .cancel {
	border-radius: 100px !important;
	color: #ea2027;
	background-color: #282c35;
	padding: 10px 25px;
	border: 3px solid #ea2027;
}

.box_cancel .cancel:hover {
	color: #fff;
	background-color: #ea2027;
	border-color: #ea2027;
}

#new_alarming_list .box_cancel {
	float: left;
}

.box_all_headline_border {
	background-color: #ea2027;
}

.single_call div:nth-child(3):not(.call_question) {
	display: flex;
	justify-content: space-around;
	border-top: 1px solid #dee2e6;
}

.call_question {
	flex-grow: 1;
	justify-content: center;
}

.single_call .box_single_content_all tr td:first-of-type {
	transform: scaleX(-1);
	vertical-align: middle;
	padding-left: 5px;
}
</style>`);
$( document ).ready(function() {
$(".single_call .box_single_headline").each(function(el, i){ $(i).html($(i).html().replace(" - ","<br>"))});
});
