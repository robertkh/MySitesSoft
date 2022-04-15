<!DOCTYPE html>
<html lang="en">
<head>
    <title>dimord</title>
    <meta charset = "UTF-8">
    <script src="js/jquery-3.1.1.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
    <script type = "text/javascript" src = "js/dimord_script.js"></script> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css">
    <link href='//fonts.googleapis.com/css?family=Pacifico' rel='stylesheet'>
    <style>
    img {pointer-events: none;}
    .mySlides {display:none}
    .w3-left, .w3-right, .w3-badge, .ptr {cursor:pointer}
    .w3-badge {height:13px; width:13px; margin: 5px; padding:0}
    .w3-bar-item {font-size: 30px;}
    .logo {font-family: 'Pacifico'}
    select {width:  100px;}
    .r-or {color:orange}
    </style>
</head>
<!--  ******************************************************  -->
<body onload="b_load()">
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<!--    =====================    P A N E L    ===========================  -->
<div id = 'panel' class="w3-container w3-light-green w3-center w3-large w3-padding-tiny" style = "display:none; position: absolute; width:100%; heigth:64px; z-index:10;">
      <i class="fa fa-check-square-o" style="color:green"></i>
      <span></span>
      <a href ='#' class ='w3-closebtn w3-text-white w3-hover-text-black' onclick="$('#panel').hide()">&times;</a>
</div>
<!--  ***************************  D i m o r d   BAR  ***************************  -->
<div class="w3-bar w3-top w3-border w3-black">
  <span class="w3-bar-item logo">D i m o r d</span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white" onclick="up_toggle()">Upload</span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white" onclick="vw_toggle()">View</span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white" onclick="dl_toggle()">Delete</span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white" onclick="f_forum()">Forum</span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white w3-right" onclick='out()'><i class="fa fa-sign-out"></i></span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white w3-right" onclick="log()"><i class="fa fa-sign-in"></i></span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white w3-right" onclick="$('#reg_f').show()"><i class="fa fa-registered"></i></span>
  <span class="w3-bar-item w3-button w3-hover-none w3-text-grey w3-hover-text-white w3-right" onclick="read_mess()" title="Կարդացեք ձեզ ուղղված հաղորդագրությունները"><i class="fa fa-commenting-o" ></i></span>
  <span id='who' class = 'w3-right w3-bar-item logo'></span> 
</div>
<br>
<!--  **********************    Form       ********************************  -->
<div id='bar2'  class="w3-bar" style="display:none; margin-top:50px;  ">
<form id="fileinfo">
    <select name="a" id='a' class="w3-bar-item w3-margin-left w3-select w3-border w3-small " style="width: 10%" onchange="test()">
      <option value="" disabled selected>Առարկա</option>
    	<option value="մաթ">մաթ</option>
    	<option value="ֆիզ">ֆիզ</option>
    </select>
    <select name="tt" id='tt' class="w3-bar-item w3-margin-left w3-select w3-border w3-small" style="width: 10%">
      <option value="" disabled selected>Տարեթիվ</option>
      <option value="2012">2012</option>
      <option value="2013">2013</option>
      <option value="2014">2014</option>
      <option value="2015">2015</option>
      <option value="2016">2016</option>
    </select>
    
    <select name="h" id='h' class="w3-bar-item w3-margin-left w3-select w3-border w3-small" style="width: 10%">
      <option value="" disabled selected>Հատոր</option>
    	<option value="1">1</option>
    	<option value="2">2</option>
    	<option value="3">3</option>
    </select>
    
    <select name="g" id='g' class="w3-bar-item w3-margin-left w3-select w3-border w3-small" style="width: 10%">
      <option value="" disabled selected>Գլուխ</option>
    	<option value="1">1</option>
    	<option value="2">2</option>
    	<option value="3">3</option>
      
    </select>
    
    <select name="b" id='b' class="w3-bar-item w3-margin-left w3-select w3-border w3-small" style="width: 10%">
      <option value="" disabled selected>Բաժին</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
    
    <input type="number" id='num' class="w3-bar-item w3-margin-left w3-border w3-small" name="num" min="1" max="50" placeholder="Համար" style="width: 10%">
    <input type="file" id = 'file' name="file" class="w3-bar-item w3-margin-left w3-border w3-small w3-padding-medium" style="width: 17%">     
</form>
    <input type="button" id = 'v1' value ="Դիտել" class="w3-dark-grey ptr w3-bar-item w3-margin-left w3-small" style="width: 10%">
    <input type="button" id = 'dl' value ="Հեռացնել" onclick="del()" class=" w3-dark-grey ptr w3-bar-item w3-margin-left w3-border w3-small" style="width: 10%"> 
    <input type="button" id = 'upload' value="Վերբեռնել"  onclick ="submitForm();" class=" w3-dark-grey ptr w3-bar-item w3-margin-left w3-border w3-small " style="width: 10%">
</div>
<main  class="w3-container" style="margin-top:40px; margin-bottom: 40px; ">
<!--  ************************   R A M K A   ******************************  -->
<div id = 'view' class="w3-border w3-padding-small w3-margin-top" style="display: none;max-width:800px; margin: auto;">
  <div>
    <span class="w3-small"> (հեղինակ) </span>
    <span id='hex'></span>
    <span id='r-m' class="ptr w3-padding-left" style='display:inline-block;' onclick="m_to_a()"  title><i class="fa fa-edit" style="color:blue"></i></span>

    <span id='tx_gn' class='ptr w3-right w3-padding-right w3-text-blue' onclick="tx_gn()" data-toggle="tooltip" data-placement="bottom" title="Գնահատել այս լուծումը">Գնահատել</span>
    <span class='ptr w3-right w3-padding-right w3-margin-right w3-text-blue' style='display:inline-block;' onclick="review()" data-toggle="tooltip" data-placement="bottom" title="Ծանոթացեք տվյալ լուծման գնահատականներին">-review(s)</span>
    <span id='rev' class="w3-right"></span>
    <span id='gn' class="w3-right w3-padding-right w3-margin-right" style='display:inline-block; cursor: initial'></span> 
  </div>
  <hr>
	<div id='ramka' style="max-width:800px;"></div>
  <div id = 'tertel' class="w3-center  w3-section w3-large w3-text-red" style="width:100% ; display: none;">
    <div class="w3-left w3-padding-left w3-text-black w3-hover-text-red" onclick="plusDivs(-1)">&#10094;</div>
    <div class="w3-right w3-padding-right w3-text-black w3-hover-text-red" onclick="plusDivs(1)">&#10095;</div>
  </div>
</div>
<!--  ****************************   F O R U M                   **************************  -->
<div id='forum' class="w3-container" style="display:none;max-width:800px; margin: auto;"></div>
<div id='forum_button' style="display: none;">
    <button id='forum-b-b' class="w3-btn w3-white w3-border w3-border-red w3-round-xxlarge" style="position: fixed;bottom: 30px; right: 10px;" onclick="f_forum_mess_open()">+</button>
</div>
</main>
<!--  ****************************   Թողնել haxordadrutyun    **************************  -->
<div id='l_mess' class='w3-modal'>
    <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:400px">   
        <div class = "w3-container w3-center w3-light-grey">
                        <h5>Թողնել Հաղորդագրություն</h5>
        </div>
        <div class="w3-padding-medium">
        <textarea id='l_mess_text' class="w3-section w3-padding-small" style="width:100%;" placeholder="Հաղորդագրությունը՝ այստեղ։ Այն միայն հեղինակը կարող է կարդալ։"></textarea>
        </div>
        <div class="w3-container w3-border-top w3-padding-8 w3-dark-grey">
          <button class="w3-btn w3-green" onclick ="l_mess()">Submit</button>
          <button class="w3-btn w3-red w3-right" onclick = "$('#l_mess').hide()">Cancel</button>
        </div>
    </div>
</div>
<!-- ========================   R E V I E W =========================== -->
<div id='rv' class='w3-modal'>
  <div class="w3-modal-content  w3-card-8 w3-animate-top w3-padding-medium" style="max-width:400px">
    <span onclick="$('#rv').hide()" 
        class="w3-closebtn w3-text-light-blue w3-container w3-padding-8 w3-display-topright"> &times;
    </span>
    <div class="w3-container w3-center">
      <h4 >Review(s)</h4>
    </div>
    <hr class="w3-margin-0">
    <div id = 'review_append'></div>
 </div>
</div>
<!-- ========================  ՄԵՍՍ կարդալ =========================== -->
<div id='your_m' class='w3-modal'>
  <div class="w3-modal-content  w3-card-8 w3-animate-top w3-padding-medium" style="max-width:400px">
    <span onclick="$('#your_m').hide()" 
        class="w3-closebtn w3-text-light-blue w3-container w3-padding-8 w3-display-topright"> &times;
    </span>
    <div class="w3-container w3-center">
      <h4 >Ձեր հաղորդագրությունները</h4>
    </div>
    <hr class="w3-margin-0">
    <div id = 'mess_append'></div>
 </div>
</div>
<!--  ****************************   Թողնել Գնահատական    **************************  -->
<div id='tx_gn_div' class='w3-modal'>
  <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:400px">   
    <div class = "w3-container w3-center w3-light-grey">
      <h5>Թողնել Գնահատական</h5>
    </div>  
    <div class="w3-padding-medium">
      <div id='stars' class = "w3-container w3-center w3-padding-8 w3-text-orange">
        <i class="fa fa-star-o" style="cursor:pointer"></i>
        <i class="fa fa-star-o" style="cursor:pointer"></i>
        <i class="fa fa-star-o" style="cursor:pointer"></i>
        <i class="fa fa-star-o" style="cursor:pointer"></i>
        <i class="fa fa-star-o" style="cursor:pointer"></i>
      </div> 
      <textarea id='txtar' class="w3-section w3-padding-small" style="width:100%;" placeholder="Feedback"></textarea>
    </div>     
    <div class="w3-container w3-border-top w3-padding-8 w3-dark-grey">
      <button class="w3-btn w3-green" onclick ="tx_gn_sub()">Submit</button>
      <button class="w3-btn w3-red w3-right" onclick = "$('#tx_gn_div').hide()">Cancel</button>
    </div>
  </div>
</div>
<!-- ========================   M O D A L    W A I T    ==================== -->
<div id="wait" class="w3-modal" style="display:none;">
  <div class="w3-display-middle" >
    <span><i class="fa fa-refresh fa-spin" style="font-size:40px;color:orange"></i></span>
  </div>
</div>
<!-- ========================   M O D A L    A L E R T    ==================== -->
<div id="alert" class="w3-modal">
  <div id = 'alert_1' class="w3-modal-content w3-card-2" style="width:400px; top:100px;">
    <header id='al_head' class="w3-container">        
      <span onclick="$('#alert').hide()" class="w3-closebtn w3-padding-top w3-large">&times;</span>
      <h5>Message from <span class='logo'>Dimord</span> :</h5>
    </header>
    <div id="message" class="w3-large w3-padding-large w3-small"></div>
 </div>
</div>
<!-- =====================   L O G I N   ========================= -->
<div id="log_f" class='w3-modal'>
 <div class="w3-modal-content w3-card-8 w3-animate-zoom" style="max-width:600px">
            
   <div class="w3-center"><br>
     <span class = "w3-xxlarge w3-padding-medium"><i class='fa fa-user'></i></span>
   </div>
                
   <form class="w3-container" id ='log_f_f'>
     <div class="w3-section">
       <label><b>Username</b></label>
       <input class="w3-input w3-border w3-margin-bottom" type="text" 
              placeholder="Enter Username"  id ="id_user1" required>
       <label><b>Password</b></label>
       <input class="w3-input w3-border" type="password" 
              placeholder="Enter Password" id ="id_psw1" required>
       <button type='button' class="w3-btn-block w3-green w3-section w3-padding" onclick ="log_in()">login</button>
     </div>
   </form>
                
   <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
     <button onclick = "$('#log_f').hide()" type = "button" class = "w3-btn w3-red">Cancel</button>
     <span class="w3-right w3-padding"> Forgot 
       <a href="#" onclick ="frg()">password?</a>
     </span>
     <span class="w3-right w3-padding"> Change 
       <a href="#" onclick ="ch_psw1()">password?</a>
     </span>
   </div>
                
 </div>
</div>
<!-- ========================   F O R G E T   P S W   ============================= -->
<div id='frg_psw' class='w3-modal'>
 <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:600px">
  <div class="w3-container w3-center w3-light-grey">
    <h2>Send Password</h2>
  </div>    
  <form id = 'frg_psw_f' class="w3-container">
    <div class="w3-section">
       <label><b>Email</b></label>
       <input id ="id_email2" class="w3-input w3-border" type="email" 
              name ="email" placeholder="Enter Email">
    </div>
  </form>        
  <div class="w3-container w3-border-top w3-padding-8 w3-dark-grey">
    <button onclick ="em_psw()" class="w3-btn w3-green" >Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#frg_psw').hide()">Cancel</button>
  </div>
</div>
</div>
<!-- =====================   C H A N G E   P S W   ======================== --> 
<div id="ch_psw" class='w3-modal'>
  <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:600px">        
    <div class="w3-container w3-center w3-light-grey">
      <h2>Change Password</h2>
    </div>
    <form id = 'ch_psw_f' class="w3-container">
      <div class="w3-section">
        <label><b>Username</b></label>
        <input id ="id_chp" class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="usrname" required>
        <label><b>Old Password</b></label>
        <input id ="id_old" class="w3-input w3-border w3-margin-bottom" type="password" placeholder="Enter Old Password" required>
        <label><b>New Password</b></label>
        <input id ="id_new" class="w3-input w3-border" type="password" placeholder="Enter New Password" required>
      </div>
    </form>
    <div class="w3-container w3-border-top w3-padding-8 w3-dark-grey">
      <button onclick ="ch_psw2()" class="w3-btn w3-green" >Submit</button>
      <button class="w3-btn w3-red w3-right" onclick = "$('#ch_psw').hide()">Cancel</button>
    </div>         
  </div>
</div>
<!--  ****************************   forum message    **************************  -->
<div id='forum_mess' class='w3-modal'>
    <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:400px">   
        <div class = "w3-container w3-center w3-light-grey">
                        <h5>Թողնել Հաղորդագրություն ֆորումում</h5>
        </div>
        <div class="w3-padding-medium">
        <input type="text" class="w3-padding-small" id="forum_mess_tema" placeholder="Հաղորդագրության թեման՝ այստեղ։" style="width: 100%" required>
        <textarea id='forum_mess_text' class="w3-section w3-padding-small" style="width:100%;" placeholder="Հաղորդագրությունն՝ այստեղ։"></textarea>
        </div>
        <div class="w3-container w3-border-top w3-padding-8 w3-dark-grey">
          <button class="w3-btn w3-green" onclick ="f_forum_mess_send()">Submit</button>
          <button class="w3-btn w3-red w3-right" onclick = "$('#forum_mess').hide()">Cancel</button>
        </div>
    </div>
</div>
<!--  ****************************   Պատասխան forum հեղինակին    **************************  -->
<div id='forum_mess_reply' class='w3-modal'>
    <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:400px">   
        <div class = "w3-container w3-center w3-light-grey">
                        <h5>Պատասխան հեղինակին</h5>
        </div>
        <div class="w3-padding-medium">
        <input type="text" class="w3-padding-small" id="forum_mess_reply_tema" disabled style="width: 100%">
        <textarea id='forum_mess_reply_text' class="w3-section w3-padding-small" style="width:100%;" placeholder="Պատասխանն այստեղ։"></textarea>
        </div>
        <div class="w3-container w3-border-top w3-padding-8 w3-dark-grey">
          <button class="w3-btn w3-green" onclick ="f_forum_mess_reply_send()">Submit</button>
          <button class="w3-btn w3-red w3-right" onclick = "$('#forum_mess_reply').hide()">Cancel</button>
        </div>
    </div>
</div>
<!-- ========================   R E G I S T E R   =========================== -->
<div id='reg_f' class='w3-modal'>
<div class="w3-modal-content w3-card-8 w3-animate-top" style = 'max-width:600px'>
    <div class = "w3-container w3-center w3-light-grey">
        <h2>Sign Up</h2>
    </div>
    <form id = 'reg_f_f' class="w3-container">
        <div class="w3-section">
            <label><b>Username</b></label>
            <input id ="id_user2" oninput="" class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username"  required>
            <label><b>Email</b></label>
            <input id ="id_email" onblur = "" class="w3-input w3-border w3-margin-bottom" type="email" placeholder="Enter Email"  required>
            <label><b>Password</b></label>
            <input id ="id_psw2" oninput="" class="w3-input w3-border" type="password" placeholder="Enter Password"  required>
        </div>
    </form>
    <div class="w3-container w3-border-top w3-padding-8 w3-dark-grey">
        <button class="w3-btn w3-green" onclick ="create_new_user()">Submit</button>
        <button class="w3-btn w3-red w3-right" onclick = "$('#reg_f').hide()">Cancel</button>
    </div>      
</div>
</div>
<!-- ============================================================== -->
<footer class="w3-bottom w3-dark-grey" > 
    <span class="w3-padding-left">2017 &copy;</span>   
    <span class="w3-padding-left"> Contact : <a href="mailto:robert.khnkoyan@gmail.com?Subject=dimord" target="_top"><i class="fa fa-envelope-o  w3-text-orange"></i></a> </span>
    <a class="w3-padding-left  w3-hover-text-white" href="tut.html" target="_blank" style="text-decoration:none">Tutorial</a> 

    <div class="fb-share-button w3-padding-left" data-href="http://robertkh.atwebpages.com/" data-layout="button_count" data-mobile-iframe="false"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frobertkh.atwebpages.com%2F&amp;src=sdkpreparse">Share</a></div>
</footer>
</body>
</html>