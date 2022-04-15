<?php
session_start();
include_once 'conn.php';
$to = $_POST['to'];
$fr = $_POST['from'];
$text = $_POST['text'];
$sql_2 = "INSERT INTO findme_chat (fr, toto, text) VALUES ('$fr', '$to', '$text')";
if (!mysqli_query($conn, $sql_2)) 
    	echo "Error: " . $sql . "<br>" . mysqli_error($conn);

/*$sql_1 = "SELECT * FROM findme_chat ";
$result_1 = mysqli_query($conn, $sql_1);
$cnt_of_words = mysqli_num_rows($result_1);
if($cnt_of_words !== 0) 
{
	$sql ="UPDATE findme_chat SET fr = '$fr', toto ='$to',text ='$text'";
	$result=mysqli_query($conn, $sql);
	if (!$result)
   		echo "Error updating record:" . mysqli_error($conn);
}
else
{
	$sql_2 = "INSERT INTO findme_chat (fr, toto, text) VALUES ('$fr', '$to', '$text')";
	if (!mysqli_query($conn, $sql_2)) 
    	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}*/
mysqli_close($conn);
?>