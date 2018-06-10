<?php  

    class Conexion
    {

        public function conectar()
        {
            $conn = new PDO("mysql:host=localhost;dbname=udemy-jq", 'root', '');

            return $conn;
        }
            
    }
