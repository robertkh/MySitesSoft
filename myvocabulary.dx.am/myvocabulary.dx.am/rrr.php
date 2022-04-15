<?php
//---------------------------------------------------------------------------
include_once 'conn.php';
//---------------------------------------------------------------------------
$sql = "SELECT id, word, pr, pos, translation, memo,  df, p, n, top, dt FROM rrr order by word ";

$result = mysqli_query($conn, $sql);
$cnt_of_words = mysqli_num_rows($result);
if($cnt_of_words == 0)
    echo "Your vocabulary is empty!";
else 
{
    $ar = "[";
    while($row = mysqli_fetch_assoc($result)) 
    {
            
            $ar .= '{"id":"'.addslashes( strip_tags($row["id"])).'",' ;
            $wd = strtolower($row["word"]);
            $ar .= '"word":"'.$wd.'",' ;
            $ar .= '"pr":"'.$row["pr"].'",' ;
            $ar .= '"pos":"'.$row["pos"].'",' ;
            $ar .= '"translation":"'.addslashes( strip_tags($row["translation"])).'",' ;
            $ar .= '"memo":"'.addslashes( trim( strip_tags($row["memo"]) )).'",' ;
            $ar .= '"df":"'.$row["df"].'",' ;
            $ar .= '"p":"'.$row["p"].'",' ;
            $ar .= '"n":"'.$row["n"].'",' ;
            $ar .= '"top":"'.$row["top"].'",' ;
            $ar .= '"tp":"'.$row["dt"].'"},' ;  
    }
    echo chop($ar,",")."]";
}  
//------------------------------------------------
mysqli_close($conn);     
?>