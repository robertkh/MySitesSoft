<?php
//define(servername,"fdb12.awardspace.net");
//define(username,"2174963_db");
//define(password,"asmit2016");
//define(db, "2174963_db");
//$conn = mysqli_connect(servername,username,password,db);
$servername = "fdb12.awardspace.net";
$username = "2174963_db";
$password = "asmit2016";
$db = "2174963_db"; 
$conn = mysqli_connect($servername, $username, $password, $db);
mysqli_query($conn,"SET NAMES utf8");
if (!$conn) die("]Connection failed: " . mysqli_connect_error());
?>