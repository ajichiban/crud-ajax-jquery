<?php  
require_once 'conexion.php';

class AlumnosModel
{
    public function add_alumn($nombre)
    {
        $stmt = Conexion::conectar()->prepare(
            "INSERT INTO alumnos (nombre) VALUES (:nombre)"
        );
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        if($stmt->execute()){
            return 'ok';
        }else{
            return 'error';
        }
    }

    public function list_alumns()
    {
        $stmt = Conexion::conectar()->prepare(
            "SELECT * FROM alumnos "
        );
        if($stmt->execute()){
            return $stmt->fetchAll();
        }else{
            return 'error';
        }
    }

    public function update_alumn($datos)
    {
        $stmt = Conexion::conectar()->prepare(
            "UPDATE alumnos SET nombre = :nombre, estado = :estado WHERE id = :id "
        );
        $stmt->execute(array(
            ':id'=>$datos['id'],
            ':nombre'=>$datos['nombre'],
            ':estado'=>$datos['estado']
        ));

        if(!$stmt->execute()){
            return 'error';
        }else{
            return 'ok';
        }
    }

    public function delete_alumn($id)
    {
        $stmt = Conexion::conectar()->prepare(
            "DELETE FROM alumnos WHERE id = :id "
        );
        $stmt->bindParam(':id', $id , PDO::PARAM_INT);
        if($stmt->execute()){
            return 'ok';
        }else{
            return 'error';
        }
    }
}