<?php
session_start();

include_once 'conn.php';
$sql = "SELECT * FROM forum ORDER BY time ";
$result = mysqli_query($conn, $sql);
if (!($result)) exit("Error description: " . mysqli_error($con));
if( mysqli_num_rows($result)==0) exit('] Ֆորումում հաղ։');

$j_str ='[';
while($row = mysqli_fetch_assoc($result))
{
    $j_str .= '{"id":"'.$row['id'].'",' ;
    $j_str .= '"parent":"'.$row['parent'].'",' ;
    $j_str .= '"hex":"'.$row['hex'].'",' ;
    $j_str .= '"tema":"'.$row['tema'].'",' ;
    $j_str .= '"text":"'.$row['text'].'",' ;
    $date=date_create($row['time']);
    $d = date_format($date,'j-M-Y');
    $j_str .= '"time":"'.$d.'"},' ;
}
echo chop($j_str,",")."]";
mysqli_close($conn);
?>