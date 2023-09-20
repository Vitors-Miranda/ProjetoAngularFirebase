<?php
	include '../cors.php';
	include '../conn.php';

    $data = file_get_contents("php://input");
    $requestData = json_decode($data);
    if(!empty($requestData)){
            $sql = 
            "
            INSERT INTO 
                Funcionarios 
            VALUES
                (0,?,?,?,?,?,?,?,?,?,?)
        ";
        $arr = [
            $requestData->sobrenome,
            $requestData->nome,
            $requestData->cargo,
            $requestData->data,
            $requestData->endereco,
            $requestData->cidade,
            $requestData->cep,
            $requestData->pais,
            $requestData->fone,
            $requestData->salario,
        ];
        $stmt = $connection->prepare($sql);

        if ($stmt->execute($arr) === true) {
            $response = [
                'status' => 'success',
                'mensagem' => 'Registro inserido com sucesso!'
            ];
        } else {
            $response = [
                'status' => 'error',
                'mensagem' => $connection->error
            ];
        }
    }
    echo json_encode($response);
?>