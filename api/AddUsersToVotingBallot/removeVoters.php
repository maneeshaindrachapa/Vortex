<?php
    include "../Crud.php";
    $crud= new Crud();
    
    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $organizationID=$data->organizationID;
        $ballotID=$data->ballotID;
        $username=$data->username;
        
        $query="start transaction";
        $data=$crud->execute($query);

        $query2="select voterID from user left outer join voters on user.username=voters.username where voters.username='$username' and votingballotID='$ballotID'";
        $data2=$crud->getData($query2);
        $voterID=$data2[0]["voterID"];
        
        $query1="delete from voters where voterID='$voterID'";
        $data1=$crud->execute($query1);

        if($data1 && $data2){
            $query3="commit";
            $data3=$crud->execute($query3);
            echo json_encode($data3);
        }
    }
?>