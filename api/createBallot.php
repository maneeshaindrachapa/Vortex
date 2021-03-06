<?php
include "Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != null) {
    //making variables for all the data get in JSON
    $username = $data->username;
    $ballotName = $data->ballotName;
    $ballotDescription = $data->ballotDescription;
    $startDate = $data->startDate;
    $startTime = $data->startTime;
    $holdingHours = $data->holdingHours;
    $url = $data->url;
    $noOfOptions = $data->noOfOptions;
    $options = ($data->ballotOptionsContainer);
    $randomNumber = mt_rand(100000, 1000000); //making random code to change the password
    $temp = (int) $holdingHours;
    $Time = new DateTime($startDate . $startTime);
    $Time->add(new DateInterval('PT' . $temp . 'H'));
    $endDate = $Time->format('Y-m-d');
    $endTime = $Time->format('H:i:s');

    //mySql transation begin
    $query1 = "Start transaction";
    $data1 = $crud->execute($query1);

    //getting organizationID
    $query2 = "SELECT organizationID from user where username='$username'";
    $data2 = $crud->getData($query2);
    $organizationID = $data2[0]['organizationID'];

    //create voting ballot
    $query3 = "INSERT INTO votingBallot(organizationID,votingBallotName,votingBallotDescription,startDate,startTime,endDate,endTime,image,noOfOptions,publicKey) values('$organizationID','$ballotName','$ballotDescription','$startDate','$startTime','$endDate','$endTime','$url','$noOfOptions','$randomNumber')";
    $data3 = $crud->execute($query3);

    //get the votingBallot ID
    $query4 = "SELECT votingBallotID from votingBallot order by votingBallotID DESC LIMIT 1";
    $data4 = $crud->getData($query4);
    $tempBallotID = $data4[0]['votingBallotID'];
    //insert options to votingBallotOptions
    for ($i = 0; $i < $noOfOptions; $i++) {
        $temp = $options->$i;
        $query5 = "INSERT INTO votingoption(votingBallotID,votingoptionName) values('$tempBallotID','$temp')";
        $data5 = $crud->execute($query5);
    }

    //end transactiot
    $query7 = "commit";
    $data7 = $crud->execute($query7);

    echo json_encode($data7);

}
