<?php
$send_email = $_POST["email"];
if(empty($send_email))
	exit("]The necessary input fild(s) has not filled!");
?>
<?php
//---------------------------------------------------------------------------
include_once 'conn.php';
//---------------------------------------------------------------------------
?>
<?php
$sql = "SELECT * FROM users WHERE email = '$send_email' LIMIT 1";
$result = mysqli_query($conn, $sql);
//var_dump($result); login het hamemat tarber e, chem haskanum
if (!mysqli_query($conn, $sql)) 
{
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
else
{
	if (mysqli_num_rows($result)== 0) 
		exit("]Incorrect email address! Please try again!");
	else 
		$row = mysqli_fetch_assoc($result);
}
?> 
<?php
//$from = "noreply@tothis.mail";
$email = $send_email;
$subject = "forget password";
// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// More headers
$headers .= 'From: noreply@to_this_mail' . "\r\n";

$message = "
<html>
<head>
<title>HTML email</title>
</head>
<body>
<h2>Dear <i>". $row['login']."</i> !</h2>
<p> Your Password : <u>".$row['password']."</u>
</body>
</html>";

//mail($email, $subject, $message, "From:".$from);
mail($email, $subject, $message, $headers);

echo "|Please check your mail, you have been sent your password!";
?>