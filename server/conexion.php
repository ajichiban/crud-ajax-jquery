<?php  

    class Conexion
    {

        public function conectar()
        {
            $conn = new PDO("mysql:host=localhost;dbname=udemy-jq", 'root', '102455aj');

            return $conn;
        }
            
    }
