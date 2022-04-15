<?php
session_start();
$h = $_SERVER['SERVER_NAME'];
//---------------------------------------------------------------------------
$w = getenv('REMOTE_ADDR');
include_once 'conn.php';
$sql = "INSERT INTO mu(w,host) VALUES ('$w', '$h')";
if (!mysqli_query($conn, $sql)) 
	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
mysqli_close($conn);
?> 