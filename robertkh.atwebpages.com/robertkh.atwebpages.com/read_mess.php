<?php
session_start();
$acive_user = $_COOKIE["dimord_user"];
if(!isset($acive_user)) exit(']Դուք համակարգ մուտք չեք արել։');

include_once 'conn.php';
$sql = "SELECT from_u, text, time FROM mess_from_to WHERE to_u = '$acive_user'";
$result = mysqli_query($conn, $sql);
if (!($result)) exit("Error description: " . mysqli_error($con));
if( mysqli_num_rows($result)==0) exit('] Դուք հաղորդագրություն չունեք։');

$j_str ='[';
while($row = mysqli_fetch_assoc($result))
{
    $j_str .= '{"from_u":"'.$row['from_u'].'",' ;
    $j_str .= '"text":"'.$row['text'].'",' ;
    $date=date_create($row['time']);
    $d = date_format($date,'j-M-Y');
    $j_str .= '"time":"'.$d.'"},' ;
}
echo chop($j_str,",")."]";
mysqli_close($conn);
?>