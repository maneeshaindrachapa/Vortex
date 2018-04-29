<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));

if(sizeof($data)!=0){
    $username=$data->username;
    $query1="start transaction";
    $data1=$crud->execute($query1);

    $query2="select organizationID from user where username='$username'";
    $data2=$crud->getData($query2);
    $organizationID=$data2[0]['organizationID'];

    $query3 = "select * from votingballot where organizationID='$organizationID' order by votingballotID desc";
    $data3 = $crud->getData($query3);

    $query4="commit";
    $data4=$crud->execute($query4);
    //if($data4){
        echo json_encode($data3);
    //}
}