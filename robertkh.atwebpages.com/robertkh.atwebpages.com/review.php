<?php
session_start();
$id = $_POST["id"];

if( empty($id) )
	exit("]id-n chka");

include_once 'conn.php';
$sql = "SELECT gn, us, tm, tx FROM gnt WHERE id = '$id'";
$result = mysqli_query($conn, $sql);
if (!($result))
  exit("Error description: " . mysqli_error($con));
if( mysqli_num_rows($result)==0)
	exit('] review չկա։');

$j_str ='[';
while($row = mysqli_fetch_assoc($result))
{
	$j_str .= '{"gn":'.$row['gn'].',' ;
	$j_str .= '"us":"'.$row['us'].'",' ;
	$date=date_create($row['tm']);
	$d = date_format($date,'j-M-Y');
	$j_str .= '"tm":"'.$d.'",' ;
	
	$j_str .= '"tx":"'.$row['tx'].'"},' ;
}
echo chop($j_str,",")."]";
mysqli_close($conn);
?>