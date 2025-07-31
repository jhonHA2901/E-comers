<?php

return [
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        'login',
        'logout',
        'register',
        'forgot-password',
        'reset-password',
        'email/verify/*',
        'email/resend',
        'user/password',
        'user/profile-information',
        'email/verification-notification'
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000', 'http://localhost:3001'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => [
        'Content-Type',
        'X-Requested-With',
        'X-CSRF-TOKEN',
        'X-XSRF-TOKEN',
        'Authorization',
        'Accept',
        'X-Socket-Id',
        'X-CSRF-TOKEN',
        'X-Requested-With',
        'X-Socket-ID'
    ],

    'exposed_headers' => [
        'Content-Disposition',
        'X-CSRF-TOKEN',
        'X-XSRF-TOKEN'
    ],

    'max_age' => 60 * 60 * 24, // 24 hours

    'supports_credentials' => true,
]; 