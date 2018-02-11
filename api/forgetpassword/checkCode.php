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
            $temp_current_time = strtotime($currentTime);
            $temp_expiration_time = strtotime($expirationTime);
            
            //differntiatiateTime
            if(($temp_expiration_time-$temp_current_time)>0){
                echo json_encode("0"); //password changed allowed
            }else{
                echo json_encode("1");//time expired
            }
        }else{
            echo json_encode("2");//code error
        }
    }

?>