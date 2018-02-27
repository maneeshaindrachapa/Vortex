<?php
include "Crud.php";
$crud = new Crud();

$query = "select * from votingBallot order by votingballotID desc";
$data = $crud->getData($query);

echo json_encode($data);
