<?php
session_start();
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
include_once 'conn.php';

$sql_1 = "SELECT * FROM findme_chat WHERE k='0' LIMIT 1 ";
$result_1 = mysqli_query($conn, $sql_1);
$cnt_of_words = mysqli_num_rows($result_1);
if($cnt_of_words)
{
	$row = mysqli_fetch_assoc($result_1);
	$r2='["'.$row['fr'].'","'.$row['toto'].'","'.$row['text'].'"]';

	echo "event: ping\n";
	echo "retry:15000\n";
	echo "data:{$r2 }\n\n";
	
	$cnd = $row['id'];
	$sql_2 = "UPDATE findme_chat SET k = '1' WHERE id='$cnd'";
	$result_2 = mysqli_query($conn, $sql_2);
}
flush();
?>


