<?php
include('connection.php');


    $todoText = $_POST["title"];
    $user=$_POST["id"];
    $description= date("Y-m-d H:i:s");
    $todoId=rand(1, 1000);

    $stmt = $mysqli->prepare("insert into todo (Title,Description,UserID,TodoID) values(?,?,?,?); ");
    $stmt->bind_param('ssii',$todoText,$description,$user,$todoId);
    $stmt->execute();
    $response["status"]="success";
    
    

?>