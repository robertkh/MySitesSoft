<?php
$login = $_GET["a_code"];
if(empty($login)) exit("]error at activation!");
?>
<?php 
include_once 'conn.php';
$sql = "UPDATE users SET activated = '1' WHERE login = '$login'";
//$sql = "UPDATE users SET activated = '1' WHERE login =".$login;
$result = mysqli_query($conn, $sql);
//var_dump($result); //nujnisk sxali depqum true e talis :(   !!! mnac anhaskanali tes-all_5.php
if ($result) 
{
    echo "<h1>Account Successfully Activated</h1>";
} 
else 
{
    echo "<h1>Error activating account: </h1>" . mysqli_error($conn);
}
mysqli_close($conn);
?>