<?php
session_start();
$ss = $_SESSION["login"];
if(empty($ss))
    exit("]There is no active user. Please log in at first!");
?>
<?php
//---------------------------------------------------------------------------
include_once 'conn.php';
//---------------------------------------------------------------------------
$p = $_POST['p'];
if ($p == 1)
  {
    $sql = "SELECT memo, dt FROM $ss";
    $result = mysqli_query($conn, $sql);
    while($row = mysqli_fetch_assoc($result)) 
        {
          $d =date($row['dt']);
          $d .= '</br>Բառերի քանակը բառարանում ։ ';
          $d .= substr_count($row['memo'], '"id"');
        }
    exit($d);
  }
  
$sql = "SELECT max, memo FROM $ss";
$result = mysqli_query($conn, $sql);
$cnt_of_words = mysqli_num_rows($result);
if($cnt_of_words == 0)
    echo "]Your vocabulary is empty!";
else 
{
    $ar = '';
    while($row = mysqli_fetch_assoc($result)) 
    {
            $ar .= $row['max'];
            $ar .= '|||';
            $ar .= $row["memo"];
    }
    echo $ar;
        
    /* 
    $top = 'top1000';
    while($row = mysqli_fetch_assoc($result)) 
    {
       $w = $row['word'];
       $idd = $row['id'];
       $sql_1 = "SELECT word FROM $top WHERE word = '$w'";
       $result_1 = mysqli_query($conn, $sql_1);
       $cnt_of_words = mysqli_num_rows($result_1);
       $t = 0;
       if($cnt_of_words !== 0) $t=1;
       $sql ="UPDATE $ss SET top = '$t' WHERE id ='$idd' ";
       $result_2=mysqli_query($conn, $sql);
       if (!$result_2)
             echo "]T??????????";
    }  
    */
    
    /* 
     $ar='';
     while($row = mysqli_fetch_assoc($result)) 
     {
             $ar .= $row["id"].'|';
             $ar .= $row["word"].'|';
             if($row["pr"] == null) $ar .= 'empty_fild|';
             else $ar .= $row["pr"].'|';
             if($row["pos"] == null) $ar .= 'empty_fild|';
             else $ar .= $row["pos"].'|';
             if($row["translation"] == null) $ar .= 'empty_fild|';
             else $ar .= $row["translation"].'|';
             if($row["memo"] == null) $ar .= 'empty_fild|';
             else $ar .= $row["memo"].'|';
             $ar .= $row["dt"].'|';
             $ar .= $row["df"].'|';
             $ar .= $row["p"].'|';
             $ar .= $row["n"].'|';
             $ar .= $row["top"].'|||';
             
     
     } 
     echo chop($ar,'|||'); 
     */
}
//------------------------------------------------
mysqli_close($conn);
?>