<?php
include "../Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));

if (sizeof($data) != null) {
    $votingballotID = $data->votingballotID;
    $votingoptionIDs=$data->votingoptionIDs;
    $resultArray=array();
    
    for($i=0;$i<sizeof($votingoptionIDs);$i++){
        $votingoptionID=$votingoptionIDs[$i]->votingoptionID;
        $query = "SELECT count(votingoptionID) FROM voters where votingballotID='$votingballotID' and votingoptionID='$votingoptionID'";
        $results = $crud->getData($query);
        
        array_push($resultArray,(int)$results[0]['count(votingoptionID)']);//get the option count
    }
    echo json_encode($resultArray);
}
?>