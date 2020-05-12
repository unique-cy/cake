<?php
//封装注册登录的php增删改查
// header("Content-Type:text/html;charset=utf-8");
header('Content-Type:application/json');
function mysqlBase($host, $username, $password, $dbname) //连接数据库
{ //传值-------->>$host=主机或IP地址   $username=mysql账户名   $passwordmysql密码   $dbname=规定使用的数据库
  $mysqli = new mysqli($host, $username, $password, $dbname);
  // $mysqli->set_charset('utf8');   设置中文集
  if (!$mysqli) {
    die('false');
  } else {
    return $mysqli;
  }
}

function select($mysql,  $table) //查找某个表数据        
{ //传值-------->>$mysql=连接数据库的值   $table=表名
  $mysql->set_charset('utf8');
  $result = $mysql->query("select * from {$table}");
  if ($result == null) {
    echo 'false';
  } else {
    while ($r = $result->fetch_assoc()) {
      $data[] = $r;
    }
    $json = json_encode(array(
      "resultCode" => 200,
      "message" => "查询成功！",
      "data" => $data
    ), JSON_UNESCAPED_UNICODE);
    echo ($json);
    mysqli_free_result($result);
  }
}

function selectMore($mysql,  $table, $field, $fieldVal) //查找某个表内 单条数据  
{ //传值-------->>$mysql=连接数据库的值   $table=表名  $field=字段名  $fieldVal=值
  $mysql->set_charset('utf8');
  $result = $mysql->query("select * from {$table} where {$field}='{$fieldVal}'");
  if ($result == null) {
    var_dump(0);
  } else {
    while ($r = $result->fetch_assoc()) {
      $data[] = $r;
    }
    $json = json_encode(array(
      "resultCode" => 200,
      "message" => "查询成功！",
      "data" => $data
    ), JSON_UNESCAPED_UNICODE);
    echo ($json);
    mysqli_free_result($result);
  }
}

function delete($mysql, $table, $field, $fieldVal) //删除单条数据        
{ //传值-------->>$mysql=连接数据库的值   $field=字段名  $fieldVal=值
  $mysql->set_charset('utf8');
  $mysql->query("delete from {$table} where {$field}={$fieldVal}");
}

function insert($mysql, $table, $usernameVla, $passwordVal) //增加数据
{ //传值-------->>$mysql=连接数据库的值    $usernameVla=账户名  $passwordVal=密码
  $mysql->set_charset('utf8');
  $mysql->query("insert into {$table} value({$usernameVla},{$passwordVal})");
}

function update($mysql, $table, $update, $updateVal, $condition, $conditionVal) //根据一个字段名更改另一个字段名
{ //传值-------->>$mysql=连接数据库的值  $table=表名  $update=待修改的字段 $updateVal字段值 $condition=条件字段 $conditionVal=条件字段值
  $mysql->set_charset('utf8');
  $mysql->query("update {$table} set {$update}={$updateVal} where {$condition}={$conditionVal}");
}

function closemysql($mysql) //关闭mysql
{
  $mysql->close();
}
