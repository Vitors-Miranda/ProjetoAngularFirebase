<?php

    require '../conn.php';
    require '../cors.php';

    $data = file_get_contents("php://input");

    $decode_data = json_decode($data);

    $sql = "DELETE FROM Funcionarios WHERE CodFun='$decode_data->CodFun'";

    if($connection -> query($sql) === true){
        $response = [
            'message' => 'Deleted with success'
        ];
    }else{
        $response = [
            'message' => $connection -> error
        ];
    }
    echo json_encode($response);

?>  