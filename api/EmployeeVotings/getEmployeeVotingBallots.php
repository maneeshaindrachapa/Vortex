<?php
    include "../Crud.php";
    $crud= new Crud();

    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $username=$data->username;
        
        $query="select * from votingballot natural join voters where username='$username' order by votingballotID desc";
        $data=$crud->getData($query);
         
        echo json_encode($data);
    }
?>