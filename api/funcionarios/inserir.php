<?php

    require '../conn.php';
    require '../cors.php';
    
    $data = file_get_contents("php://input");

    $decode_data = json_decode($data);
    if(!empty ($decode_data)){
        $sql = "INSERT INTO funcionarios VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        $stmt = $connection -> prepare($sql);

        $allValues = [
            $decode_data->sobrenome,
            $decode_data->nome,
            $decode_data->cargo,
            $decode_data->dataNasc,
            $decode_data->endereco,
            $decode_data->cidade,
            $decode_data->cep,
            $decode_data->pais,
            $decode_data->fone,
            $decode_data->salario,
        ];

        if($stmt -> execute($allValues) === true){
            $response = [
                'message' => 'Inserido com success'
            ];
        }else{
            $response = [
                'message' => $connection -> error
            ];
        }
        return json_encode($response);
    }

  
?>