<?php



header("Content-Type:text/html;charset=utf-8");
$mysql = new mysqli('localhost', 'root', '', 'cake'); //连接mysql
$mysql->set_charset('utf8');

$result = $mysql->query("select * from usertable");
  while ($r1 = $usercode->fetch_assoc()) {
    $Date[] = $r1;
  }
  echo (json_encode($Date, JSON_UNESCAPED_UNICODE));
$result ->free();
$mysql->close();
?>