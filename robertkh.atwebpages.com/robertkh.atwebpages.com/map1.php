<?php
session_start();
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
include_once 'conn.php';

$lastId = $_SERVER["HTTP_LAST_EVENT_ID"];
if (isset($lastId) && !empty($lastId) && is_numeric($lastId)) {
    $lastId = intval($lastId);
    $sql_2 = "UPDATE findme_chat SET k = '1' WHERE id='$lastId'";
	$result_2 = mysqli_query($conn, $sql_2);
    $lastId++;
}
else
{
	$sql= "SELECT * FROM findme_chat WHERE k='1'";
	$result = mysqli_query($conn, $sql);
	$cnt_of_words = mysqli_num_rows($result);
	$lastId = $cnt_of_words + 1;
}

$sql_1 = "SELECT * FROM findme_chat WHERE id='$lastId'";
//$sql_1 = "SELECT * FROM findme_chat WHERE k='0' LIMIT 1";
$result_1 = mysqli_query($conn, $sql_1);
$cnt_of_words = mysqli_num_rows($result_1);
if($cnt_of_words)
{
	$row = mysqli_fetch_assoc($result_1);
	$id = $row['id'];
	$r2='["'.$row['fr'].'","'.$row['toto'].'","'.$row['text'].'"]';
	echo "event: ping\n";
	echo "id: $lastId\n";
	echo "retry:15000\n";
	echo "data:{$r2 }\n\n";
	ob_flush();
    flush();
}
//--------------------------------------------------
$sql = "SELECT * FROM findme ";
$result = mysqli_query($conn, $sql);
if (!($result)) exit("]Գնահատումը հաջողությամբ ավարտվեց, սակայն էջում թարմացում չհաջողվեց կատարել։" . mysqli_error($con));
$rr='[';
while($row = mysqli_fetch_assoc($result)) 
{
	$r = '["'.$row['name'].'",'.$row['lt'].','.$row['lg'].','.$row['state'].'],';
    $rr .= $r;  
}

$rr=chop($rr,",")."]";
echo "event: map\n";
echo "retry:15000\n";
echo "data: {$rr}\n\n";
ob_flush();
flush();
?>


