<?php
    include "../Crud.php";
    $crud= new Crud();
    
    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $email=$data->email;
        $password=$data->password;

        $query1="UPDATE user set password=MD5('$password') where email='$email'";
        $data1=$crud->execute($query1);

        echo json_encode($data1);
    }
?>