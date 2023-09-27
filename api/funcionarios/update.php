<?php

    require '../conn.php';
    require '../cors.php';

    $data = file_get_contents("php://input");

    $decode_data = json_decode($data);

    if(!empty ($decode_data)){
        $sql = "UPDATE Funcionarios SET Sobrenome = ?, Nome = ?, Cargo = ?, DataNasc = ?, Endereco = ?, Cidade = ?, CEP = ?, Pais = ?, Fone = ?, Salario = ? WHERE CodFun = ?";

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
            $decode_data->codigo
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
        echo json_encode($response);
    }

?>