<?php  
require_once 'alumnosModel.php';

class Ajax
{
    public $nombre;
    public $id;
    public $estado;

    public function add_alumn()
    {
        $res = AlumnosModel::add_alumn($this->nombre);
        echo $res;
    }

    public function list_alumns()
    {
        $res = AlumnosModel::list_alumns();
        echo json_encode($res);
    }

    public function update_alumn(){
        $datos = array(
            'id'=> $this->id,
            'nombre'=> $this->nombre,
            'estado'=> $this->estado
        );
        $res = AlumnosModel::update_alumn($datos);
        echo $res;
    }

    public function delete_alumn()
    {
        $res = AlumnosModel::delete_alumn($this->id);
        echo $res;
    }
}

switch($_GET['op']){

    case 'add':
        if($_POST['nombre'] != ''){
            $a = new Ajax();
            $a->nombre = $_POST['nombre'];
            $a->add_alumn();

        }
        break;

    case 'list':
        $b = new Ajax();
        $b->list_alumns();
        break;

    case 'update':
        $c = new Ajax();
        $c->id = $_POST['id'];
        $c->nombre = $_POST['nombre'];
        $c->estado = $_POST['estado'];
        $c->update_alumn();
        break;

    case 'delete':
        $d = new Ajax();
        $d->id = $_POST['id'];
        $d->delete_alumn();
        break;

}