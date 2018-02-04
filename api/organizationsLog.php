<?php
    include "Crud.php";
    $crud=new Crud();

    $query="Select * from organization";
    $data=$crud->getData($query);

    echo json_encode($data);
?>