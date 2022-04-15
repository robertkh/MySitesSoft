<?php
include_once 'conn.php';
//---------------------------------------------------------------------------
$sql = "SELECT * FROM star";
$result = mysqli_query($conn, $sql);
$cnt_of_words = mysqli_num_rows($result);
if($cnt_of_words == 0)
    echo "Your vocabulary is empty!";
else 
{
   while($row = mysqli_fetch_assoc($result)) 
      $ar = $row["top"];
} 
echo $ar;
//------------------------------------------------
mysqli_close($conn);
?>