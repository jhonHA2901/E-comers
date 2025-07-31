<?php

/**
 * Script para generar una clave de aplicación Laravel
 * Útil para configurar APP_KEY en Railway
 */

// Generar una cadena aleatoria de 32 caracteres
$randomBytes = random_bytes(32);
$base64Key = 'base64:' . base64_encode($randomBytes);

echo "Clave de aplicación generada:\n";
echo $base64Key . "\n";
echo "\nCopia esta clave y úsala como valor para APP_KEY en tus variables de entorno de Railway.\n";