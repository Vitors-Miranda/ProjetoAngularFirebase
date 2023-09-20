<?php
	include '../cors.php';
	include '../conn.php';

    $data = file_get_contents("php://input");

    $requestData = json_decode($data);
    $sql = 
        "
        UPDATE 
            Funcionarios 
        SET
            Sobrenome = ?,
            Nome = ?,
            Cargo = ?,
            Datanasc = ?,
            Endereco = ?,
            Cidade = ?,
            CEP = ?,
            Pais = ?,
            Fone = ?,
            Salario = ?
        WHERE 
            CodFun='$requestData->CodFun'
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
            'mensagem' => 'Registro atualizado com sucesso!'
        ];
    } else {
        $response = [
            'status' => 'error',
            'mensagem' => $connection->error
        ];
    }
    echo json_encode($response);
?>