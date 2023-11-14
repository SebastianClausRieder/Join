<?php

########### CONFIG MAIL INPUT ###########

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];

        $message = "Dear Join User \n
        \n Follow this link to reset your Join password for your " . $email . " account. \n
        \n https://sebastian-rieder.developerakademie.net/Join/reset-pw.html?email=" . $email . "\n
        \n If you didn't request an email to reset your password, you can simply ignore it. \n
        \n Thank you \n
        \n Your Join Team \n";

        $recipient = $email;
        $subject = "Reset your password for Join App";
        $headers = "From: noreply@developerakademie.com";

        $result = mail($recipient, $subject, $message, $headers);
        print($result);

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
?>
