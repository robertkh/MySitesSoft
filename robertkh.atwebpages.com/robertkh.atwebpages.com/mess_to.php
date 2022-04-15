<?php
session_start();
$node = $_POST["node"];
$to = $_POST["to"];
$from = $_POST["from"];
$mess = $_POST["mess"];

// null, 0, datark ---srancic zgwujsh linel
if( !($node == 0) || empty($to) || empty($from) || empty($mess) ) exit(']Թերի ինֆորմացիա։') ;

include_once 'conn.php';
$sql = "INSERT INTO mess_from_to ( node, to_u, from_u, text) VALUES ('$node', '$to', '$from', '$mess')";
$result = mysqli_query($conn, $sql);
if (!$result) exit ( mysqli_error($conn));
echo '|Հաղորդագրությունը հաջողությամբ ուղարկվեց։';
mysqli_close($conn);
?>