///////////////////////////////
//-----------------------------
if (!window.WebSocket) {
	alert('WebSocket в этом браузере не поддерживается.');
}

if(navigator.geolocation)
  geoLoc=navigator.geolocation;
else
  alert("Sorry, browser does not support geolocation!");
//////////////////////////////////////////////////////////////////////
//--------------------------------------------------------------------
var id = null;
var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};
//--------------------------------------------------------------------
function pub() {
    id = navigator.geolocation.watchPosition(showLocation, errorHandler, options);
    $("#btn1").attr("disabled", true);
    $("#btn2").attr("disabled", false);
}
//-----------------------------------------------------
var lat1, lon1, acc1;

function showLocation (position) {
    var latitude = position.coords.latitude; 
    var longitude = position.coords.longitude;
    var acc = Math.round (position.coords.accuracy);
   
    if ( acc < 30 ) {
     lat1 = latitude;
     lon1 = longitude;
     acc1 = acc;
    
     var send_var = JSON.stringify({type:'geo', name:gl_me, ac:acc, lt:latitude, lg: longitude });
     ws.send(send_var);
    } else if (lat1 != undefined) {
     var send_var = JSON.stringify({type:'geo', name:gl_me, ac:acc1, lt:lat1, lg: lon1 });
     ws.send(send_var);
    } else
        $("#btn3").val('not enough accuracy'); 
}
//----------------------------------------------------------------
function errorHandler(err) {
   if(err.code == 1) {
      panel("Error: Access is denied! Try other browser (firefox).");
   }
   else if( err.code == 2) {
      panel("Error: Position is unavailable!");
   }
   else if( err.code == 3) {
      panel("Error: The request to get user location timed out.");
   }
   else {
      panel('To get user location an unknown error occurred.');
   }
}
//----------------------------------------------------------------
function hideLocation() {
  if (id != null) {
      navigator.geolocation.clearWatch(id);
      id = null;
  }

  var send_var = JSON.stringify({type:'geo', name:gl_me, lt:null, lg: null});
  setTimeout( function(){ ws.send(send_var); }, 1000 );
   
  for(var i = 0; i < drow_array.length; i++){
    drow_array[i].setMap(null);
  }
  drow_array = [];
  
  $("#btn1").attr("disabled", false);
  $("#btn2").attr("disabled", true);
  $('#btn3').val('');
  $('#btn4').val('');
  $('#btn5').val('');
}
/////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
//------------------------------------------
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
//////////////////////////////////////////////////////////
//--------------------------------------------------------
var isFirstTime = true;
var drow_array = [];

var lat11, lon11, lat2, lon2, acc;
var s = 0, dis = 0;
//------------------------------------
function drow_dist (f_lat, f_lon) {
    if(isFirstTime) {
      isFirstTime = false;
      lat11 = f_lat;
      lon11 = f_lon;
    } 
    else {
      //lat2 = f_lat;
      //lon2 = f_lon;
      var flightPlanCoordinates = [
        {lat:lat11, lng:lon11},
        {lat: f_lat, lng: f_lon}
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      flightPath.setMap(gl_map);
      drow_array.push(flightPath);
      dis = getDistanceFromLatLonInKm(lat11,lon11,f_lat,f_lon) * 1000;
      s = s + dis ;      
      lat11 = f_lat;
      lon11 = f_lon;
   }
}
////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------
var gl_arr_marker = [];
var marker;
//--------------------------------------------------------------------
function showMessage(mess) {
	  message = JSON.parse(mess); 
	
  	if(message.type == 'id') {
  		ws.send( JSON.stringify({type:'id', name:gl_me}) );
  	return;
    }
//--------------------------------------------------------------------
	  if(message.type == 'chat') {
		  if(message.to == gl_me) {
        	$('#mess').show();
        	$('#fr').text(gl_me);
        	$('#to').text(message.from);
          var txt1 = "<span class='w3-text-orange'>" + message.from +':'+ "&nbsp</span>" + message.text +'<br>';
          $('#v_mess').prepend(txt1);
      }  
		  return;
	  }

	  var isnew = true;

	  if(gl_arr_marker.length !== 0)
		  for(var i = 0; i < gl_arr_marker.length; i++) 
	        if(gl_arr_marker[i].info.content == message.name) {
	        	isnew = false;
	        	break;
	        }

	  if(isnew) {
      if (message.lt !== null) {
		    marker =  new google.maps.Marker( {info : new google.maps.InfoWindow({ content:message.name }) } );
	    
	      var latlng =  new google.maps.LatLng(message.lt, message.lg);
	      marker.setPosition(latlng);
	      marker.setMap(gl_map);
	      marker.info.open(map, marker);
	      gl_arr_marker.push(marker);

        $('#btn3').val(message.ac + ' m');
        $('#btn4').val(dis + ' m');
        $('#btn5').val(s + ' m');
	      drow_dist (message.lt, message.lg); // nor avel

	      marker.addListener('click', function() { 
            if(gl_me == this.info.content) {
              my_alert('Ինքներդ ձեզ հաղորդագրություն չեք կարող ուղարկել։');
            } else {
              $('#fr').text(gl_me);
              $('#to').text(this.info.content);
              $('#mess').show();
            }                             
        });
      }
	  } else {
		var ind;
		gl_arr_marker.forEach( (x, index)=>{ 
  	    if(x.info.content == message.name) {
  	        var latlng =  new google.maps.LatLng(message.lt, message.lg);
            if (message.lt !== null) {
              $('#btn3').val(message.ac + ' m');
              $('#btn4').val(dis + ' m');
              $('#btn5').val(s + ' m');
              drow_dist (message.lt, message.lg); // nor avel
            } 
                
  	        x.setPosition(latlng);
  	        ind = index;
  	    }
		})
		if(message.lt == null) gl_arr_marker.splice(ind, 1);
		console.log('arr.length is ' + gl_arr_marker.length);
	}    
}
///////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------
function find_name(fild) {
    var name = fild + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------
var gl_me = '';
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Given Name: ' + profile.getGivenName());
  if(gl_me !== profile.getGivenName())
    {
        gl_me = profile.getGivenName();
        $('#who').text(gl_me); 
        setCookie('findme_cname', gl_me, 30);
        $('#user_nav').hide();
        $("#btn1").attr("disabled", false);
        $("#btn2").attr("disabled", true);
        setTimeout(function(){ window.location.assign("https://ifindyou.herokuapp.com/") } , 1000);
    } 
}
////////////////////////////////////////////////////////////////////////
//-----------------------------------
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//////////////////////////////////////////////////////
//--------------------   N A V B A R    H I D E
$(document).ready(function(){ $('body').click( function(event){
        if(event.target.className == 'w3-modal') $('.w3-modal').hide();
    });
});
////////////////////////////////////////////////////////////////////////
//                          A L E R T
function my_alert (mess, color ='w3-deep-orange') {
    var w3_class = 'w3-container '+color;
    $('#alert').show();
    $('#message').text(mess);
    $('#al_head').attr('class', w3_class);
}
////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------
function s_mess() {
	var txt = "<span class='w3-text-orange'>" + $('#fr').text()+':'+"&nbsp</span>"+$('#s_mess').val()+'<br>';
	$('#v_mess').prepend(txt);
  var send_var = JSON.stringify({type:'chat', to:$('#to').text(), from:$('#fr').text(), text: $('#s_mess').val() });
  ws.send(send_var);
  $('#s_mess').val('');
}
////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------
function ping_end() {
    $('#v_mess').text('');
    $('#mess').hide();
}
////////////////////////////////////////////////////////////////
//--------------------------------------------------------------
function af() {
    $('#user_nav').hide();
    $('#af').show();
}
////////////////////////////////////////////////////////////////
//--------------------------------------------------------------
function ajax_af() {
    var fr = $('#id_af').val(); 
    $('#af').hide();
    var send_var = JSON.stringify({type:'fr', me:gl_me, fr: fr});
    console.log(send_var);
    ws.send(send_var);
    setTimeout(function(){ window.location.assign("https://ifindyou.herokuapp.com/") } , 1000);
}
////////////////////////////////////////////////////////////////
//--------------------------------------------------------------
function df() {
    $('#user_nav').hide();
    $('#df').show();
}
////////////////////////////////////////////////////////////////
//--------------------------------------------------------------
function ajax_df() {
    var fr = $('#id_df').val(); 
    $('#df').hide();
    var send_var = JSON.stringify({type:'d_fr', me:gl_me, fr: fr});
    console.log(send_var);
    ws.send(send_var);
    setTimeout(function(){ window.location.assign("https://ifindyou.herokuapp.com/") } , 1000);
}
//////////////////////////////////////////////////////////////
//-----------------------------------------------------------
function panel(s) {
    $('#panel span').html(s);
    $('#panel').slideDown();
    $('#panel').delay(2000).slideUp();
}
///////////////////////////////////////////////////////////////
//------------------------  L O G I N 
function log() {
    $('#user_nav').hide();   
    $('#log_f').show();
}
//-----------------
function log_in() { 
    var username = $("#id_user1").val().trim();
    var psw = $("#id_psw1").val().trim();
    if(username == '' || psw == '') 
    {
        my_alert('Please fill out all filds!');
        return;
    }
    var send_var = "username="+username+"&password="+psw;
    serv_cn("login", send_var, s_log_in, e);
    console.log(send_var);
    $('#log_f').hide();
}
//------------------------
var e = function(){return;}
var s_log_in = function(r) {

    console.log(r);
    if(r == '0') {
        my_alert('Այդպիսի անունով օգտատեր չկա։');
        return;
    } 
    if(r == '1') {
        my_alert('Ձեր ծածկագիրը սխալ է։');
        return;
    }
    gl_me = r;

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    }); 
    setCookie('findme_cname', gl_me, 30);
    setTimeout(function(){ window.location.assign("https://ifindyou.herokuapp.com/") } , 1000);
    $("#btn1").attr("disabled", false);
}
/////////////////////////////////////////////////////////////////
//----------------- AJAX 
var start = function () { $("#wait").css("display", "block"); }
var end = function() { $("#wait").css("display", "none"); }
function serv_cn(urlphp, send_var, s_f, e_f) { 
    console.log('start ajax -> '+ send_var);
    var ajaxOptions = {
        url: urlphp,
        data: send_var,
        type: "POST",
        beforeSend:start,
        complete:end,
        timeout:60000,
        cache:false,
        success: s_f,
        error: e_f,
    };
    $.ajax(ajaxOptions);
}
////////////////////////////////////////////////////
//--------------------------------------------------
function out() {
  $('#user_nav').hide();
  ws.close();
  gl_me='';
  $('#who').text(gl_me);
  $("#btn1").attr("disabled", true);
  $("#btn2").attr("disabled", true);
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
  setCookie('findme_cname', '', 0) 
}
////////////////////////////////////////////////////
//--------------------------------------------------
function reg(){
  $('#reg_f').show();
  $('#user_nav').hide();
}
////////////////////////////////////////////////////
//--------------------------------------------------
function create_new_user(){
    var username = $("#id_user2").val().trim();     
    var psw = $("#id_psw2").val().trim();           
    var email = $("#id_email").val().trim();         
    if(username == '' || psw == '' || email == '') 
    {
        $('#reg_f').hide();
        my_alert('Please fill out all filds!', 'w3-red');
        return false;
    }
    var send_var = "username="+username+"&email="+email+"&password="+psw;
    console.log(send_var);
    serv_cn('reg', send_var, s_reg, e);
    $('#reg_f').hide();
}
//---------------------------------------------------
var s_reg = function(r) {
    r = r.trim(); 
    panel(r);
}
//-----------------------------------------------------------
var HOST = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(HOST);
//---------------------------------------------------------
ws.onopen = function() {
  // some code maybe
};
//---------------------------------------------------------
ws.onclose = function() {              
    setTimeout(function(){ window.location.assign("https://ifindyou.herokuapp.com/") } , 1000);
};
//-----------------------------------------------------------
ws.onmessage = function(event) {
    var incomingMessage = event.data;
    showMessage(incomingMessage); 
};
////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------
$(document).ready( function(){ 
    gl_me = find_name('findme_cname');
    if(gl_me =='') {
        my_alert('Ձեր սեսիայի ժամանակն ավարտվել է, նորից մուտք արեք համակարգ։');
        $("#btn1").attr("disabled", false);
        $("#btn2").attr("disabled", true);
    } else {
      $('#who').text(gl_me);
      var s = 'Բարի գալուստ  "'+ gl_me + '"!';
      panel(s);
      $("#btn3").val('');
      $("#btn4").val('');
      $("#btn5").val('');
    }     
})
////////////////////////////////////////////////////
//--------------------------------------------------