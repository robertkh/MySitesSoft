<?php
session_start();
//-------------------------------------------
$send_login = $_POST["login"];
$send_pass = $_POST["password"];
///////////////
//setcookie("dimord_user", $_POST["login"], time() + (86400 * 1), "/");
//exit('|'.$send_login );
///////////////////
if(empty($send_login) or empty($send_pass))
	exit("]The necessary input fild(s) has not filled!");
?>
<?php
//header('location:robertkh.atwebpages.com');
//---------------------------------------------------------------------------
include_once 'conn.php';
//---------------------------------------------------------------------------
?>
<?php
$send_login = mysqli_real_escape_string($conn, $send_login);
$send_pass = mysqli_real_escape_string($conn, $send_pass);
$sql= "SELECT * FROM users WHERE login = '$send_login' AND password = '$send_pass' LIMIT 1";
$result = mysqli_query($conn, $sql);
//var_dump($rezult);                      // NULL a talis , inchu?
if (!mysqli_query($conn, $sql)) 
{
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    exit();
}
if (mysqli_num_rows($result) > 0)
{
	$row = mysqli_fetch_assoc($result);
	if($row["activated"]=='1')
	{
    	setcookie("dimord_user", $row['login'], time() + (86400 * 30), "/");
    	echo '|'.$row["login"];
    	$_SESSION["login"] = $row[login]; // hnaravwr e avelord ban a
	}
	else
		echo "]Your account is not activated yet. Please check your mailbox!";
}
else 
{
	echo "]Incorrect username or password! Please try again.";
}
//-----------------------------------------------------------
mysqli_close($conn);
?> 