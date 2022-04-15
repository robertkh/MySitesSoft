<?php
$un = $_POST['un'];
$op = $_POST['op'];
$np = $_POST['np'];
if(empty($un) or empty($op) or empty($np))
	exit("]The necessary input fild(s) has not filled!");
?>
<?php
//---------------------------------------------------------------------------
include_once 'conn.php';
//---------------------------------------------------------------------------
?>
<?php
$sql = "SELECT * FROM users WHERE login = '$un' AND password = '$op' LIMIT 1";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) == 0)
	exit("]Incorrect username or password! Please try again.");
$sql1 = "UPDATE users SET password ='$np' WHERE login ='$un'";
if (!mysqli_query($conn, $sql1))
{
    echo "Error: " . $sql1 . "<br>" . mysqli_error($conn);
    exit;
}
else
{ 
	echo "|Password has been updated succesfully!";
}