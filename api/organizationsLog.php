<?php
include "Crud.php";
$crud = new Crud();

$query = "SELECT * from organization";
$data = $crud->getData($query);
$finalData=array();

for($i=0;$i<sizeof($data);$i++){
    if($data[$i]['organizationAccepted']!=0){
        array_push($finalData,$data[$i]);
    }
}
echo json_encode($finalData);
