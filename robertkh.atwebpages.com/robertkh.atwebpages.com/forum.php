<?php
session_start();
$an = $_COOKIE["dimord_user"];
if(empty($an)) exit(']Դուք համակարգ մուտք չեք արել։');

$tema = $_POST["tema"];
if(empty($tema)) 
{
	echo $tema;
	exit(']Թեման անորոշ է։');
}

$text = $_POST["text"];
if(empty($text)) exit(']Տեքստ անորոշ է։') ;

$parent = $_POST['parent'];
if($parent == '') exit(']Հասցեն անորոշ է։') ;

include_once 'conn.php';
$sql = "INSERT INTO forum ( hex, tema, text, parent ) VALUES ('$an', '$tema', '$text', $parent)";
$result = mysqli_query($conn, $sql);
if (!$result) exit ( mysqli_error($conn));
echo '|Հաղորդագրությունը հաջողությամբ ուղարկվեց։';
mysqli_close($conn);
?>