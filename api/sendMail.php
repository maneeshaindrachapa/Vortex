<?php
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

//Load composer's autoloader for php mailer
require 'PHPMailer/vendor/autoload.php';
include "Crud.php";

$crud = new Crud();
$priSecKey = mt_rand(100000, 1000000); //making random code to change the password

$data = json_decode(file_get_contents("php://input"));
if (sizeof($data) != 0) {
    $username = $data->username;
    $votingballotid = $data->votingballotID;

    try {
        //start transaction
        $query1 = "Start transaction";
        $data1 = $crud->execute($query1);

        $query2 = "SELECT email FROM user where username='$username'";
        $data2 = $crud->getData($query2);

        $query3="SELECT votingballotName,publicKey from votingballot where votingballotID='$votingballotid'";
        $data3=$crud->getData($query3);

        if (sizeof($data2) == 1) {
            $email=$data2[0]['email'];
            $mail = new PHPMailer(true); // Passing `true` enables exceptions
            try {
                //Server settings
                //$mail->SMTPDebug = 2;                                 // Enable verbose debug output
                $mail->isSMTP(); // Set mailer to use SMTP
                $mail->Host = gethostbyname('smtp.gmail.com'); // Specify main and backup SMTP servers
                $mail->SMTPAuth = true; // Enable SMTP authentication
                $mail->Username = 'maneesh.15@cse.mrt.ac.lk'; // SMTP username
                $mail->Password = 'iloveB1224'; // SMTP password
                $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 465; // TCP port to connect to
                $mail->SMTPOptions = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true,
                    ),
                );

                //Recipients
                $mail->setFrom('maneesh.15@cse.mrt.ac.lk', 'Vortex');
                $mail->addAddress($email); // Add a recipient

                //Content
                $mail->isHTML(true); // Set email format to HTML
                $mail->Subject = 'Vortex-Security Keys';
                $mail->Body = '<h1 style="text-align: center;"><span style="text-decoration: underline;">Vortex</span></h1>
                    <p style="text-align: justify;">Hi,</p>
                    <p style="text-align: justify;">You recently request to see the voting ballot results, of '.$data3[0]["votingballotName"].'</p>
                    <h3 style="text-align: center;">Public Security Key : ' .$data3[0]["publicKey"] . '</h3>
                    <h3 style="text-align: center;">Private Security Key : ' .$priSecKey.'</h3>
                    <p style="text-align: justify;">For security,If you didnot request to see the results, please ignore this email</p>
                    <p style="text-align: left;">Thanks,</p>
                    <p style="text-align: left;">Team Vortex</p>';

                if ($mail->send()) {
                    $query4 = "UPDATE voters set privateKey=MD5('$priSecKey') where username='$username' and votingballotID='$votingballotid'";
                    $data4 = $crud->execute($query4);
                }
            } catch (Exception $e) {
                echo 'Message could not be sent. Mailer Error';
            }
        }
        //end transaction
        $query7 = "commit";
        $data7 = $crud->execute($query7);
        echo json_encode($data7);
    } catch (Exception $e) {
        echo "SQL Exception";
    }
}
