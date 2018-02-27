<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $username = $data->username;

    $query = "SELECT username,firstname,lastname,email FROM user where username='$username'";
    $data = $crud->getData($query);
    echo json_encode($data[0]);
}
