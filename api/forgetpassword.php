<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    //Load composer's autoloader for php mailer
    require 'PHPMailer/vendor/autoload.php';
    include "Crud.php";

    $crud=new Crud();
    $randomNumber=mt_rand(100000,1000000); //making random code to change the password

    $data=json_decode(file_get_contents("php://input"));
    if(sizeof($data)!=0){
        $email=$data->email;
        $currentTime=date('Y-m-d H:i:s');

        $expirationTime=new DateTime($currentTime);
        $expirationTime->modify('+15 minutes');
        $expirationTime=$expirationTime->format('Y-m-d H:i:s');
        
        print_r($expirationTime);

        try{
            //start transaction
            $query1="Start transaction";
            $data1=$crud->execute($query1);

            $query2="SELECT email FROM user where email='$email'";
            $data2=$crud->getData($query2);
            if(sizeof($data2)==1){
                
                $mail = new PHPMailer(true);                                // Passing `true` enables exceptions
                try {
                    //Server settings
                    //$mail->SMTPDebug = 2;                                 // Enable verbose debug output
                    $mail->isSMTP();                                        // Set mailer to use SMTP
                    $mail->Host = gethostbyname('smtp.gmail.com');          // Specify main and backup SMTP servers
                    $mail->SMTPAuth = true;                                 // Enable SMTP authentication
                    $mail->Username = 'maneesh.15@cse.mrt.ac.lk';           // SMTP username
                    $mail->Password = 'iloveB1224';                         // SMTP password
                    $mail->SMTPSecure = 'ssl';                              // Enable TLS encryption, `ssl` also accepted
                    $mail->Port = 465;                                      // TCP port to connect to
                    $mail->SMTPOptions = array(
                        'ssl' => array(
                            'verify_peer' => false,
                            'verify_peer_name' => false,
                            'allow_self_signed' => true
                        )
                    );

                    //Recipients
                    $mail->setFrom('maneesh.15@cse.mrt.ac.lk', 'Vortex');
                    $mail->addAddress($email); // Add a recipient

                    //Content
                    $mail->isHTML(true); // Set email format to HTML
                    $mail->Subject = 'Vortex-Forget Password';
                    $mail->Body    = 'This is the Code to ';

                    if($mail->send()){
                        $query3="SELECT email from forgetpassword where email='$email'";
                        $data3=$crud->getData($query3);
                        if(sizeof($data3)==null){
                            $query4="INSERT INTO forgetpassword(email,randomCode,addedTime,expirationTime) values('$email','$randomNumber','$currentTime','$expirationTime')";
                            $data4=$crud->execute($query4);
                        }else{
                            $query5="UPDATE forgetpassword set randomCode='$randomNumber' where email='$email'";
                            $data5=$crud->execute($query5);
                        }
                    }
                } catch (Exception $e) {
                    echo 'Message could not be sent. Mailer Error: ';
                }
            }
            //end transaction
            $query7="commit";
            $data7=$crud->execute($query7);

            echo json_encode($data7);
        }catch(Exception $e){
            echo "SQL Exception";
        }
    }


?>