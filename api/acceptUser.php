<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $username = $data->username;

    $query="UPDATE user set accepted=1 where username='$username'";
    $data=$crud->execute($query);

    echo json_encode($data);
}