/////////////////////////////////////////
//! ---------------------- Create new user

function reg() {
	$("#par").html("");
	hide_all_form();
	El("reg_f_f").reset();
	$("#reg_f").show();
}

//---------------------------------------------------

function create_new_user() {
	var username = $("#id_user2").val().trim();
	var psw = $("#id_psw2").val().trim();
	var email = $("#id_email").val().trim();
	if (username == "" || psw == "" || email == "") {
		my_alert("Please fill out all filds!", "w3-red");
		return false;
	}
	var send_var = "login=" + username + "&password=" + psw + "&email=" + email;
	serv_cn("reg.php", send_var, s_reg, e);
	$("#reg_f").hide();
}

//---------------------------------------------------

var s_reg = function (r) {
	r = r.trim();
	if (r[0] == "|") {
		r = r.slice(1);
		panel(r);
	} else if (r[0] == "]") {
		r = r.slice(1);
		my_alert(r, "w3-red");
	} else my_alert(r);
};

//--------------------------------------------------

function restrict(el_id) {
	var rx = new RegExp();
	if (el_id == "id_user2") rx = /[^a-z0-9_]/gi;
	if (el_id == "id_psw2") rx = /[^a-z0-9]/gi;
	El(el_id).value = El(el_id).value.replace(rx, "");
}

////////////////////////////////////////
//! ------------------------  L O G I N

function log() {
	$("#par").html("");
	hide_all_form();
	El("log_f_f").reset();
	$("#log_f").show();
}

//-----------------

function log_in() {
	var username = $("#id_user1").val().trim();
	var psw = $("#id_psw1").val().trim();
	if (username == "" || psw == "") {
		my_alert("Please fill out all filds!", "w3-red");
		return false;
	}
	var send_var = "login=" + username + "&password=" + psw;
	serv_cn("log_in.php", send_var, s_log_in, e);
}

//------------------------

var s_log_in = function (r) {
	$("#log_f").hide();
	r = r.trim();
	if (r[0] == "|") {
		r = r.slice(1);
		$("#who").html(r);

		panel("Velcome to MyVocabulary!");
	} else if (r[0] == "]") {
		r = r.slice(1);
		my_alert(r, "w3-red");
	} else {
		r = r.slice(1);
		my_alert(r);
	}
};

/////////////////////////////////////////
//! -----------------------  L O G - O U T

function out() {
	$("#par").html("");
	serv_cn("log_out.php", null, s_who, e);
}

//--------------

var s_who = function (r) {
	r = r.trim();
	$("#who").html(r);
};

//////////////////////////////////////////////
//! -------------------------  E M A I L _P S W

function frg() {
	$("#par").html("");
	hide_all_form();
	El("frg_psw_f").reset();
	$("#frg_psw").show();
}

//-------------------------

function em_psw() {
	var send_var = "email=" + $("#id_email2").val().trim();
	if ($("#id_email2").val().trim() == "") {
		my_alert("Please fill out the email fild!", "w3-red");
		return false;
	}
	serv_cn("email_psw.php", send_var, s_email_psw, e);
	$("#frg_psw").hide();
}

//-------------------------------

var s_email_psw = function (r) {
	r = r.trim();
	if (r[0] == "|") {
		r = r.slice(1);
		panel(r);
	} else if (r[0] == "]") {
		r = r.slice(1);
		my_alert(r, "w3-red");
	} else $("#par").html(r);
};

////////////////////////////////////////////////
//! -----------------------  C H A N G E - P S W

function ch_psw1() {
	$("#par").html("");
	hide_all_form();
	El("ch_psw_f").reset();
	$("#ch_psw").show();
}

//--------------------------------------

function ch_psw2() {
	var un = $("#id_chp").val().trim();
	var op = $("#id_old").val().trim();
	var np = $("#id_new").val().trim();
	if (un == "" || op == "" || np == "") {
		my_alert("Please fill out all filds!", "w3-red");
		return false;
	}
	var send_var = "un=" + un + "&" + "op=" + op + "&" + "np=" + np;
	serv_cn("ch_psw.php", send_var, s_email_psw, e);
	$("#ch_psw").hide();
}

//////////////////////////////////////////////
//! ---------------------  D I A G R A M M A

function diag() {
	if (localStorage.mv == "") {
		my_alert("Ձեր բառարանը դատարկ է");
		return;
	}
	hide_all_form();
	$("#par").text("");

	//----------------------------------

	var y;
	var ar1 = [];
	for (i = 0; i < 26; i++) ar1[i] = 0;

	for (i = 0; i < ar.length; i++) {
		y = ar[i].word.charCodeAt(0) - 97;
		ar1[y] += 1;
	}

	var max = 0;
	for (i = 0; i < 26; i++) {
		if (ar1[i] > max) max = ar1[i];
	}

	//------------------------------------------

	var tbl = "<table id ='diag_table' style='width:100%'><thead><tr>";
	for (i = 0; i < 26; i++) {
		tbl +=
			"<th id = 'img'><img src = 'img/poll.gif' height ='" +
			(ar1[i] * 240) / max +
			"px' width = '7px'></th>";
	}
	tbl += "</tr> </thead><tbody><tr>";

	for (i = 97; i < 123; i++) {
		tbl += "<td>" + String.fromCharCode(i) + "</td>";
	}
	tbl += "</tr></tbody></table>";

	//------------------------------------------
	$("#diag").show();
	var head = "Number of words - " + ar.length;
	$("#number").text(head);
	$("#table").html(tbl);
}

/////////////////////////////////////////////
//! --------------------------------  S A V E
function sv_start() {
	if ($("#who").text().trim() == "No User") {
		my_alert("There is no active user. Please log in at first!", "w3-red");
		return;
	}
	hide_all_form();
	$("#par").html("");
	$("#save").show();
	send_var = "p=1";
	serv_cn("sv.php", send_var, s_st, e_sv);
}
//---------------------------------
var s_st = function (r) {
	r = r.trim();
	var fr = "վերջին թարմացումը եղել է ։  " + r;
	$("#date").text(fr);
};
//------------------------------------------

function sv() {
	var max = localStorage.max_index;
	var dict = localStorage.mv.trim();
	send_var = "max=" + max + "&dict=" + dict;
	serv_cn("sv.php", send_var, s_sv, e_sv);
}

//-----------------------

function e_sv(x) {
	if (x.status == 0) my_alert("Connection time out.  Please try again!");
	else my_alert("An error occured: " + x.status + "-" + x.statusText + ".");
}

//-----------------------

var s_sv = function (r) {
	$("#save").hide();
	r = r.trim();
	panel("պահպանումը հաջողությամբ կատարբեց");
};

///////////////////////////////////////////
//! ---------------------  D O W N L O A D
function dld_start() {
	if ($("#who").text().trim() == "No User") {
		my_alert("There is no active user. Please log in at first!", "w3-red");
		return;
	}

	hide_all_form();
	$("#par").html("");
	$("#dld").show();
	send_var = "p=1";
	serv_cn("dld.php", send_var, s_dld_start, e_sv);
}

var s_dld_start = function (r) {
	r = r.trim();
	var fr = "վերջին թարմացումը եղել է ։  " + r;
	$("#dld_dt").html(fr);
};

//------------------------------
function dld() {
	$("#dld").hide();
	serv_cn("dld.php", null, s_dld, e_sv);
}

//--------------------------
var s_dld = function (r) {
	r = r.trim();
	if (r[0] == "|") {
		r = r.slice(1);
		panel(r);
	} else if (r[0] == "]") {
		r = r.slice(1);
		my_alert(r, "w3-red");
		return;
	}

	var fr = r.split("|||"); // արդյունքը մասիվ է

	var f = fr[1].replace(/\\'/g, "'");

	try {
		ar = JSON.parse(f);
	} catch (err) {
		my_alert("parse: " + err.message);
		return;
	}
	localStorage.setItem("mv", f);
	localStorage.setItem("max_index", fr[0]);

	panel("The dictionary has been downloaded succesfully!");
};

//////////////////////////////////////////////////
//! -----------------    T R A N S
function trans() {
	hide_all_form();
	$("#txt").val("");
	$("#trans").text("");
	$("#trn").show();
}

//-------------
function st_trans() {
	$("#trans").text("");
	if (localStorage.mv == "") {
		my_alert("Ձեր բառարանը դատարկ է");
		return;
	} else {
		var str = $("#txt").val().trim().toLowerCase();
		var res = str.split(/[ \"\'?.,-:;\/]/);
		for (j = 0; j < res.length; j++) {
			if (res[j] !== "") {
				for (i = 0; i < ar.length; i++) {
					var m = ar[i].word.trim();
					if (res[j] == m || res[j].search(m) == 0) {
						//word='<a href ="#" onclick = "my_trans('+"'" + ar[i].translation +"'"+')">'+word+'</a>';
						//var word = '<em>'+res[j]+'</em>'+' -> '+ar[i].translation+'</br>';
						$("#trans").append(
							"<em>" +
								m +
								"</em>" +
								" -> " +
								ar[i].translation +
								"</br>"
						);
					}
				}
			}
		}
	}
}

function rrr() {
	serv_cn("rrr.php", null, s_rrr, e_sv);
}

var s_rrr = function (r) {
	r = r.trim();
	var fr = r.replace(/\\'/g, "'");
	localStorage.max_index = 1820;
	localStorage.mv = fr;
	ar = JSON.parse(fr);
};

//----------------------------------------------------
function cl_str() {
	localStorage.clear();
	alert("clear func");
}

////////////////////////////////////////
//! -------------------------  S T A R T
function st() {
	if (typeof Storage === "undefined") {
		my_alert("Sorry, your browser does not support Web Storage...");
		return;
	}

	if (typeof localStorage.mv === "undefined") localStorage.mv = "";

	if (localStorage.mv == "") {
		my_alert("Ձեր բառարանը դատարկ է");
		ar = [];
		localStorage.max_index = 1;
	} else {
		var r = localStorage.mv;

		ar = JSON.parse(r.replace(/\\'/g, "'"));
		top1000 = JSON.parse(localStorage.star);
	}

	if (typeof localStorage.star == "undefined") {
		// typeof piti grvi, teche chi ashxatum
		star();
	} else {
		top1000 = JSON.parse(localStorage.star);
	}
	serv_cn("who.php", null, s_who, e);
}
var s_who = function () {};

/////////////////////////////////////////////
//! ----------------------------  S T A R
function star() {
	serv_cn("star.php", null, s_star, e);
}

//----------------------------
s_star = function (r) {
	localStorage.setItem("star", r);
	top1000 = JSON.parse(localStorage.star);
};

/////////////////////////////////////////////
//! --------------------------------  A D D
function add() {
	$("#id1").val($("#myInput").val().trim());
	El("n_w_f_f").reset();
	$("#n_w_f").show();
}

//-------------------------
function add_new() {
	var word = $("#id1").val();
	if (word !== "") word = word.trim().toLowerCase();
	var pr = tr($("#pr").val());
	var pos = $("#id2").val();
	if (pos !== null) pos = pos.trim(); // sa datark che, ajl null
	var translation = $("#id3").val();
	if (translation !== "") translation = translation.trim();
	var memo = $("#id4").val();
	if (memo !== "") memo = memo.trim();

	var x;
	var st = 0;

	for (x in top1000) {
		if (word == top1000[x]) {
			st = 1;
			break;
		}
	}

	ar.push({
		id: localStorage.max_index,
		word: word,
		pr: pr,
		pos: pos,
		translation: translation,
		memo: memo,
		df: 1,
		tp: new Date(),
		p: 0,
		n: 0,
		top: st,
	});
	localStorage.mv = JSON.stringify(ar);
	localStorage.max_index = Number(localStorage.max_index) + 1;
	//El('n_w_f_f').reset();  այս տողում չաժշխատեց
	$("#n_w_f").hide();
}
///////////////////////////////////////
//! ---------------------  E N G - R U S
function eng_rus_m() {
	hide_all_form();
	$("#par").text("");

	var radio = $(".radio :checked").val();

	if (localStorage.mv == "") {
		my_alert("Ձեր բառարանը դատարկ է");
		return;
	}

	// Սա նոր գիտելիք է
	ar.sort(function (a, b) {
		var nameA = a.word.toLowerCase(),
			nameB = b.word.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	for (i = 0; i < ar.length; i++) {
		var patt = new RegExp(ar[i].word, "gi");
		var rp2 = "<mark>" + ar[i].word + "</mark>";
		var rp3 = ar[i].memo;
		var rp4 = rp3.replace(patt, rp2);

		if (radio == "fav") {
			if (ar[i].df == 1)
				apend_f(
					ar[i].id,
					ar[i].word,
					ar[i].pr,
					ar[i].pos,
					ar[i].translation,
					rp4,
					ar[i].df,
					ar[i].top
				);
		} else
			apend_f(
				ar[i].id,
				ar[i].word,
				ar[i].pr,
				ar[i].pos,
				ar[i].translation,
				rp4,
				ar[i].df,
				ar[i].top
			);
	}
}

/////////////////////////////////////////////////
//! -------------------------------  R U S-E N G
function rus_eng_m() {
	hide_all_form();
	$("#par").text("");

	if (localStorage.mv == "") {
		my_alert("Ձեր բառարանը դատարկ է");
		return;
	}

	var radio = $(".radio :checked").val();
	for (i = 0; i < ar.length; i++) {
		if (radio == "fav") {
			if (ar[i].df == 1)
				apend_f1(
					ar[i].id,
					ar[i].translation,
					ar[i].pr,
					ar[i].pos,
					ar[i].word,
					ar[i].memo,
					ar[i].df,
					ar[i].top
				);
		} else
			apend_f1(
				ar[i].id,
				ar[i].translation,
				ar[i].pr,
				ar[i].pos,
				ar[i].word,
				ar[i].memo,
				ar[i].df,
				ar[i].top
			);
	}
}

/////////////////////////////////////////////
//! -------------------------------- D E L

function del(x) {
	// Automatically Global
	id = $(x).parentsUntil("#par", ".word").attr("id");
	$("#" + id).remove();
	for (i = 0; i < ar.length; i++) {
		if (ar[i].id == id) break;
	}
	ar.splice(i, 1);
	localStorage.mv = JSON.stringify(ar);
}

/////////////////////////////////////////////
//! --------------------------    U P D A T E
function update(x) {
	hide_all_form();
	//El('u_w_f').reset();
	id = $(x).parentsUntil("#par", ".word").attr("id");
	$("#id_id").val(id);
	$("#id_word").text(
		$("#" + id)
			.find("button")
			.text()
	);
	var pr = $("#" + id)
		.find("li:eq(0)")
		.text()
		.trim();
	pr = tr(pr);
	$("#up_pr").val(pr);
	$("#id_pos").val(
		$("#" + id)
			.find("li:eq(1)")
			.text()
	);
	$("#id_trans").val(
		$("#" + id)
			.find("li:eq(2)")
			.text()
	);
	$("#id_ex").val(
		$("#" + id)
			.find("li:eq(3)")
			.text()
	);
	$("#div_up").show();
}

//------------------------
function up_submit() {
	var pr = $("#up_pr").val();
	var pos = $("#id_pos").val();
	var trans = $("#id_trans").val();
	var ex = $("#id_ex").val();

	for (i = 0; i < ar.length; i++) {
		if (ar[i].id == id) break;
	}

	ar[i].pr = pr;
	ar[i].pos = pos;
	ar[i].translation = trans;
	ar[i].memo = ex;

	localStorage.mv = JSON.stringify(ar);

	$("#" + id)
		.find("li:eq(0)")
		.text(tr(pr));
	$("#" + id)
		.find("li:eq(1)")
		.children()
		.text(pos);
	$("#" + id)
		.find("li:eq(2)")
		.text(trans);
	$("#" + id)
		.find("li:eq(3)")
		.children()
		.text(ex);
	$("#div_up").hide();
}

/////////////////////////////////////////////
//! --------------------------------  F A V
function fav(x) {
	id = $(x).parentsUntil("#par", ".word").attr("id");

	for (i = 0; i < ar.length; i++) {
		if (ar[i].id == id) break;
	}

	if (ar[i].df == 1) ar[i].df = 0;
	else ar[i].df = 1;

	localStorage.mv = JSON.stringify(ar);

	if (
		$("#" + id)
			.find("button")
			.hasClass("w3-red")
	) {
		$("#" + id)
			.find("button")
			.removeClass("w3-red");
		$("#" + id)
			.find("button")
			.addClass("w3-light-green");
	} else {
		$("#" + id)
			.find("button")
			.removeClass("w3-light-green");
		$("#" + id)
			.find("button")
			.addClass("w3-red");
	}
}

//////////////////////////////////////////
//! -------------------   S P E L L I N G
function clear_f_sp() {
	$("#num").text("");
	$("#sum").text("");
	$("#p").text("");
	$("#n").text("");
	$("#sp_2_1").val("");
	$("#sp_2_2").val("");
	$("#hint").val("");
	$("#hint").attr("class", "w3-input w3-border w3-text-left");
}

//------------------------------------
function sp_1() {
	$("#par").html("");
	clear_f_sp();
	var radio_var = $(".radio :checked").val();

	if (localStorage.mv == "") {
		my_alert("Ձեր բառարանը դատարկ է");
		return;
	}

	map_ar = [];

	if (radio_var == "fav") {
		var j = 0;
		for (i = 0; i < ar.length; i++) {
			if (ar[i].df == 1) {
				map_ar[j] = i;
				j++;
				alert(typeof ar[i].p);
			}
		}
	} else {
		for (i = 0; i < ar.length; i++) {
			map_ar[i] = i;
		}
	}

	i = 0;
	$("#num").text(i + 1);
	$("#sum").text(map_ar.length);

	$("#p").text(ar[map_ar[i]].p);

	$("#n").text(ar[map_ar[i]].n);
	$("#sp_2_1").val(ar[map_ar[i]].translation);

	$("#f_sp").show();
}

/*fav_ar = ar.filter(checkFav);  // նոր բան
function checkFav(k) {
    return k.df == 1;
}*/

//----------------------------
function sp_next() {
	//------------------------------ clear
	$("#hint").attr("class", "w3-input w3-border w3-text-left");
	$("#hint").val("");
	$("#sp_2_2").val("");
	//-------------------------------------

	if (i < map_ar.length - 1) i++;
	$("#num").text(i + 1);
	$("#sum").text(map_ar.length);
	$("#p").text(ar[map_ar[i]].p);
	$("#n").text(ar[map_ar[i]].n);
	$("#sp_2_1").val(ar[map_ar[i]].translation);
}

//-----------------------------------
function sp_prev() {
	//------------------ clear
	$("#hint").attr("class", "w3-input w3-border w3-text-left");
	$("#hint").val("");
	$("#sp_2_2").val("");
	//------------------------

	if (i > 0) i--;
	$("#num").text(i + 1);
	$("#sum").text(map_ar.length);
	$("#p").text(ar[map_ar[i]].p);
	$("#n").text(ar[map_ar[i]].n);
	$("#sp_2_1").val(ar[map_ar[i]].translation);
}

//------------------------- H I N T
function hush() {
	$("#hint").attr("class", "w3-input w3-border w3-text-left w3-text-black");
	var h = ar[map_ar[i]].word;
	var hh = h[0] + "*".repeat(h.length - 1);
	$("#hint").val(hh);
}

//-------------------      C H E C K
function checkw() {
	var h = ar[map_ar[i]].word;
	if ($("#sp_2_2").val().trim().toLowerCase() == h) {
		$("#hint").attr("class", "w3-input w3-border w3-text-left w3-green");
		$("#hint").val(h);
		$("#p").text((ar[map_ar[i]].p += 1));
		localStorage.mv = JSON.stringify(ar);
	} else {
		$("#hint").attr("class", "w3-input w3-border w3-text-left w3-red");
		$("#hint").val(h);
		$("#n").text((ar[map_ar[i]].n += 1)); // n++ հետո է անում, սխալ է
		localStorage.mv = JSON.stringify(ar);
	}
}

/////////////////////////////////////
//! ---------------------   A L E R T
function my_alert(mess, color = "w3-blue") {
	var w3_class = "w3-container " + color;
	$("#alert").show();
	$("#message").text(mess);
	$("#al_head").attr("class", w3_class);
}

//------------------------------------------------------
function El(x) {
	return document.getElementById(x);
}

//-------------------------------------------------------
function tr(w) {
	w = w.trim();
	if (w == "empty_fild" || w == "") return w;
	else if (w.indexOf("/") !== 0) return "/ " + w + " /";
	else {
		var a = w.split("/");
		return "/ " + a[1].trim() + " /";
	}
}

//-------------------------------------------------------
function apend_f(x1, x2, x3, x4, x5, x6, x7, x8) {
	var c;
	if (x7 == 1) c = " w3-red";
	else c = " w3-light-green"; // probely karevor a!!!

	var top;
	if (x8 == 1)
		top =
			"<i class='top1000 fa fa-star w3-text-white w3-right w3-padding-4'></i>";
	else top = "";

	var s =
		"<div class = 'word w3-accordion w3-card-8 w3-margin-top' id = " +
		x1 +
		">";
	s +=
		"<button onclick='$(this).next().toggle(400)' class = 'w3-btn-block w3-left-align" +
		c +
		"'>" +
		top +
		x2 +
		"</button>";
	s += "<div class = 'w3-accordion-content'><ol class = 'w3-ol'>";
	s +=
		"<li>" +
		x3 +
		"</li><li><span class='w3-text-amber'>" +
		x4 +
		"</span></li><li>";
	s +=
		x5 +
		"</li><li><span class='w3-text-indigo' >" +
		x6 +
		"</span></li></ol>";
	s +=
		"<div class='w3-row w3-black'><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
        <a class='fa fa-maxcdn w3-text-grey w3-hover-black w3-hover-text-white' onclick='MacMil(this)'></a> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<a class='fa fa-diamond w3-text-grey w3-hover-black w3-hover-text-white' onclick='lingvo(this)'></a> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<a class='fa fa-google w3-text-grey w3-hover-black w3-hover-text-white' onclick='goog(this)'></a> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'>\
	<a class='fa fa-trash w3-text-grey w3-hover-black w3-hover-text-white' onclick='del(this)'></a>\
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<a class='fa fa-refresh  w3-text-grey w3-hover-black w3-hover-text-white' onclick='update(this)'></a> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<a  class='fa fa-bookmark w3-text-grey w3-hover-black w3-hover-text-white' onclick='fav(this)'></a> \
	</div></div></div>";
	$("#par").append(s);
}

//-------------------------------------------------------
function apend_f1(x1, x2, x3, x4, x5, x6, x7, x8) {
	var c;
	if (x7 == 1) c = " w3-red";
	else c = " w3-light-green"; // probely karevor a!!!

	var top;
	if (x8 == 1)
		top =
			"<i class='top1000 fa fa-star w3-text-white w3-right w3-padding-4'></i>";
	else top = "";

	var s =
		"<div class = 'word w3-accordion w3-card-8 w3-margin-top' id = " +
		x1 +
		">";
	s +=
		"<button onclick='$(this).next().toggle(400)' class = 'w3-btn-block w3-left-align" +
		c +
		"'>" +
		top +
		x2 +
		"</button>";
	s += "<div class = 'w3-accordion-content'><ol class = 'w3-ol'>";
	s +=
		"<li>" +
		x3 +
		"</li><li><span class='w3-text-amber'>" +
		x4 +
		"</span></li><li>";
	s +=
		x5 +
		"</li><li><span class='w3-text-indigo' >" +
		x6 +
		"</span></li></ol>";
	s +=
		"<div class='w3-row w3-black'><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
        <i class='fa fa-maxcdn w3-text-grey'></i> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<a class='fa fa-diamond w3-text-grey w3-hover-black w3-hover-text-white' onclick='lingvo(this)'></a> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<i class='fa fa-google w3-text-grey'></i> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'>\
	<a class='fa fa-trash w3-text-grey w3-hover-black w3-hover-text-white' onclick='del(this)'></a>\
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<i class='fa fa-refresh  w3-text-grey'></i> \
	</div><div class='w3-container w3-padding-0 w3-center w3-col s2'> \
	<a class='fa fa-bookmark w3-text-grey w3-hover-black w3-hover-text-white' onclick='fav(this)'></a> \
	</div></div></div>";
	$("#par").append(s);
}

//--------------------------
function MacMil(x) {
	var word = $(x).parentsUntil("#par", ".word").children("button").text();
	var loc_str =
		"http://www.macmillandictionary.com/dictionary/british/" + word;

	if (typeof mac == "undefined" || mac.closed) {
		mac = window.open();
		mac.location.assign(loc_str);
		return;
	}
	mac.location.replace(loc_str);
}

//--------------------------------------------------
function goog(x) {
	var word = $(x).parentsUntil("#par", ".word").children("button").text();
	var loc_str = "https://translate.google.com/m/translate#en/hy/" + word;

	if (typeof g == "undefined" || g.closed) {
		g = window.open("", "", "", false);
		g.location.assign(loc_str);
		return;
	}
	g.location.replace(loc_str);
}

//---------------------------------------------
function lingvo(x) {
	var word = $(x).parentsUntil("#par", ".word").children("button").text();
	var loc_str = "http://www.lingvo-online.ru/en/Translate/en-ru/" + word;

	if (typeof lin == "undefined" || lin.closed) {
		lin = window.open();
		lin.location.assign(loc_str);
		return;
	}
	lin.location.replace(loc_str);
}

//---------------------------------------------
function myFunction() {
	var filter = $("#myInput").val().toUpperCase();
	$("#par > div").each(function () {
		if (
			$(this).children("button").text().toUpperCase().indexOf(filter) == 0
		)
			$(this).show();
		else $(this).hide();
	});
}

//////////////////////////////
//! ----------------- AJAX
var e = function (x) {
	if (x.status == 0) my_alert("Connection time out.  Please try again!");
	else my_alert("An error occured: " + x.status + "-" + x.statusText + ".");
};

var start = function () {
	$("#wait").css("display", "block");
};
var end = function () {
	$("#wait").css("display", "none");
};
function serv_cn(url_of_php, send_var, s_f, e_f) {
	var ajaxOptions = {
		url: url_of_php,
		data: send_var,
		type: "POST",
		beforeSend: start,
		complete: end,
		timeout: 10000,
		//cache:false,
		//async:false,
		success: s_f,
		error: e_f,
	};
	$.ajax(ajaxOptions);
}

//////////////////////////////////////////////////////
//! --------------------   N A V B A R    H I D E
$(document).ready(function () {
	$("body").click(function (event) {
		if (event.target.id == "myside") $("#myside").hide();
	});
});

/////////////////////////////////////////
//! --------------------------  P A N E L
function panel_new(s, c) {
	$("#panel span").html(s);
}

function panel(s) {
	$("#panel span").html(s);
	$("#panel").slideDown();
	$("#panel").delay(4000).slideUp();
}

///////////////////////////////////////////////////
//! --------------------------- H I D E   F O R M S
function hide_all_form() {
	$("#n_w_f").hide();
	$("#div_up").hide();
	$("#scope_f").hide();
	$("#reg_f").hide();
	$("#log_f").hide();
	$("#frg_psw").hide();
	$("#ch_psw").hide();
	$("#f_sp").hide();
	$("#myside").hide();
}

///////////////////////////////////////////////////////////////////////
