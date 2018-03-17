<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $username = $data->username;

    $query0="START transaction";
    $data0=$crud->execute($query0);

    $query1 = "SELECT username,firstname,lastname,email,organizationID FROM user where username='$username'";
    $data1 = $crud->getData($query1);
    $organizationID=$data1[0]['organizationID'];

    $query2="SELECT * from user where organizationID='$organizationID' and accepted=0";
    $data2=$crud->getData($query2);
    
    $query3="COMMIT";
    $data3=$crud->execute($query3);
    echo json_encode($data2);
}