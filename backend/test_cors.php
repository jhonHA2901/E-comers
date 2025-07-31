<?php

// Script para probar CORS
$url = 'http://localhost:8001/api/register';

echo "=== PRUEBA DE CORS ===\n";

// Petición OPTIONS (preflight)
echo "1. Probando petición OPTIONS:\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'OPTIONS');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Origin: http://localhost:3000',
    'Access-Control-Request-Method: POST',
    'Access-Control-Request-Headers: Content-Type, Accept'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headers = curl_getinfo($ch, CURLINFO_HEADER_OUT);
curl_close($ch);

echo "Código HTTP: " . $httpCode . "\n";
echo "Headers enviados: " . $headers . "\n";
echo "Respuesta: " . $response . "\n\n";

// Petición POST simple
echo "2. Probando petición POST simple:\n";
$data = [
    'nombre' => 'Test CORS',
    'email' => 'cors' . time() . '@test.com',
    'password' => '123456',
    'password_confirmation' => '123456',
    'direccion' => 'Test',
    'telefono' => '123456789'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Origin: http://localhost:3000'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Código HTTP: " . $httpCode . "\n";
echo "Respuesta: " . $response . "\n"; 