<?php
include('connection.php');


    $todoText = $_POST["title"];
    $user=$_POST["id"];
    $todoId=rand(1, 1000);

    $stmt = $mysqli->prepare("insert into todo () ");
    $stmt->execute(array(':title' => $todoText));

    $todoId = $mysqli->lastInsertId();
    echo json_encode(array("id" => $todoId, "text" => $todoText));

?>