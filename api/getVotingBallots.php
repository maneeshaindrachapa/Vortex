<?php
include "Crud.php";
$crud = new Crud();

$query = "select * from votingballot order by votingballotID desc";
$data = $crud->getData($query);

echo json_encode($data);
