<?php 
session_start();
$ss = $_SESSION["login"];
if(empty($ss)) exit("]There is no active user. Please log in at first!");
?>
<?php

$max = $_POST["max"];
$dict = $_POST["dict"];
$p = $_POST['p'];

include_once 'conn.php';

if ($p == 1)
	{
		$sql = "SELECT dt FROM $ss";
		$result = mysqli_query($conn, $sql);
		while($row = mysqli_fetch_assoc($result)) 
        {
        	$d =date($row['dt']);
        }
		exit($d);
	}
$dict = mysqli_real_escape_string($conn, $dict); 

$sql = "SELECT * FROM $ss";
$result = mysqli_query($conn, $sql);
$cnt_of_words = mysqli_num_rows($result);

if($cnt_of_words == 0)
{
	$sql_0 = "INSERT INTO $ss(max, memo) VALUES ('$max', '$dict')";
	if (!mysqli_query($conn, $sql_0)) 
    	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	else
    	echo "|The dictionary has been added succesfully!";
}
else
{
	$sql_1 = " UPDATE $ss SET max = '$max',memo = '$dict' ";
	$result=mysqli_query($conn, $sql_1);
	if ($result)
    	echo "|The dictionary has been saved succesfully!";
	else 
    	echo "Error updating record:" . mysqli_error($conn);
}

mysqli_close($conn);
?> 