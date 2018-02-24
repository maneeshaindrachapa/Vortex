<?php
    include "../Crud.php";
    $crud= new Crud();

    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $username=$data->username;
        $votingballotID=$data->votingballotID;
        $votingoptionID=$data->votingoptionID;
        
        $query="update voters set votingoptionID='$votingoptionID' where username='$username' and votingballotID='$votingballotID'";
        $data=$crud->execute($query);
         
        echo json_encode($data);
    }
?>