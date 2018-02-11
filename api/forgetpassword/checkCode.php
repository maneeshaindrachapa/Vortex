<?php
    include "../Crud.php";
    $crud= new Crud();
    
    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        //json variables
        $email=$data->email;
        $code=$data->code;
        $currentTime=date('Y-m-d H:i:s');
       
        //sql query
        $query1="SELECT * FROM forgetpassword where email='$email'";
        $data1=$crud->getData($query1);

        //database variables
        $expirationTime=$data1[0]['expirationTime'];
        $randomCode=$data1[0]['randomCode'];
       
        if($code==$randomCode){
            //differntiatiateTime
            if($currentTime<$expirationTime){
                echo json_encode($data1[0]);
            }else{
                echo "Time Expired";
            }
        }else{
            echo "Code Error";
        }
    }

?>