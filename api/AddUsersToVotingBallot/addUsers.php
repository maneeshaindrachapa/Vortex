<?php
include "../Crud.php";
$crud = new Crud();

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $username = $data->username;
    $ballotID = $data->ballotID;

    $query = "start transaction";
    $data = $crud->execute($query);

    $query2 = "select username from voters where username='$username' and votingballotID='$ballotID'";
    $data2 = $crud->getData($query2);

    if (sizeof($data2) == null) {
        $query1 = "insert into voters(username,votingballotID) values('$username','$ballotID')";
        $data1 = $crud->execute($query1);

        $query4 = "commit";
        $data4 = $crud->execute($query4);

        echo json_encode("0");
    } else {
        echo json_encode("1");
    }
}
