<?php
    include "../Crud.php";
    $crud= new Crud();
    
    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $organizationID=$data->organizationID;
        $ballotID=$data->ballotID;
        
        $query1="select user.username,user.firstname,user.lastname,user.organizationID from user where organizationID='$organizationID' and type='1'";
        $data1=$crud->getData($query1);

        echo json_encode($data1);
    }
?>