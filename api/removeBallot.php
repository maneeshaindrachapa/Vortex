<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $votingballotid = $data->votingballotID;

    $query = "DELETE from votingballot where votingballotID='$votingballotid'";
    $data1 = $crud->execute($query);
    echo json_encode($data1);
}
