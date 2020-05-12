<?php  //登陆信息验证
header("Content-Type:text/html;charset=utf-8");
$mysql = new mysqli('localhost', 'root', '', 'cake'); 
$mysql->set_charset('utf8');

$username = $_POST['username'];
$password = $_POST['password'];
$name = $_POST['name'];

$result = $mysql->query("select * from usertable where username = '{$username}'");
if (count($result)) {
  echo 'false';
}else{
  $mysql->query("insert into usertable values('./img/userImg.jpg','{$username}','{$name}',{$password},'0','null','null')");
  echo 'true';
}
$mysql->close();

?>

