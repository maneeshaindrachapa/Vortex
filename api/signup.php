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
    $organiztionID = $data->organizationID;

    //check validation with regular expressions
    $tempFirstname = $validation->is_name_valid($firstname);
    $tempLastname = $validation->is_name_valid($lastname);
    $tempEmail = $validation->is_email_valid($email);

    //error messages display
    if (!$tempFirstname) {
        $firstnameError = "Invaild First Name";
        echo ($firstnameError);
    } elseif (!$tempLastname) {
        $lastnameError = "Invaild Last Name";
        echo ($lastnameError);
    } elseif (!$tempEmail) {
        $emailError = "Invaild E-mail Address";
        echo ($emailError);
    }

    if ($tempFirstname && $tempLastname && $tempEmail) {
        $query = "INSERT INTO user(username,firstname,lastname,password,email,type,organizationID) VALUES('$username','$firstname','$lastname',MD5('$password'),'$email','$type','$organiztionID')";

        $dataExecute = $crud->execute($query);
        echo json_encode($dataExecute);
    }

}
