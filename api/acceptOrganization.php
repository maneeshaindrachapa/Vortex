<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $organizationID = $data->oraganizationID;
    $accepted=1;
    $query="START transaction";
    $data=$crud->execute($query);
    
    $query1="UPDATE organization set organizationAccepted='$accepted' where organizationID='$organizationID'";
    $data1=$crud->execute($query1);

    $query2="UPDATE user set accepted='$accepted' where organizationID='$organizationID'";
    $data2=$crud->execute($query2);
    
    $query3="COMMIT";
    $data3=$crud->execute($query3);
    echo json_encode($data3);
}