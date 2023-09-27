<?php

    require '../conn.php';
    require '../cors.php';

    
    $codigo = $_GET['codigo'];
    
    $sql = "SELECT * FROM Funcionarios WHERE CodFun = $codigo;";
    
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
            'funcionarios' => 'Nenhum registro encontrado'
        ];
        echo 'Nenhum registro encontrado!';
    }
?>