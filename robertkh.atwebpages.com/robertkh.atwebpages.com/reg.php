<?php
$us = $_POST["login"];
if(empty($us)) exit("]The username input fild has not filled!");
$em = $_POST["email"];
if(empty($em)) exit("]The email input fild has not filled!");
$ps = $_POST["password"];
if(empty($ps)) exit("]The password input fild has not filled!");

if (is_numeric($us[0])) exit("]Usernames must begin with a letter!");
elseif ((strlen($us) < 3 || strlen($us) > 18)) exit("]Username must take 3 - 16 characters!");
else
{
    include_once 'conn.php';
    $sql = "SELECT * FROM users WHERE login = '$us' LIMIT 1";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) exit("]'$us' is taken, please try other one!");
} 
?>
<?php
if (!filter_var($em, FILTER_VALIDATE_EMAIL)) exit("]Invalid email format!");
else
{
    $sql = "SELECT * FROM users WHERE email = '$em' LIMIT 1";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) exit("]This email is in use, please try other one!");
}
?>
<?php
if ((strlen($ps)< 3 || strlen($ps) >16)) exit("]The password must take 3 - 16 characters!"); 
?>
<?php
//echo date("l jS \of F Y h:i:s A");
$sql = "INSERT INTO users (login, password, email) VALUES ('$us','$ps', '$em')";
if (!mysqli_query($conn, $sql))
    exit("Error: " . $sql . "<br>" . mysqli_error($conn));
else
{
    $sql_1 ="CREATE TABLE $us
    (
        max          INT(5) UNSIGNED NOT NULL,
        memo         text NOT NULL ,
	    dt           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
	
    )";
    if (!mysqli_query($conn, $sql_1))
    echo "Error: " . $sql_1 . "<br>" . mysqli_error($conn);
   // echo date("l jS \of F Y h:i:s A");
}
mysqli_close($conn);
?> 
<?php
//$from = "noreply@tothis.mail"; gnum a ejis hasceic namak, najel nastrojkeqi mej
$email = $em;
$subject = "Activate Account";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: noreply@to_this_mail' . "\r\n";

$message = "
<html>
<head>
<title>HTML email</title>
</head>
<body>
<p> Dear <u> $us </u> click the link below to activate account!</p>
<a href = 'http://robertkh.atwebpages.com/activ.php?a_code=$us'> Activate now </a>
</body>
</html>";

//mail($email, $subject, $message, "From:".$from);
mail($email, $subject, $message, $headers);
//echo date("l jS \of F Y h:i:s A");
echo "|Succesfully Registration! Please check your mail, you have been sent your activation link.";
?>
