<?php
include "../Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $votingballotID = $data->votingballotID;

    $query = "SELECT * FROM votingOption where votingballotID='$votingballotID'";
    $data = $crud->getData($query);
    echo json_encode($data);
}
