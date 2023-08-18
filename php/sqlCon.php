<?php

class sqlCon{
    private $dbc;
    const dbIn='pgsql:host=localhost port=5432 dbname=kiroku';
    const user='postgres';
    const password='ss21';
    
    function connect(){
        try{
            $db = new PDO(self::dbIn,self::user,self::password);
            $this -> dbc = $db;
            //$dbc=new PDO('pgsql:host=localhost port=5432 dbname=postgres', 'postgres', 'ss21');
            print('接続成功しました。<br>');
        }catch(PDOException $e){
            print('Error:'.$e->getMessage());
            die();
        }
    }
    function discon(){
        $this->dbc = null;
        print('切断しました。<br>');
    }
    function enc($str){
        $from_enc='EUC_JP';
        $to_enc='UTF-8';
        return mb_convert_encoding($str, $to_enc,$from_enc);
    }
    
    function select(){
        $this->connect();
        try{
            $sql="SELECT hizuke,SUM(endd-start) as sa FROM workTime WHERE category='work' GROUP BY hizuke ORDER BY hizuke";
            $stmt=$this -> dbc->query($sql);
            foreach($stmt as $row){
                //$work_array=array("\'"+$row['hizuke']+"\'"=>"\'"+$row['sa']+"\'");
                /*
                print($row['hizuke']);
                print($row['sa'].'<br>');
                */
                $json=json_dencode($row['hizuke'],true);
            }
            print '<br>';
            echo $json;
        }catch (PDOException $e){
            print('Error:'.$e->getMessage());
            die();
        }
        $this->discon();
    }
    
}
$test=new sqlCon();
$test -> select();

?>