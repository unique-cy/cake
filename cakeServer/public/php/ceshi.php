<?php
header('Content-type: application/json');
$dbh = new PDO('mysql:host=localhost;dbname=cake', 'root', '');  
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
$dbh->exec('set names utf8'); 
 
/*查询*/
$login = 'kevin%';  
$sql = "SELECT * FROM `cake`";  
$stmt = $dbh->prepare($sql);  
$stmt->execute(array(':login'=>$login));  
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){     
//  var_dump($row); 
 $data[] = $row ;
}  
echo json_encode($data);
?>