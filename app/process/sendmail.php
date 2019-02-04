<?php

$variabeDataPost = $_POST;

echo "<pre>";
	print_r($variabeDataPost);
echo "</pre>";
// exit();
// Modify the path in the require statement below to refer to the
// location of your Composer autoload.php file.
//require 'path_to_sdk_inclusion';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
require 'vendor/autoload.php';

// Instantiate a new PHPMailer
$mail = new PHPMailer;

// Tell PHPMailer to use SMTP
$mail->isSMTP();

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
$mail->setFrom($variabeDataPost['email'], $variabeDataPost['name']);

// Replace recipient@example.com with a "To" address. If your account
// is still in the sandbox, this address must be verified.
// Also note that you can include several addAddress() lines to send
// email to multiple recipients.
$mail->addAddress('info@redkendi.com', 'Info Redkendi');

// Replace smtp_username with your Amazon SES SMTP user name.
$mail->Username = 'smtp@redkendi.com';

// Replace smtp_password with your Amazon SES SMTP password.
$mail->Password = '!l0v3Redkendi';

// Specify a configuration set. If you do not want to use a configuration
// set, comment or remove the next line.
//$mail->addCustomHeader('X-SES-CONFIGURATION-SET', 'ConfigSet');

// If you're using Amazon SES in a region other than US West (Oregon),
// replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP
// endpoint in the appropriate region.
$mail->Host = 'mail.redkendi.com';

// The subject line of the email
$mail->Subject = 'Email from Contact Us Redkendi Website';

// The HTML-formatted body of the email
$message .= '<p>Name: '.$variabeDataPost['name'].'</p>';
$message .= '<p>Email: '.$variabeDataPost['email'].'</p>';
$message .= '<p>Message: '.$variabeDataPost['message'].'</p>';

$mail->Body = $message;


// Tells PHPMailer to use SMTP authentication
$mail->SMTPAuth = true;

// Enable TLS encryption over port 587
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Tells PHPMailer to send HTML-formatted email
$mail->isHTML(true);
$mail->SMTPDebug  = 3;

// The alternative email body; this is only displayed when a recipient
// opens the email in a non-HTML email client. The \r\n represents a
// line break.
$mail->AltBody = "Email Test\r\nThis email was sent through the
    Amazon SES SMTP interface using the PHPMailer class.";

if(!$mail->send()) {
    echo "Email not sent. " , $mail->ErrorInfo , PHP_EOL;
} else {
    echo "Email sent!" , PHP_EOL;
}
?>
