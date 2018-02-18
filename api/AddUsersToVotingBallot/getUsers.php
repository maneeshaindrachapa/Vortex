<?php
    include "../Crud.php";
    $crud= new Crud();
    
    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $organizationID=$data->organizationID;
        
        $query1="SELECT username,firstname,lastname,organizationID from user where organizationID='$organizationID'";
        $data1=$crud->getData($query1);

        echo json_encode($data1);
    }
?>