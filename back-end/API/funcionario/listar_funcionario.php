<?php
	include '../cors.php';
	include '../conn.php';

	$sql = "SELECT * FROM Funcionarios";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $funcionarios = [];
        while ($row = $result->fetch_assoc()) {
            array_push($funcionarios, $row);
        }

        $response = [
            'funcionarios' => $funcionarios
        ];

    } else {
        $response = [
            'funcionarios' => 'Nenhum registro encontrado!'
        ];
    }

    //sleep(2);
    echo json_encode($response);
?>