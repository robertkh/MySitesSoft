<?php
session_start();
$an = $_COOKIE["dimord_user"];
if(empty($an)) exit(']Դուք համակարգ մուտք չեք արել։');
include_once 'conn.php';

$lt=$_POST['lt'];
$lg=$_POST['lg'];

$sql_1 = "SELECT name FROM findme WHERE name = '$an'";
$result_1 = mysqli_query($conn, $sql_1);
$cnt_of_words = mysqli_num_rows($result_1);
if($cnt_of_words !== 0) 
{
	$sql ="UPDATE findme SET name = '$an', lt ='$lt',lg ='$lg', state='1' WHERE name = '$an'";
	$result=mysqli_query($conn, $sql);
	if ($result)
   		echo $an;
	else 
   		echo "Error updating record:" . mysqli_error($conn);
}
else
{
	$sql_2 = "INSERT INTO findme (name, lt, lg, state) 	VALUES ('$an', '$lt', '$lg',  '1')";
	if (!mysqli_query($conn, $sql_2)) 
    	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);
?>
