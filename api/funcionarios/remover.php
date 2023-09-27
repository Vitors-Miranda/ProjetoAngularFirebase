<?php

    require '../conn.php';
    require '../cors.php';

    // linhas para a requisicao dos dados para o botao de remover funcionarios
    $data = file_get_contents("php://input");

    $decode_data = json_decode($data);

    // Linha sql a ser executada
    $sql = "DELETE FROM Funcionarios WHERE CodFun='$decode_data->CodFun'";

    // Verifica se a linha SQL foi executada
    if($connection -> query($sql) === true){
        // Caso tenha sido, escreve essa mensagem
        $response = [
            'message' => 'Deleted with success'
        ];
    }else{
        // Caso não escreve o erro
        $response = [
            'message' => $connection -> error
        ];
    }
    echo json_encode($response);

?>  