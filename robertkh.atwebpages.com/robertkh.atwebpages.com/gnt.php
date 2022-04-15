<?php
session_start();
if(!isset($_COOKIE["dimord_user"])) exit(']Դուք համակարգ մուտք չեք արել։');
$id = $_POST["id"];
$gn = $_POST['gn'];
$tx = $_POST["tx"];
$us = $_COOKIE["dimord_user"];
if( empty($id) || empty($us))
	exit("]Թերի ինֆորմացիա");
if($us == 'guest')
    exit(']Գնահատել կարող են միայն գրանցված օգտատերերը։');
?>
<?php
include_once 'conn.php';
$sql_0 = "SELECT us FROM gnt WHERE id = '$id' LIMIT 1";
$res = mysqli_query($conn, $sql_0);
$row_0 = mysqli_fetch_assoc($res);

if($row_0['us'] == $us)
        exit(']Նույն լուծմանը մեկից ավելի անգամ գնահատելը արգելափակված է։'); 
$sql = "INSERT INTO gnt (id, gn, tx, us) VALUES ('$id', '$gn', '$tx', '$us')";
if (!mysqli_query($conn, $sql)) 
    exit ("]Գնահատման անհաջող փորձ: " . $sql . "<br>" . mysqli_error($conn));


$sql_1 = "SELECT gn FROM gnt WHERE id = '$id'";
$result = mysqli_query($conn, $sql_1);
if (!($result))
  exit("]Գնահատումը հաջողությամբ ավարտվեց, սակայն էջում թարմացում չհաջողվեց կատարել։" . mysqli_error($con));

$k = 0;
$mij = 0;
if ($result){
    while($row = mysqli_fetch_assoc($result)) 
    {
        $k=$k+1;
        $mij=$mij+$row['gn'];
    }
    $mij = $mij/$k;
}
echo '|[{"s":"Գնահատումը հաջողությամբ ավարտվեց","n":'.$k.',"m":'.$mij.'}]';
mysqli_close($conn);
?> 
