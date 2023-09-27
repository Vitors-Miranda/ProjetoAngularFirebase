<?php

    require '../conn.php';
    require '../cors.php';
    
    // linhas para a requisicao dos dados para o botao de remover funcionarios
    $data = file_get_contents("php://input");

    $decode_data = json_decode($data);
    if(!empty ($decode_data)){
        // Linha sql a ser executada
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

        // Verifica se a linha SQL foi executada
        if($stmt -> execute($allValues) === true){
            // Caso tenha sido, escreve essa mensagem
            $response = [
                'message' => 'Inserido com success'
            ];
        }else{
            // Caso não escreve o erro
            $response = [
                'message' => $connection -> error
            ];
        }
        echo json_encode($response);
    }

  
?>