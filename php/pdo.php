<?php
$dbIn='pgsql:host=localhost port=5432 dbname=kiroku';
$user='postgres';
$password='ss21';
$category=filter_input(INPUT_POST,'category');;
$hizuke = filter_input(INPUT_POST,'hizuke');
$start = filter_input(INPUT_POST,'start');
$end=filter_input(INPUT_POST,'end');
//$table=filter_input(INPUT_POST,'table');

try{
    $db = new PDO($dbIn,$user,$password);
    if(!$db){
        print('接続失敗<br>');
    }
    if($end==""){
        $sql ="INSERT INTO workTime(category,hizuke,start) VALUES(:category,:hizuke,:start)";
    }else if(!$end==""){
        $sTime=new DateTime($start);
        $eTime=new DateTime($end);
        $dif= $sTime->diff($eTime);
        $tdif=$dif->format('%H%I%S');
        if($tdif<=0000010){
            $sql="DELETE FROM workTime WHERE start=:start";
        }else{
            $sql ="UPDATE workTime SET endd=:end WHERE start=:start";
        }
    }
    $stm= $db ->prepare($sql);
    try{
        if($end==""){ 
            $stm -> bindParam(":category",$category);
            $stm -> bindParam(":hizuke",$hizuke);
            $stm -> bindParam(":start",$start);
        }else if(!$end==""){
            if($tdif<=0000010){
                $stm -> bindParam(":start",$start);
            }else{
                $stm -> bindParam(":end",$end);
                $stm -> bindParam(":start",$start);
            }
        }
        $flg=$stm->execute();
        if(!$flg){
            print('データの追加に失敗<br>');
        }
    }catch (PDOException $e) {
        print('Error:'.$e->getMessage());
    }
    
    $db = null;
    
}catch(PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}

?>