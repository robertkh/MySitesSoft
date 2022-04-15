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
/////////////////////////////////////////////////////////////
//                                  
function b_load(){  
    serv_cn('who.php');   
    console.log('js 6');
    var ses = find_name('PHPSESSID');
    active_user = find_name('dimord_user');
    if(ses == '')
    {
        if(active_user == '')
        {
            active_user='guest'; panel('Բարի գալուստ Dimord');
        } 
        else
        {
            var s = 'Նորից բարի գալուստ ' + active_user +':'; panel(s);
        }        
    }
    else
    {
        if(active_user == '')
        {
            active_user='guest'; panel('Բարի գալուստ Dimord');
        } 
        else
        {
            var s = 'Նորից բարի գալուստ ' + active_user +':'; panel(s);
        }   
    }
    $('#who').text(active_user);
    console.log(active_user);
}
//////////////////////////////////////////////////////////////
//                         menju upload button -- zhamanakavor
function up_toggle(){
    if(active_user=='guest'){
        my_alert('Ձեր հյուրի կարգավիճակը թույլ չի տալիս օգտվել այս գործողությունից։');
        return;
    }
    $('#bar2').toggle();
    $('#v1').hide();
    $('#dl').hide();
    $('#file').show();
    $('#upload').show();
    $('#forum').hide();
    $('#forum_button').hide();
}
//////////////////////////////////////////////////////////////
//                         menju view 
function vw_toggle(){
    $('#bar2').toggle();
    $('#v1').show();
    $('#forum').hide();
    $('#forum_button').hide();
    $('#dl').hide();
    $('#file').hide();
    $('#upload').hide();
}
//////////////////////////////////////////////////////////////
//                         forum
function f_forum(){
    $('#forum').show();
    $('#forum_button').show();
    $('#view').hide();
    $('#bar2').hide();
    serv_cn('read_forum.php', null, s_read_forum, e)
}
//-----------------
var s_read_forum = function(r)
{
    //console.log(r);
    forum_res = JSON.parse(r);
    $('#forum').text('');
    var el;
    for(var j=0; j<forum_res.length; j++)
    {
        if(forum_res[j].parent == 0)
        {
            //console.log(c);
            el =$('#forum');  
            var s = "<header onclick='$(this).next().toggle()' class = 'w3-container w3-section w3-light-grey w3-border w3-hover-border-red w3-round'>";
            s += "<span class = 'w3-right '>" +forum_res[j].time+"</span>"+forum_res[j].tema+"</header>";
            $('#forum').append(s);
            f_append(el, forum_res[j].id, forum_res[j].time, forum_res[j].text, forum_res[j].hex);
        }
        else  
        {
            var id = "#"+forum_res[j].parent;
            el = $(id);           
            el = $(id).parent();
            f1_append(el, forum_res[j].id, forum_res[j].time, forum_res[j].text, forum_res[j].hex);
        }                
    }
}
   
function f1_append(el,x1,x2,x4,x5){
    console.log('f1-start');
  var s = ' <div class="w3-margin-left"><div class=" w3-card-4" style="width:100%;" id = "' + x1+ '"><header class="w3-container w3-blue">';
      s += ' hexinak:<b><em class="w3-text-orange w3-wide">'+x5+' </em></b> <span class = "w3-right "> '+x2+ ' </span>  ';
      s += "<span class='fa fa-reply ptr w3-right w3-text-orange' onclick='forum_reply(this)' style='margin-top:5px'></span></header>";
      s += ' <p class="w3-container"> ' +x4+ '</p></div></div>';
 el.append(s); 
}
   

//---------------------
function f_append(el,x1,x2,x4,x5)
{
    // x1-> id; x2->time;x3->tena;x4->text.x5->hex;
    var s = ' <div style="display:none;"><div class="w3-card-4 w3-margin-bottom w3-round-large" style="width:100%;" id = "' + x1+ '"><header class="w3-container w3-blue">';
      s += ' hexinak:<b><em class="w3-text-orange w3-wide">'+x5+' </em></b> <span class = "w3-right "> '+x2+ ' </span>  ';
      s += "<span class='fa fa-reply ptr w3-right w3-text-orange' onclick='forum_reply(this)' style='margin-top:5px'></span></header>";
      s += ' <div class="w3-container"> ' +x4+ '</div></div></div>';
    el.append(s); 
}
//------------------------
function forum_reply(x)
{
    if(active_user=='guest') {my_alert('Կայքի հյուրերը չեն կարող օգտվել այս ֆունկցիայից։'); return;}
    
    gl_id = $(x).parent().parent().parent().attr('id');
    var arr_num;
    for(var j=0; j<forum_res.length; j++) {
        if(forum_res[j].id == gl_id) {
            arr_num=j; break;
            } 
    }
    //console.log(arr_num);
    $('#forum_mess_reply_tema').val(forum_res[arr_num].tema );
    $('#forum_mess_reply').show();
}
//---------------
function f_forum_mess_reply_send()
{
    $('#forum_mess_reply').hide();
    if( $('#forum_mess_reply_text').val()==''){
        $('#forum_mess_reply').hide(); 
        my_alert('Դաշտերը պարտադիր պիտի լրացվեն։'); 
        return;
    }
    send_var = 'parent=' + gl_id + '&tema='+$('#forum_mess_reply_tema').val()+'&text='+$('#forum_mess_reply_text').val();
    console.log(send_var);
    serv_cn('forum.php', send_var, s_forum, e);
    $('#forum_mess').hide();
}
///////////////////////////////////////////////////////////////
//                         menju del button ---zhamanakavor
function dl_toggle(){
    if(active_user=='guest'){
        my_alert('Ձեր հյուրի կարգավիճակը թույլ չի տալիս օգտվել այս գործողությունից։');
        return;
    }
    $('#bar2').toggle();
    $('#dl').show();
    $('#v1').hide();
    $('#file').hide();
    $('#upload').hide();
    $('#forum').hide();
    $('#forum_button').hide();
}
///////////////////////////////////////////////////////////////
//                     delete
function del()
{
    if($('#a').val()==null) { my_alert('Առարկան ընտրված չէ։'); return;}
    if($('#tt').val()==null) { my_alert('Հրատարակության տարեթիվը ընտրված չէ։'); return;}
    if($('#h').val()==null) { my_alert('Հատորն ընտրված չէ։'); return;}
    if($('#b').val()==null) { my_alert('Բաժինն ընտրված չէ։'); return;}
    if($('#g').val()==null) { my_alert('Գլուխն ընտրված չէ։'); return;}
    if($('#num').val()=='') { my_alert('Համարն ընտրված չէ։'); return;}
    send_var = 'a='+$('#a').val() + '&tt='+$('#tt').val() + "&h=" + $('#h').val() + "&g=" + $('#g').val() + "&b=" + $('#b').val() + "&num=" + $('#num').val();
    console.log(send_var);
    console.log($('#num').val());
    serv_cn('del.php', send_var, s_del, e);
    
    $('#bar2').hide();
}
//------------------------
var s_del = function(r)
{
    if(r[0]==']')
    {
        var res = r.slice(1);
        my_alert(res);
    }
    else if(r[0]=='|')
    {
        var res = r.slice(1);
        panel(res);
    }
    else console.log(r);
}
///////////////////////////////////////////////////////////////
//------------------------  read mess
function read_mess()
{
    if(active_user == 'guest') { my_alert('Դուք համակարգ մուտք չեք գործել դեռ։'); return;}
    serv_cn('read_mess.php', 'null', s_read_mess, e);
}
//-----------------------------------
var s_read_mess = function(r)
{
    r = r.trim();
    if(r[0]==']')
    {
        var res = r.slice(1);
        my_alert(res);
        return;
    }
    console.log(r);
    res = JSON.parse(r); 
    $('#mess_append').text('');
   
    var i;
    for(i=0; i<res.length; i++)
    {
        var txt = 'By ' + '<em class="w3-text-blue">' + res[i].from_u + '</em>' +  ' on ' + res[i].time + '<br>';
        txt += res[i].text + '<hr class="w3-margin-0">';
        $('#mess_append').append(txt);
    }
    $('#your_m').show();
}
///////////////////////////////////////////////////////////////
//                              create_new_user
function create_new_user()
{
    var username = $("#id_user2").val().trim();      //console.log(username);
    var psw = $("#id_psw2").val().trim();            //console.log(psw);
    var email = $("#id_email").val().trim();         //console.log(email);
    if(username == '' || psw == '' || email == '') 
    {
        $('#reg_f').hide();
        my_alert('Please fill out all filds!', 'w3-red');
        return false;
    }
    var send_var = "login="+username+"&password="+psw+"&email="+email;
    serv_cn('reg.php', send_var, s_reg, e);
    $('#reg_f').hide();
}
//---------------------------------------------------
var s_reg = function(r)
{
    r = r.trim();
    if(r[0]=='|') { r = r.slice(1); panel(r); }
    else if(r[0]==']') { r = r.slice(1); my_alert(r); }
    else console.log(r);
}
//--------------------------------------------------
function restrict(el_id)
{
    var rx = new RegExp;
    if(el_id == "id_user2") rx = /[^a-z0-9_]/gi;
    if(el_id == "id_psw2")  rx = /[^a-z0-9]/gi;
    El(el_id).value = El(el_id).value.replace(rx, ""); 
}
//////////////////////////////////////////////
//-------------------------  E M A I L _P S W 

function frg()
{
    $('#log_f').hide();
    $('#frg_psw').show();
}

//-------------------------

function em_psw()
{
    var send_var = "email=" + $("#id_email2").val().trim();
    if($("#id_email2").val().trim() == '') 
    {
        $('#frg_psw').hide();
        my_alert('Please fill out the email fild!', 'w3-red');
        return false;
    }
    serv_cn('email_psw.php', send_var, s_email_psw, e);
    $('#frg_psw').hide();
}

//-------------------------------

var s_email_psw = function(r)
{
    r = r.trim();
    if(r[0]=='|') { r = r.slice(1); panel(r); }
    else if(r[0]==']') { r = r.slice(1); my_alert(r, 'w3-red'); }
    else console.log(r);      
}
////////////////////////////////////////////////
//-----------------------  C H A N G E - P S W 

function ch_psw1()
{
    $('#log_f').hide();
    $('#ch_psw').show();
}

//--------------------------------------

function ch_psw2()
{
    var un = $('#id_chp').val().trim();
    var op = $('#id_old').val().trim();
    var np = $('#id_new').val().trim();
    if(un == '' || op == '' || np == '') 
    {
        $('#ch_psw').hide();
        my_alert('Please fill out all filds!', 'w3-red');
        return false;
    }
    var send_var = 'un='+un+'&'+'op='+op+'&'+'np='+np;
    serv_cn('ch_psw.php', send_var, s_email_psw, e);
    $('#ch_psw').hide();
}

///////////////////////////////////////////////////////////////
//------------------------  L O G I N 
function log()
{
    //$('#par').html('');
    //hide_all_form();
    // El('log_f_f').reset();
    $('#log_f').show();
}
//-----------------
function log_in() 
{ 
    var username = $("#id_user1").val().trim();
    var psw = $("#id_psw1").val().trim();
    if(username == '' || psw == '') 
    {
        my_alert('Please fill out all filds!');
        return;
    }
    var send_var = "login="+username+"&password="+psw;
    serv_cn("login.php", send_var, s_log_in, e);
    $('#log_f').hide();
}
//------------------------
var s_log_in = function(r)
{
    r = r.trim();
    if(r[0]=='|') 
    { 
        r = r.slice(1);
        active_user = r; 
        $('#who').text(active_user); 
        var s = 'Բարի գալուստ  "'+ r + '"!';
        panel(s);
    }
    else if(r[0]==']') { r = r.slice(1); my_alert(r); }
    else  console.log(r); 
}
////////////////////////////////////////////////////////////////
//-----------------------  L O G - O U T 
function out()
{
    serv_cn('log_out.php', null, s_out, e);
}
//--------------
var s_out = function()
{
    active_user = 'guest';
    $('#who').text(active_user);
}
/////////////////////////////////////////////////////////////////
//                     lutsman fail najelu click --zhamanakavor e
$(document).ready(function(){
    $("#v1").click(function(){
        send_var = 'a='+$('#a').val() + "&h=" + $('#h').val() + "&g=" + $('#g').val() + "&b=" + $('#b').val() + "&num=" + $('#num').val();
        serv_cn('view.php', send_var, s, e);
        $('#bar2').hide(); 
    });
});
//-----------------------
var s = function(r)
{
    ind = 0;
    r = r.trim();
    if(r[0]==']')
    {
        var rest = r.slice(1);
        my_alert(rest);
        return;
    }
    res = JSON.parse(r);
    if(res.length == 1)
    {
        $('#view').show();
        $('#tertel').hide();
    }
    else 
    {
        $('span').remove(".demo");
        for(i =0; i<res.length;i++)
            $('#tertel').append('<span id="trtl" class="w3-badge demo w3-border w3-transparent w3-hover-black" onclick="bdg(this)"></span>');        
        $('#tertel').show();
        $('.demo:eq(0)').attr('class', 'w3-badge demo w3-border w3-black');
        $('#view').show();
    }
    var img = "<img src='"+res[0].fn + "'";
        img += " style='max-width:800px;'>";
    $('#ramka').append(img);
    $('#hex').text(res[0].an);
    gn_st_new('#gn',res[0].mij)
    $('#rev').text(res[0].q );
}
//-----------------------               
function bdg(x){
    ind = $(x).index() - 2;
    $('.demo').attr('class', 'w3-badge demo w3-border w3-transparent w3-hover-black');
    $(x).attr('class', 'w3-badge demo w3-border w3-black');
    $('#ramka').attr('src', res[ind].fn);
    $('#hex').text(res[ind].an );
    gn_st_new('#gn',res[ind].mij) ;
    $('#rev').text(res[ind].q);
}
//----------------------------
function plusDivs(n) {
    ind = ind + n;
    if ((ind > res.length-1) ||  (ind < 0))
        ind = ind - n;
    $('#ramka').attr('src', res[ind].fn);
    $('#hex').text(res[ind].an );
    $('.demo').attr('class', 'w3-badge demo w3-border w3-transparent w3-hover-black');
    $('.demo').eq(ind).attr('class', 'w3-badge demo w3-border w3-black');
    gn_st_new('#gn',res[ind].mij) ;
    $('#rev').text(res[ind].q );
}
//////////////////////////////////////////////////////////////////
//                           mess_to_author +++
function m_to_a()
{
    if(active_user=='guest'){
        my_alert('Հեղինակին հաղորդագրություն ուղարկել կարող են միայն գրանցված օգտատերերը։');
        return;
    }
    if(active_user==res[ind].an)
    {
        my_alert('Ինքներդ ձեզ հաղորդագրություն չեք կարող ուղարկել։');
        return;
    }
    $('#l_mess_text').val('');
    $('#l_mess').show();
}
//-----------------------------------
function l_mess()
{
    if ($('#l_mess_text').val() == '')
    {
        my_alert('Հաղորդագրության դաշտը լրացված չէ։');
        return;
    }
    
    send_var = 'node=0'+'&to=' + res[ind].an + '&from=' + active_user + '&mess=' + $('#l_mess_text').val();
    serv_cn('mess_to.php', send_var, s_mess_to, e);
    $('#l_mess').hide();
}
//-----------------------------------
var s_mess_to = function(r)
{
    if(r[0]==']')
    {
        r = r.slice(1);
        my_alert(r);
        return;
    }
    if(r[0]=='|')
    {
        var r = r.slice(1);
        panel(r);
    }
    else console.log(r);
}
///////////////////////////////////////////////////////////////////
//                            nkarum e astxer faili vra
function gn_st_new(id,n)
{
    var j;
    $('#gn').html('');
    for(j=1; j<= n; j++)
        {
            $(id).append('<i class="fa fa-star"></i>');
        }
        if(j-n !== 1 ) 
            $(id).append('<i class="fa fa-star-half-o"></i>');
        for(j=1; j<= 5-n; j++)
        {
            $(id).append('<i class="fa fa-star-o"></i>');
        }
}
////////////////////////////////////////////////////////////////////
//                                          review
function review()
{
    send_var = 'id='+res[ind].id;
    serv_cn('review.php', send_var, s_rev, e);
}
//----------------------
var s_rev = function(r)
{
    r = r.trim();
    if(r[0]==']')
    {
        var res = r.slice(1);
        my_alert(res);
        return;
    }
    res = JSON.parse(r); 
    $('#review_append').text('');
   
    var i;
    for(i=0; i<res.length; i++)
    {
        gn_st_new('#review_append',res[i].gn)
        var txt = '<br>' + 'By ' + '<em class="w3-text-blue">' + res[i].us + '</em>' +  ' on ' + res[i].tm + '<br>';
        txt += res[i].tx + '<hr class="w3-margin-0">';
        $('#review_append').append(txt);
    }
    
    $('#rv').show();
} 
//////////////////////////////////////////////////////////////////////
//                         gnahatakani modaln patuhann e bacum
function tx_gn(){
    if(active_user=='guest') 
    {
        my_alert('Գնահատել կարող են միայն գրանցված և համակարգ մուտք գործած օգտատերերը։');
        return;
    }
    else if(active_user == res[ind].an)
    {
        my_alert('Չի թուլատրվում գնահատել ինքներս մեզ։')
        return;
    }

    $('#stars>i').attr('class',"fa fa-star-o");
    $('#name').val('');
    $('#txtar').val('');
    $('#tx_gn_div').show();
    n = 0;
}
///////////////////////////////////////////////////////////////////////
//                                               astxeri animacian 
$(document).ready(function(){
    $("#stars > i").mouseover(function(){ 
    $(this).attr('class','fa fa-star');
    $(this).prevAll().attr('class','fa fa-star');
    $(this).nextAll().attr('class','fa fa-star-o');
    });
});
//-----------------------------------
$(document).ready(function(){
    $("#stars>i").mouseout(function(){
    $("#stars>i").attr('class','fa fa-star-o');
    });
});
//--------------------------------------
$(document).ready(function(){
        $("#stars>i").click(function(){
        n = $(this).index()+1;
        $(this).off('mouseout');
        //$("#stars>i").off('mouseover');
        //$("#stars>i").off('click');
    });    
});
///////////////////////////////////////////////////////////////////////
//                               gnahatman hastatum - click
function tx_gn_sub(){
    send_var = 'id='+ res[ind].id +'&gn=' + n + '&tx=' + $('#txtar').val();
    serv_cn('gnt.php', send_var, s_g, e);
    $('#tx_gn_div').hide();
}
//-----------------------------------
var s_g = function(r) {
    r = r.trim();
    if(r[0]==']')
    {
        var res = r.slice(1);
        my_alert(res);
        return;
    }
    if(r[0]=='|')
    {
        var r = r.slice(1);
        res = JSON.parse(r);
        panel(res[0].s);
        $('#gn').text('');
        gn_st_new('#gn',res[0].m);
        $('#rev').text(res[0].n)
    }
}
///////////////////////////////////////////////////////////////////////
//                         forum mess
function f_forum_mess_open()
{
    if(active_user=='guest') {my_alert('Ֆորումում հաղորդագրություն կարող են թողնել միայն գրանցված օգտատերերը։'); return}
    $('#forum_mess_tema').val('');
    $('#forum_mess_text').val('');
    $('#forum_mess').show();
}
//----------------------------
function f_forum_mess_send()
{
    if($('#forum_mess_tema').val()=='' || $('#forum_mess_text').val()=='') 
        {$('#forum_mess').hide(); my_alert('Դաշտերը պարտադիր պիտի լրացվեն։'); return}
    send_var = 'parent=0&tema='+$('#forum_mess_tema').val()+'&text='+$('#forum_mess_text').val();
    console.log(send_var);
    serv_cn('forum.php', send_var, s_forum, e);
    $('#forum_mess').hide();
}
//---------------
var s_forum = function(r)
{
    r = r.trim();
    if(r[0]==']')
    {
        var res = r.slice(1);
        my_alert(res);
        return;
    }
    if(r[0]=='|')
    {
        var r = r.slice(1);
        panel(r);
    }
    else
    {
        my_alert(r);
        console.log(r);
    }
}
/////////////////////////////////////////////////////////////////////
//----------------- AJAX 
var start = function () { $("#wait").css("display", "block");}
var end = function() {  $("#wait").css("display", "none");}
function serv_cn(url_of_php, send_var, s_f, e_f)
{ 
    console.log('start ajax');
    var ajaxOptions = {
        url: url_of_php,
        data: send_var,
        type: "POST",
        beforeSend:start,
        complete:end,
        timeout:10000,
        cache:false,
        //ifModified:false, 
        //async:false,
        success: s_f,
        error: e_f,
        //always:function(x,s){alert(1);} 
    };
    $.ajax(ajaxOptions);
}
//----------------------
function submitForm() {
    $('#bar2').hide();
    var fd = new FormData(document.getElementById("fileinfo"));
    $.ajax({
        url: "upload.php",
        type: "POST",
        data: fd,
        beforeSend:start,
        complete:end,
        timeout:20000,
        success: s_file,
        error: e,
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    });
    return false;
}
var s_file = function(r)
{
    console.log(r); 
    r = r.trim();
    if(r[0]=='|') 
    { 
        r = r.slice(1);
        panel(r);
    }
    else if(r[0]==']') { r = r.slice(1); my_alert(r); }
    else  console.log(r); 
}
//-----------------------
var e = function (x)
{
    if (x.status==0) my_alert('Connection time out.  Please try again!', 'w3-blue');
    else console.log("An error occured: " + x.status + "-" + x.statusText ); 
}
///////////////////////////////////////////////////////////////////////
//--------------------------  P A N E L
function panel(s)
{
    $('#panel span').html(s);
    $('#panel').slideDown();
    $('#panel').delay(4000).slideUp();
}
////////////////////////////////////////////////////////////////////////
//                                                   Alert
function my_alert (mess, color ='w3-deep-orange')
{
    var w3_class = 'w3-container '+color;
    $('#alert').show();
    $('#message').text(mess);
    $('#al_head').attr('class', w3_class);
}