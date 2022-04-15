<?php 
session_start();
$an = $_COOKIE["dimord_user"];
if(empty($an)) exit(']Դուք համակարգ մուտք չեք արել։');
include_once 'conn.php';
$sql ="UPDATE findme SET state='0' WHERE name = '$an'";
	$result=mysqli_query($conn, $sql);
	if ($result)
   		echo 'hide'.$an;
	else 
   		echo "Error updating record:" . mysqli_error($conn);
mysqli_close($conn);
?>