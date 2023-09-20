<?php
	include '../cors.php';
	include '../conn.php';

	// Obtém o corpo da solicitação POST
  $data = file_get_contents("php://input");

  // Decodifica o JSON para um objeto PHP
  $requestData = json_decode($data);
	// CodFun é o nome da coluna que está sendo enviado pelo cliente
	$sql = "SELECT * FROM Funcionarios WHERE CodFun='$requestData->CodFun'";
    $funcionario = $connection->query($sql)->fetch_assoc();
    if(!empty($funcionario)){
        $response = [
            'status' => 'success',
            'funcionario' => $funcionario
        ];
    } else{
        $response = [
            'status' => 'error',
            'funcionario' => "funcionario não encontrado"
        ];
    }
    
    
    echo json_encode($response);
?>