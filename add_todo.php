<?php
include('connection.php');

    $todoText = $_POST["todo"];
    $user=$_GET["id"];


    $stmt = $pdo->prepare("IN");
    $stmt->execute(array(':title' => $todoText));

    // Return the inserted todo ID and text as JSON
    $todoId = $pdo->lastInsertId();
    echo json_encode(array("id" => $todoId, "text" => $todoText));

?>