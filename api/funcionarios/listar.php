<?php

    require '../conn.php';
    require '../cors.php';


    // Variavel para a linha de cod a executar no sql
    $sql = "SELECT * FROM Funcionarios;";

    // Resultado da linha executada no sql
    $result = $connection -> query($sql);

    // Verifica se há alguma linha de registro no resultado
    if($result -> num_rows > 0){
        $funcionarios = [];
        // Faz um loop para cada registro encontrado
        while($row = $result -> fetch_assoc()){
            // Coloca cada row de registro no array de funcionarios
            array_push($funcionarios, $row);
        }
        // Define um array response e um índice de funcionario para os registros do outro array funcionarios
        $response = [
            'funcionarios' => $funcionarios
        ];
        echo json_encode($response);
    // Caso não tenha registros define que não foi encontrado nenhum registro
    }else{
        $response = [
            'funcionarios' => 'Nenhum registro encontrado'
        ];
        echo 'Nenhum registro encontrado!';
    }

?>