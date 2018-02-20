<?php
    include "Crud.php";
    $crud= new Crud();
    
    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $username=$data->username;
        $currentPassword=$data->passwordDetails->currentPassword;
        $newPassword=$data->passwordDetails->newPassword;
        
        $query1="start transaction";
        $data1=$crud->execute($query1);

        $query2="SELECT username from user where username='$username' and password=MD5('$currentPassword')";
        $data2=$crud->getData($query2);

        if(sizeof($data2)!=null){
            $query3="UPDATE user set password=MD5('$newPassword') where username='$username'";
            $data3=$crud->execute($query3);
            $query4="commit";
            $data4=$crud->execute($query4);
            echo json_encode("1");
        }else{
            echo json_encode("0");
        }
    }
?>