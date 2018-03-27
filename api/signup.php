<?php
include "Crud.php";
include "Validations.php";
$crud = new Crud();
$validation = new Validation();

$data = json_decode(file_get_contents("php://input"));

//variables for errors
$emailError;
$firstnameError;
$lastnameError;

if (sizeof($data) != null) {
    $username = $data->username;
    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $password = $data->password;
    $email = $data->email;
    $type = 1; //this is for normal users
    $organizationID = $data->organizationID;

    //check validation with regular expressions
    $tempFirstname = $validation->is_name_valid($firstname);
    $tempLastname = $validation->is_name_valid($lastname);
    $tempEmail = $validation->is_email_valid($email);
    $tempUsername=true;
    $tempEmailUsed=true;
    
    //check username is already in database
    $query1="SELECT * from user where username='$username'";
    $data1=$crud->getData($query1);
    
    //check email is already in database
    $query2="SELECT * from user where email='$email'";
    $data2=$crud->getData($query2);
    
    //error messages display
    if (!$tempFirstname) {
        $firstnameError = "Invaild First Name";
        echo ("1");
    } elseif (!$tempLastname) {
        $lastnameError = "Invaild Last Name";
        echo ("2");
    } elseif (!$tempEmail) {
        $emailError = "Invaild E-mail Address";
        echo ("3");
    }elseif(sizeof($data1)!=null){
        $tempUsername=false;
        echo("5");
    }elseif(sizeof($data2)!=null){
        $tempEmailUsed=false;
        echo("6");
    }

    if ($tempFirstname && $tempLastname && $tempEmail && $tempUsername && $tempEmailUsed) {
        $query = "INSERT INTO user(username,firstname,lastname,password,email,type,organizationID,accepted) VALUES('$username','$firstname','$lastname',MD5('$password'),'$email','$type','$organizationID',0)";
        $dataExecute = $crud->execute($query);
        if($dataExecute){
            echo json_encode("4");
        }
    }

}
