<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en" manifest="">

<!-- ========================   H E A D   =========================== -->

<head>
    <title> Vocabulary </title>
    <meta charset = "UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type = "text/javascript" src = "js/myscript.js"></script>
    <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
    <link rel="stylesheet" href="css/indigo.css">
    <link rel="stylesheet" href="css/diagr.css">
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
    <style> 
         
        #im {  background-image: url("img/im4.jpg");background-size:cover;}
        #d2 {  background-image: url("img/im.jpg");background-size:cover;}
        .center {margin:auto ; max-width:600px;} 
        #l {
               border-top-left-radius: 17px;
               border-bottom-left-radius: 17px;
               font-weight: bold;
               width:46px;
        }
        #r {
               border-top-right-radius: 17px;
               border-bottom-right-radius: 17px;
               font-weight: bold;
               width:46px;
        }
        .top1000 {
            margin-bottom:-10px;
        }
       
    </style>
</head>

<!-- =================================================== -->
            
<body onload = "st()" class = 'w3-theme-l5'>




<!-- ========================   N A V    B A R   =========================== -->

<div id="myside"  class="w3-modal">
 <nav class=" w3-sidenav w3-card-2  w3-top w3-animate-left" style="width:300px;z-index:2">

   <div class="w3-container w3-text-white w3-margin-bottom" id='im'>
     <div class="w3-padding-8 w3-center">
        <i class="fa fa-user w3-xlarge"></i>
        <br/>
        <span class="w3-padding-8 w3-text-center" id = 'who'>No User</span>
     </div>
   </div>
            
   <a href ="#" onclick ="reg()">Create Account</a>
   <a href ="#" onclick ="log()">Sign In</a>
   <a href ="#" onclick ="out()">Sign Out</a>
   <a href ="#" onclick ="ch_psw1()"> Change Password</a>
   
   <hr/>
   <a href ="#" onclick = 'diag()'>Number of Words</a>
   <a href ="#" onclick = 'sv_start()'>Save</a>
   <a href ="#" onclick = 'dld_start()'>Download</a>
   <a href ="#" onclick = 'trans()'>Translation</a>
   <br/>
   

   <div id = "d2" class='w3-center w3-padding-4 w3-text-white w3-wide w3-margin-bottom'>
      <b >Usfull Links</b>
   </div>
            
   <a href ="https://en.oxforddictionaries.com/" target="_blank">Oxford Dictionary</a>
   <a href ="https://en.oxforddictionaries.com/key-to-pronunciation" 
      target="_blank">Pronunciation</a>
   <!-- <a href ="#" onclick = 'rrr()'>rrr</a>
   <a href ="#" onclick = 'cl_str()'>clear storage</a> -->
 </nav>
</div>



<!--    =====================    P A N E L    ===========================  -->

<header class="w3-top">

<!--    =====================    P A N E L    ===========================  -->

<div id = 'panel' class="w3-container w3-light-green w3-center w3-large w3-padding-tiny" 
	    style = "display:none; position: absolute; width:100%; z-index:1;">
  <i class="fa fa-check-square-o" style="color:green"></i>
  <span></span>
  <a href ='#' class ='w3-closebtn w3-text-white w3-hover-text-black' 
  	  onclick="$('#panel').hide()">&times;</a>
</div>
        
<!-- ========================  F I R S T   B A R    ======================= -->
        
<div class="w3-row w3-center w3-theme w3-padding-8  w3-xlarge">

  <div class="w3-col" style = 'width:20%'>
    <a href="#">
    	  <i class="fa fa-bars w3-xlarge w3-padding-medium" onclick="$('#myside').show()"></i>
    </a>
  </div>

  <div class="w3-container w3-col" style = 'width:60%' id='logo'>
    <span class = 'w3-text-orange' >My</span> <i>Vocabulary</i>
  </div>

  <div class="w3-col" style = 'width:20%'>
    <a href="#" onclick='add()'> <i class='fa fa-plus-circle'></i></a>
  </div>

</div>
        
<!-- ========================   S E C O N D   B A R  ======================= -->
        
<div class="w3-row w3-theme-l3 w3-padding-4 w3-center">
<form>

  <div class = 'w3-col radio' style = 'width:20%'>
    <input class="w3-radio" type="radio" name="select" value="all" checked>
    <label class="w3-validate">All</label>
  </div>
            
  <div class = 'w3-col' style = 'width:60%'>
    <input class="w3-input w3-border w3-border-indigo w3-round w3-padding-tiny" 
    	      type="text" placeholder="Search for words ..." id="myInput" onkeyup="myFunction()">
  </div>
            
  <div class = 'w3-col radio' style = 'width:20%'>
    <input class="w3-radio" type="radio" name="select" value="fav">
    <label class="w3-validate">Fav</label>
  </div>

</form>
</div>

 <!-- ================================================== -->
  
</header>
<main class="w3-container" style="margin-top:110px; margin-bottom:50px;">

<!-- ========================   M O D A L    A L E R T    ==================== -->

<div id="alert" class="w3-modal">
 <div id = 'alert_1' class="w3-modal-content w3-card-2" style="width:400px; top:100px;">
                
    <header id='al_head' class="w3-container"> 
       <span onclick="document.getElementById('alert').style.display='none'" 
             class="w3-closebtn w3-padding-top w3-large">&times;</span>
       <h5>Message from My<i>Vocabulary</i> :</h5>
    </header>
    
    <div id="message" class="w3-large w3-padding-large w3-small">
    </div>

 </div>
</div>

<!-- ========================   M O D A L    W A I T    ==================== -->

<div id="wait" class="w3-modal" style="display:none;">

  <div class="w3-display-middle" >
   	<img src='img/wait.gif'  alt="Please Wait.." width="64" height="64" />
  </div>

</div>
                
<!-- ========================   D I A G R A M  =========================== -->

<div id='diag' class='w3-modal'>
 <div class="w3-modal-content w3-center w3-card-8 w3-animate-zoom" style="max-width:600px">

    <span onclick="$('#diag').hide()" 
    	  class="w3-closebtn w3-text-light-blue w3-container w3-padding-8 w3-display-topright"> &times;
    </span>

    <div class="w3-container w3-theme-d1">
      <h3 id = 'number' class = 'w3-left '></h3>
    </div>
    
    <div id = 'table' class = 'w3-container  w3-padding-tiny w3-tiny'>
    </div>

 </div>
</div>

<!-- ========================   F O R M S  ============================= -->  

<div id = 'forms' class = 'center'>

<div id="form" class='w3-hide w3-card-8 w3-animate-zoom'>
        
  <div class="w3-container w3-center w3-theme-l1">
     <h2>Input Form</h2>
  </div>
            
  <form class="w3-container">
    <div class="w3-section">
       <label><b>Username</b></label>
       <input class="w3-input w3-border w3-margin-bottom" type="text" 
       	      placeholder="Enter Username" name="usrname" required>
       <label><b>Password</b></label>
       <input class="w3-input w3-border" type="password" placeholder="Enter Password" 
       	      name="psw" required>
    </div>
  </form>
            
  <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <button class="w3-btn w3-green" >Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#form').hide()">Cancel</button>
  </div>
            
</div>
	
<!-- ========================   R E G I S T E R   =========================== -->

<div id='reg_f' class="w3-card-8" style = 'display:none;'>
        
  <div class = "w3-container w3-center w3-theme-l1">
    <h2>Sign Up</h2>
  </div>
            
  <form id = 'reg_f_f' class="w3-container">
    <div class="w3-section">
       <label><b>Username</b></label>
       <input id ="id_user2" oninput="" class="w3-input w3-border w3-margin-bottom" 
       	      type="text" placeholder="Enter Username"  required>
       <label><b>Email</b></label>
       <input id ="id_email" onblur = "" class="w3-input w3-border w3-margin-bottom" 
       	      type="email" placeholder="Enter Email"  required>
       <label><b>Password</b></label>
       <input id ="id_psw2" oninput="" class="w3-input w3-border" type="password" 
       	      placeholder="Enter Password"  required>
     </div>
  </form>
            
  <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <button class="w3-btn w3-green" onclick ="create_new_user()">Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#reg_f').hide()">Cancel</button>
  </div>
            
</div>

<!-- ========================   S A V E   =========================== -->

<div id='save' class="w3-card-8" style = 'display:none;'>
        
  <div class = "w3-container w3-center w3-theme-l1">
    <h2>Save On The Server</h2>
  </div>
           
     <div id='date' class="w3-panel">
       
    </div>       
  
    <div class="w3-panel">
       Շարունակել նոր տվյալների պահպանումը?
    </div>
 
            
  <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <button class="w3-btn w3-green" onclick ="sv()">Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#save').hide()">Cancel</button>
  </div>
            
</div>
        
<!-- ========================   D L D  =========================== -->

<div id='dld' class="w3-card-8" style = 'display:none;'>
        
  <div class = "w3-container w3-center w3-theme-l1">
    <h2>Download From The Server</h2>
  </div>
           
     <div id='dld_dt' class="w3-panel">
       
    </div>       
  
    <div class="w3-panel">
       Շարունակել տվյալների ներբեռնումը?
    </div>
 
            
  <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <button class="w3-btn w3-green" onclick ="dld()">Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#dld').hide()">Cancel</button>
  </div>
            
</div>

<!-- ========================   T R A N S L A T E  =========================== -->

<div id='trn' class="w3-card-8" style = 'display:none'>
        
  <div class = "w3-container w3-center w3-theme-l1">
    <h2>Translate Text</h2>
  </div>
           
    <div  class="w3-panel">
     	<textarea id='txt' style="width:100%;">
		</textarea>
    </div>       
  
    <div id='trans' class="w3-panel"> 
    </div>
 
            
  <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <button class="w3-btn w3-green" onclick ="st_trans()">Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#trn').hide()">Cancel</button>
  </div>
            
</div>
<!-- =====================   L O G I N   ========================= -->

<div id="log_f" class='w3-modal'>
 <div class="w3-modal-content w3-card-8 w3-animate-zoom" style="max-width:600px">
            
   <div class="w3-center"><br>
     <span class = "w3-badge w3-xlarge w3-green w3-padding-medium"><i class='fa fa-user'></i></span>
   </div>
                
   <form class="w3-container" id ='log_f_f'>
     <div class="w3-section">
       <label><b>Username</b></label>
       <input class="w3-input w3-border w3-margin-bottom" type="text" 
       	      placeholder="Enter Username"  id ="id_user1" required>
       <label><b>Password</b></label>
       <input class="w3-input w3-border" type="password" 
       	      placeholder="Enter Password" id ="id_psw1" required>
       <button class="w3-btn-block w3-green w3-section w3-padding" onclick ="log_in()">Login</button>
     </div>
   </form>
                
   <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
     <button onclick = "$('#log_f').hide()" type = "button" class = "w3-btn w3-red">Cancel</button>
     <span class="w3-right w3-padding"> Forgot 
     	 <a href="#" onclick ="frg()">password?</a>
     </span>
   </div>
                
 </div>
</div>
        
<!-- ========================   F O R G E T   P S W   ============================= -->

<div id='frg_psw' class="w3-card-8" style = 'display:none;' >
        
  <div class="w3-container w3-center w3-theme-l1">
    <h2>Send Password</h2>
  </div>
            
  <form id = 'frg_psw_f' class="w3-container">
    <div class="w3-section">
       <label><b>Email</b></label>
       <input id ="id_email2" class="w3-input w3-border" type="email" 
       	      name ="email" placeholder="Enter Email">
    </div>
  </form>
            
  <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <button onclick ="em_psw()" class="w3-btn w3-green" >Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#frg_psw').hide()">Cancel</button>
  </div>
            
</div>
        
<!-- =====================   C H A N G E   P S W   ======================== -->
             
<div id="ch_psw" class='w3-card-8' style = 'display:none'>
        
  <div class="w3-container w3-center w3-theme-l1">
    <h2>Change Password</h2>
  </div>
            
  <form id = 'ch_psw_f' class="w3-container">
    <div class="w3-section">
      <label><b>Username</b></label>
      <input id ="id_chp" class="w3-input w3-border w3-margin-bottom" 
      	      type="text" placeholder="Enter Username" name="usrname" required>
      <label><b>Old Password</b></label>
      <input id ="id_old" class="w3-input w3-border w3-margin-bottom" type="password" 
      	      placeholder="Enter Old Password" required>
      <label><b>New Password</b></label>
      <input id ="id_new" class="w3-input w3-border" type="password" 
      	      placeholder="Enter New Password" required>
    </div>
  </form>
            
  <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <button onclick ="ch_psw2()" class="w3-btn w3-green" >Submit</button>
    <button class="w3-btn w3-red w3-right" onclick = "$('#ch_psw').hide()">Cancel</button>
  </div>
            
</div>
        
<!-- =======================   S P E L L I N G   ======================== -->
             
<div id='f_sp' class='w3-card-8' style = 'display:none' >
        
  <div class="w3-container w3-center w3-theme-l1">
    <span onclick="$('#f_sp').hide()" class="w3-closebtn">&times;</span>
    <h2>Spelling</h2>
  </div>
            
  <div class="w3-row w3-padding-small w3-theme-l4">

    <div class="w3-row w3-col s6 ">
      <div class="w3-container w3-padding-0 w3-center w3-col s5">
        C: <span id = 'num' class="w3-tag w3-yellow"></span>
      </div>
      <div class="w3-container w3-padding-0 w3-center w3-col s7">
        T: <span id = 'sum' class="w3-tag w3-yellow"></span>
      </div>
    </div>

    <div class="w3-row  w3-right-align w3-col s6">
      <div class="w3-container w3-padding-0 w3-center w3-col s6">
        R: <span id = 'p' class="w3-badge w3-green"></span>
      </div>
      <div class="w3-container w3-padding-0 w3-center w3-col s6">
        W: <span id = 'n' class="w3-badge w3-red"></span> 
      </div>
    </div>

  </div>
            
  <form class="w3-container">
   <div class="w3-section">
                    
      <div>      
        <label ><b>Rus</b></label>
        <input id ="sp_2_1" class="w3-input w3-border" name="first" type="text" disabled >
      </div>
      
      <div class="w3-row  w3-group"> 
        
        <div class = 'w3-col' style = 'width:49%'>
          <label ><b>Eng</b></label>
          <input id ="sp_2_2" class="w3-input w3-border" type="text"  autocomplete="off" autofocus>
        </div>
        
        <div class = 'w3-col w3-right' style = 'width:49%' >
          <label ><b>Answer</b></label>
          <input id ="hint" class="w3-input w3-border w3-text-left" type="text" disabled>
        </div>

      </div>
   
   </div>
  </form>
            
  <div class="w3-center w3-container w3-border-top w3-padding-8 w3-theme-l4">
    <a href="#" class="w3-btn w3-theme-d2" onclick ="sp_prev()" id = "l">
      <i class='fa fa-chevron-left' style='font-size:18px'></i>
    </a>
    <input id = 'hint_btn' type = "button" value = ' Hint' 
    	      class="w3-btn w3-theme-d2" onclick = "hush()" > 
    <input onclick ="checkw()" type="button" value = 'Check' class="w3-btn w3-theme-d2" > 
    <a onclick ="sp_next()" id = "r" href="#" class="w3-btn w3-theme-d2" >
      <i class='fa fa-chevron-right' style='font-size:18px'></i>
    </a>
  </div>
            
</div>
        
<!-- ======================   U P D A T E    W O R D   ============================ -->

<div id='div_up' class='w3-modal'>
 <div class="w3-modal-content w3-card-8 w3-animate-zoom" style="max-width:600px">
            
   <div class="w3-container w3-center w3-theme-l1">
     <h2 id = 'id_word'>word</h2>
   </div>
            
   <!--
     <span  class="w3-closebtn w3-container w3-padding-16 w3-display-topright" >
     <input class="w3-check" type="checkbox" id = 'top'>
     <i class="fa fa-star w3-text-white"></i>
     </span>
   -->
  <form id='u_w_f' class="w3-container">
    <div class="w3-section">

       <input id ="id_id" class="w3-input w3-hide" type="text">
       <label><b>Pronunciation</b></label>
       <input id ="up_pr" class="w3-input w3-border w3-margin-bottom" type="text" required>
       <label><b>P.o.s.</b></label>
       <select id ="id_pos" class="w3-select w3-border w3-margin-bottom" name="option" >
          <option value="" disabled selected>Part Of Speach</option>
          <option value ="verb"> verb </option>
          <option value ="noun"> noun</option>
          <option value ="adjective"> adjective </option>
          <option value ="adverb"> adverb </option>
          <option value ="pronoun">pronoun </option>
          <option value ="preposition"> preposition </option>
          <option value ="conjunction"> conjunction </option>
          <option value ="interjection"> interjection </option>
       </select>
       <label><b>Translation</b></label>
       <input id ="id_trans" class="w3-input w3-border w3-margin-bottom" type="text">
       <label><b>Example</b></label>
       <textarea id ="id_ex" class="w3-input w3-border" ></textarea>

     </div>
   </form>
            
   <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
     <button onclick='up_submit()' class="w3-btn w3-green" >Update</button>
     <button class="w3-btn w3-red w3-right" onclick="$('#div_up').hide()">Cancel</button>
   </div>
            
 </div>
</div>
        
<!-- =========================    N E W   W O R D   =========================== -->

<div id='n_w_f' class='w3-modal'>
 <div class="w3-modal-content w3-card-8 w3-animate-zoom" style="max-width:600px">
           
   <div class="w3-container w3-center w3-theme-l1">
     <h2>Add Word</h2>
   </div>
            
   <form id = 'n_w_f_f' class="w3-container">
   <div class="w3-section">

     <label><b>Word</b></label>
     <input id ="id1" class="w3-input w3-border w3-margin-bottom" type="text" required>
     <label><b>Pronunciation</b></label>
     <input id ="pr" class="w3-input w3-border w3-margin-bottom" type="text" required>
     <label><b>P.o.s.</b></label>
     <select id ="id2" class="w3-select w3-border w3-margin-bottom" name="option" >
        <option value="" disabled selected>Part Of Speach</option>
        <option value ="verb"> verb </option>
        <option value ="noun">noun</option>
        <option value ="adjective"> adjective </option>
        <option value ="adverb"> adverb </option>
        <option value ="pronoun">pronoun </option>
        <option value ="preposition"> preposition </option>
        <option value ="conjunction"> conjunction </option>
        <option value ="interjection"> interjection </option>
      </select>
      <label><b>Translation</b></label>
      <input id = 'id3' class="w3-input w3-border w3-margin-bottom" type="text">
      <label><b>Example</b></label>
      <textarea id ="id4" class="w3-input w3-border" ></textarea>
   
   </div>
   </form>
            
   <div class="w3-container w3-border-top w3-padding-8 w3-theme-l4">
     <button id='new_w' onclick='add_new()' class="w3-btn w3-green" >Submit</button>
     <button class="w3-btn w3-red w3-right" onclick="$('#n_w_f').hide()">Cancel</button>
   </div>
            
  </div>
 </div>
</div>     

<!-- ========================================================================= -->
             
  <div id = 'par' class='center'></div>
</main>

<!-- ========================================================================= -->

<footer class="w3-bottom w3-container w3-theme-d5">
 <div class="w3-content w3-row w3-padding-small center" style="width:100%" id = 'ass'>
        
   <div class="w3-container w3-row w3-navbar w3-center">
     
     <div class="w3-content w3-col s4 ">
       <a href = '#'  class='w3-bottombar w3-border-indigo w3-hover-border-white' 
       	  onclick="eng_rus_m()">EN<i class="fa fa-long-arrow-right"></i>NL
       </a>
     </div>
     <div class="w3-content w3-col s4">
       <a href = '#'  class='w3-bottombar w3-border-indigo w3-hover-border-white' 
       	  onclick="rus_eng_m()">NL<i class="fa fa-long-arrow-right"></i>EN
       </a>
     </div>
     <div class="w3-content w3-col s4">
       <a href = "#" class='w3-bottombar w3-border-indigo w3-hover-border-white' 
       	  onclick="sp_1()"> Spelling
       </a>
     </div>
     
   </div>
 
 </div>
</footer>
    
</body>

<!-- ========================================================================== -->