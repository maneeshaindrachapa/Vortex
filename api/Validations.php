<?php
class Validation{
    public function check_empty($data,$fields){
        $msg=null;
        foreach($fields as $value){
            if(empty($data[$value])){
                $msg="$value field empty <br>";
            }
        }
        return $msg;
    }
    
    //email validation
    public function is_email_valid($email){
        if (filter_var($email, FILTER_VALIDATE_EMAIL)){    
            return true;  
        }
        return false;
      }
    
    //address validation  
    public function is_address_valid($address){
        $string_exp = "/^[A-Za-z0-9 ,.'-]+$/";
        if (strlen($address)>0 && preg_match($string_exp,$address)){
            return true;
        }
        return false;
    }

    //password length validation
    public function password_length($password){
        if(strlen($password)>=8){
            return true;
        }
        return false;
    } 

    //password valid check
    public function is_password_valid($password,$re_password){
        if($password==$re_password){
            return true;
        }
        return false;
    }

    //name validation
    public function is_name_valid($Name){
        $string_exp = "/^[A-Za-z0-9 .'-]+$/";
        if(preg_match($string_exp,$Name)) {
            return true;
        }
        return false;
    }

    //telephone validation
    public function is_tel_valid($telephoneNo){
        $tel_string='/^[0-9]{10}+$/';//10 digits in tel no
        if(preg_match($tel_string,$telephoneNo)){
            return true;
        }
        return false;
    }
}
?>