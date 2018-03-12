<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $votingballotID = $data->votingballotID;
    $pubSecKey=$data->publicSecurityKey;
    $priSecKey=$data->privateSecurityKey;
    $username=$data->username;
    $query="start transaction";
    $resData=$crud->execute($query);

    $query1 = "SELECT publicKey FROM votingballot where votingballotID='$votingballotID' and publicKey=('$pubSecKey')";
    $resData1 = $crud->getData($query1);

    $query2="SELECT privateKey FROM voters where username='$username' and votingballotID='$votingballotID' and privateKey=MD5('$priSecKey')";
    $resData2=$crud->getData($query2);

    $query4="commit";
    $resData4=$crud->execute($query4);

    if(sizeof($resData1)!=null && sizeof($resData2)!=null){
        echo json_encode($resData4);
    }
}
