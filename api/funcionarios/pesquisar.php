<?php

    require '../conn.php';
    require '../cors.php';

    $data = file_get_contents("php://input");

    $decode_data = json_decode($data);


    $sql = "SELECT * FROM Funcionarios WHERE $decode_data->opcao LIKE '%$decode_data->word%'";

    $result = $connection -> query($sql);
    
    if($result -> num_rows > 0){
        $funcionarios = [];
        while($row = $result -> fetch_assoc()){
            array_push($funcionarios, $row);
        }
        $response = [
            'funcionarios' => $funcionarios
        ];
        echo json_encode($response);
    }else{
        $response = [
            'error' => 'Nenhum registro encontrado'
        ];
        echo json_encode($response);
    }

?>