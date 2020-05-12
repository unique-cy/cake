<?php
header("Content-Type:text/html;charset=utf-8");
$mysql = new mysqli('localhost', 'root', '', 'cake');
$mysql->set_charset('utf8');

$username = $_POST['username'];
$password = $_POST['password'];

$result = $mysql->query("select * from usertable where username = '{$username}' and password = {$password}");
if ($result) {
  $usercode = $mysql->query("select * from usertable");
  echo (json_encode($r1 = $usercode->fetch_assoc(), JSON_UNESCAPED_UNICODE));
}else{
  echo 'false';
}
$mysql->close();
?>