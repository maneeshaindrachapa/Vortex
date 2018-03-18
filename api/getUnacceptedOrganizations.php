<?php
include "Crud.php";
$crud = new Crud();

$accepted='0';
$query="SELECT * from organization where OrganizationAccepted='$accepted'";
$data=$crud->getData($query);

echo json_encode($data);
