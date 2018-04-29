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
                $mail->Username = 'vortexmobilevotingapp@gmail.com'; // SMTP username
                $mail->Password = 'Maneesha@123'; // SMTP password
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
                $mail->Body = '<!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
<!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
<!-- QUESTIONS? TWEET US @LITMUSAPP -->
-<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link href="https://fonts.googleapis.com/css?family=Exo:300i,400" rel="stylesheet">
<style type="text/css">
    /* FONTS */
    @media screen {
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          src: local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");
        }
        
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 700;
          src: local("Lato Bold"), local("Lato-Bold"), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff");
        }
        
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 400;
          src: local("Lato Italic"), local("Lato-Italic"), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff");
        }
        
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 700;
          src: local("Lato Bold Italic"), local("Lato-BoldItalic"), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff");
        }
    }
    
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: "Exo", sans-serif !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#539be2" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                        <a href="#" target="_blank">
                            <img src="https://vortexmobievotingapp.000webhostapp.com/imgs/logomain.png" width="80" height="80" style="display: block; width: 100px; max-width: 100px; min-width: 40px; font-family: '.'Exo'.', sans-serif; color: #ffffff; font-size: 18px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#539be2" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: '.'Exo'.', sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 48px; font-weight: 400; margin: 0;">Want to See the Results?</h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: '.'Exo'.', sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Hi,<br><br>

                    You recently request to see the voting ballot results, of '.$data3[0]["votingballotName"].'</p>
                    <h3 style="text-align: center;">Public Security Key : ' .$data3[0]["publicKey"] . '</h3>
                    <h3 style="text-align: center;">Private Security Key : ' .$priSecKey.'</h3>
                    <p style="text-align: justify;">For security,If you didnot request to see the results, please ignore this email</p>
<br><br>
Thanks,
<br>
Team Vortex</p>
                </td>
              </tr>
              <!-- VIDEO -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 0px 0px 0px;" >
                   <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <!-- HEADLINE -->
                <tr>
                  <td bgcolor="#539be2" align="left" style="padding: 40px 30px 20px 30px; color: #ffffff; font-family: '.'Exo'.', sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <h2 style="font-size: 24px; font-weight: 400; margin: 0;">Vortex - The Mobile Voting App</h2>
                  </td>
                </tr>
                <!-- COPY -->
                <tr>
                  <td bgcolor="#539be2" align="left" style="padding: 0px 30px 20px 30px; color:#539be2; font-family: '.'Exo'.', sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;"> Vortex is a solution to held those ballots in an efficinet way</p>
                  </td>
                </tr>
                <!-- COPY -->
                
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>
';

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
