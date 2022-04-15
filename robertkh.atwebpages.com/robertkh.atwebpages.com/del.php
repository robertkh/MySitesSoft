<?php
session_start();
$an = $_COOKIE["dimord_user"];
if(empty($an)) exit(']Դուք համակարգ մուտք չեք արել։');

// ajs masum filtry chashxatec, js ov a arats
$a = $_POST["a"];

//if(!isset($ararka)) exit(']Առարկան ընտրված չէ։։');
$tt = $_POST["tt"];
//if(!isset($tt)) exit(']Հրատարակության տարեթիվը ընտրված չէ։');

$h = $_POST["h"];
//if(!isset($hator)) exit(']Հատորն ընտրված չէ։');

$b = $_POST["b"];
//if(!isset($bazhin)) exit(']Բաժինն ընտրված չէ։');

$g = $_POST["g"];
//if(!isset($glux)) exit(']Գլուխն ընտրված չէ։');

$num = $_POST["num"];
//if(empty($hamar)) exit(']Համարն ընտրված չէ։');
//-----------------------------------------------------
include_once 'conn.php';
$sql = "SELECT id, fn FROM sh1 WHERE ar = '$a' AND tt= '$tt' AND ha = '$h' AND gl = '$g' AND ba = '$b' AND nu = '$num' AND an = '$an'";
$result = mysqli_query($conn, $sql);
if (!($result)) exit("Error description: " . mysqli_error($conn));
$cnt_of_words = mysqli_num_rows($result);
if($cnt_of_words == 0) 
    exit( "]Նշված խնդրի լուծումը Դուք կայքում չեք տեղադրել։ Ստուգեք մուտքագրված տվյալները!");
  

$id;
$fn;
while($row = mysqli_fetch_assoc($result))
{
	$id = $row['id'];
	$fn = $row['fn'];
}
?>
<?php

if (!unlink($fn))  exit ("]Error deleting the file.");
 
?>
<?php 
 $sql = "DELETE FROM sh1 WHERE id='$id'";
 $result = mysqli_query($conn, $sql);
 if (!($result))
  exit("]Ֆայլը ջնջվեց, սակայն ֆայլերի բազան մնաց անփոփոխ։");
 ?>
<?php 
 $sql = "DELETE FROM gnt WHERE id='$id'";
 $result = mysqli_query($conn, $sql);
 if (!($result))
  exit("]Ֆայլը ջնջվեց, սակայն գնահատականների բազան մնաց անփոփոխ։");

echo "|Ձեր ֆայլը հաջողությամբ հեռացված է։";
mysqli_close($conn);
 ?>
