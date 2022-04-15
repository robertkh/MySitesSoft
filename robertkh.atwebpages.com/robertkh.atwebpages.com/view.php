<?php
session_start();
$a = $_POST["a"];
$tt = $_POST["tt"];
$h = $_POST["h"];
$g = $_POST["g"];
$b = $_POST["b"];
$num = $_POST["num"];

if( $a=='null' || $tt=='null' || $h=='null' || $g=='null' || $b=='null' || $num=='' )  // tes ajax-> send_var
	exit("]Թերի ինֆորմացիա, ստուգեք դաշտերը։");
include_once 'conn.php';
$sql = "SELECT id, fn, an FROM sh1 WHERE ar = '$a' AND tt = '$tt' AND  ha = '$h' AND gl = '$g' AND ba = '$b' AND nu = '$num'";
$result = mysqli_query($conn, $sql);
if (!($result)) exit("]Error description: " . mysqli_error($con));

$cnt_of_words = mysqli_num_rows($result);
if($cnt_of_words == 0) exit("]Խնդրի լուծումը բազայում չկա!");

$ar = "[";
while($row = mysqli_fetch_assoc($result)) 
    {
    	$ar .= '{"id":"'.$row['id'].'",' ;
    	$ar .= '"fn":"'.$row['fn'].'",' ;
    	$ar .= '"an":"'.$row["an"].'",' ; 

    	$id =  $row['id'];
    	$k = 0;
    	$mij = 0;
    	
        $sql_1 = "SELECT gn FROM gnt WHERE id = '$id'";
    	$result_1 = mysqli_query($conn, $sql_1);
        //var_dump($result_1);
        if ($result_1)
        {
       
                while($row_1 = mysqli_fetch_assoc($result_1)) 
                {
                        $k=$k+1;
                        $mij=$mij+$row_1['gn'];
                }
                //echo $k;
                //echo $mij;
                if($k==0) $mij=0;
                else $mij = $mij/$k;
                
        }
       
    	$ar .= '"q":"'.$k.'",' ; 
    	$ar .= '"mij":"'.$mij.'"},' ;

    }
echo chop($ar,",")."]";
mysqli_close($conn);
?>