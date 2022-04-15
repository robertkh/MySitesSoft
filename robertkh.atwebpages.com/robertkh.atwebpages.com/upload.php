<?php
session_start();
$anun = $_COOKIE["dimord_user"];
if(!isset($anun)) exit(']Դուք համակարգ մուտք չեք արել։');

$ararka = $_POST["a"];
if(!isset($ararka)) exit(']Առարկան ընտրված չէ։');

$tt = $_POST["tt"];
if(!isset($tt)) exit(']Հրատարակության տարեթիվը ընտրված չէ։');

$hator = $_POST["h"];
if(!isset($hator)) exit(']Հատորն ընտրված չէ։');

$bazhin = $_POST["b"];
if(!isset($bazhin)) exit(']Բաժինն ընտրված չէ։');

$glux = $_POST["g"];
if(!isset($glux)) exit(']Գլուխն ընտրված չէ։');

$hamar = $_POST["num"];
if(empty($hamar)) exit(']Համարն ընտրված չէ։'); // issety chashxatec; 0-n ancav !!!!!!!!!!!!!!!!!!!

$target_dir = "upload/";
//$target_file = $target_dir . $anun."_".basename($_FILES["fileToUpload"]["name"]);
$target_file = $target_dir . $anun."_".basename($_FILES["file"]["name"]); //exit($target_file);
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION); //exit($imageFileType);

// Check if image file is a actual image or fake image, rasshirenjan kara xabi !!!
$check = getimagesize($_FILES["file"]["tmp_name"]);
if($check !== false) {
//echo "File is an image - " . $check["mime"];
} else {
    exit("]File is not an image.");
}
//-----------------------------------------------------
if ( file_exists($target_file) ) exit("]file already exists.");
if ($_FILES["file"]["size"] > 1000000) exit("]Sorry, your file is too large."); 
if($imageFileType != "jpg" && $imageFileType != "PNG" && $imageFileType != "JPEG" && $imageFileType != "GIF" ) 
    exit("]Sorry, only JPG, JPEG, PNG & GIF files are allowed.");

if ( ! move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) 
   exit( "]Sorry, there was an error uploading your file.");
//-------------------------------
$ss='sh1';
include_once 'conn.php';
$sql = "INSERT INTO $ss(ar, tt, ha, gl, ba, nu, an, fn) 
    VALUES ('$ararka', '$tt', '$hator', '$glux', '$bazhin', '$hamar', '$anun', '$target_file')";
if (!mysqli_query($conn, $sql)) 
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
else
    echo "|The file has been uploaded succesfully!";
mysqli_close($conn);
?>