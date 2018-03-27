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
    $type = 2; //this is for Managers
    $organizationRegNo = $data->organizationRegNo;
    $organizationName=$data->organizationName;
    $organizationAddress=$data->organizationAddress;
    $accepted=0;
    //check validation with regular expressions
    $tempFirstname = $validation->is_name_valid($firstname);
    $tempLastname = $validation->is_name_valid($lastname);
    $tempEmail = $validation->is_email_valid($email);
    $tempUsername=true;
    $tempCompanyRegNo=true;
    $tempEmailUsed=true;

    //check already in database
    $tQ1="SELECT * from user where username='$username'";
    $tQ2="SELECT * from user where email='$email'";
    $tQ3="SELECT * from organization where organizationRegNo='$organizationRegNo'";
    
    $tD1=$crud->getData($tQ1);
    $tD2=$crud->getData($tQ2);
    $tD3=$crud->getData($tQ3);

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
    }elseif(sizeof($tD1)!=null){
        $tempUsername=false;
        echo("4");
    }elseif(sizeof($tD2)!=null){
        $tempEmailUsed=false;
        echo("5");
    }elseif(sizeof($tD3)!=null){
        $tempCompanyRegNo=false;
        echo("6");
    }
    
    if($tempFirstname && $tempLastname && $tempEmail && $tempUsername && $tempCompanyRegNo && $tempEmailUsed){
        $query1="Start transaction";
        $data1=$crud->execute($query1);
    
        $query2="INSERT INTO organization(organizationRegNo,organizationName,organizationAddress,organizationAccepted) VALUES('$organizationRegNo','$organizationName','$organizationAddress','$accepted')";
        $data2=$crud->execute($query2);
    
        $query3="SELECT organizationID from organization order by organizationID DESC LIMIT 1";
        $data3=$crud->getData($query3);
    
        if($data2){
            $organizationID=$data3[0]['organizationID'];
            if ($tempFirstname && $tempLastname && $tempEmail) {
                $query = "INSERT INTO user(username,firstname,lastname,password,email,type,organizationID,accepted) VALUES('$username','$firstname','$lastname',MD5('$password'),'$email','$type','$organizationID',' $accepted')";
                $dataExecute = $crud->execute($query);
                
            }
        }
        $query4="commit";
        $data4=$crud->execute($query4);
        echo json_encode("7");
    
    }
}
