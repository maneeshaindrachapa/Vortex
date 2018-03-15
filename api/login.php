<?php
include "Crud.php";
$crud = new Crud();

$logindata = json_decode(file_get_contents("php://input"));
if (sizeof($logindata) != 0) {
    $username = $logindata->username;
    $password = $logindata->password;

    $query = "SELECT username,password,type,accepted FROM user where username='$username' and password=MD5('$password')";
    $data = $crud->getData($query);
    if($data[0]['accepted']==0){
        echo json_encode("-1");
    }else{
        echo json_encode($data[0]);
    }
}
