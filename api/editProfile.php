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
    $firstname = $data->userDetails->firstname;
    $lastname = $data->userDetails->lastname;
    $email = $data->userDetails->email;

    //check validation with regular expressions
    $tempFirstname = $validation->is_name_valid($firstname);
    $tempLastname = $validation->is_name_valid($lastname);
    $tempEmail = $validation->is_email_valid($email);

    //error messages display
    if (!$tempFirstname) {
        $firstnameError = "Invaild First Name";
        echo json_encode("1");
    } elseif (!$tempLastname) {
        $lastnameError = "Invaild Last Name";
        echo json_encode("2");
    } elseif (!$tempEmail) {
        $emailError = "Invaild E-mail Address";
        echo json_encode("3");
    }

    if ($tempFirstname && $tempLastname && $tempEmail) {
        $query1 = "Start transaction";
        $data1 = $crud->execute($query1);

        $query5 = "SELECT email from user where username='$username'";
        $data5 = $crud->getData($query5);
        if ($data5[0]['email'] != $email) {
            $query2 = "SELECT * FROM user where email='$email'";
            $data2 = $crud->execute($query2);
            if ($data2 == null) {
                $query = "UPDATE user SET firstname='$firstname',lastname='$lastname',email='$email' WHERE username='$username'";
                $dataExecute = $crud->execute($query);
                echo json_encode("0");
            } else {
                echo json_encode("3");
            }
        } else {
            $query = "UPDATE user SET firstname='$firstname',lastname='$lastname' WHERE username='$username'";
            $dataExecute = $crud->execute($query);
            echo json_encode("0");
        }
        $query3 = "COMMIT";
        $data3 = $crud->execute($query3);
    }

}
