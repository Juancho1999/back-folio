<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->name) || !isset($data->email) || !isset($data->phone) || !isset($data->message)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'iralajuan099@gmail.com'; // Configura tu email
    $mail->Password = 'nuerkapjxardorap'; // App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom($data->email, $data->name);
    $mail->addAddress('iralajuan099@gmail.com'); // Cambia al email que recibirá los mensajes
    $mail->Subject = 'Mensaje de Contacto: ' . $data->name;
    $mail->Body = "Nombre: {$data->name}\nEmail: {$data->email}\nTeléfono: {$data->phone}\nMensaje: {$data->message}";

    $mail->send();

    echo json_encode(["status" => "success", "message" => "Correo enviado"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
}
?>
