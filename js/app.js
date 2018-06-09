$(()=>{

/*===========================================================
                 INSERTANDO DATOS                                  
=============================================================*/
function limpiarForm(){
    $('input').val("")
    $('select').val("")
}
function removerAlertas(){
   var rm= setInterval(()=>{
        $('.alert').remove()
        clearInterval(rm)
    }, 3000)
    
}
$('#form-alumnos').submit( e => { 
    e.preventDefault();
    let datos = new FormData($('#form-alumnos')[0])

    /*--- Llamada  ajax ---*/
    $.post("server/ajax.php?op=add",$('#form-alumnos').serialize())
        .done((data)=> {
            $('.alertas').html(`
                <span class="alert alert-success"> Alumno  agregado !</span>
            `);
            removerAlertas()
            limpiarForm()
            listarAlumnos()

        })
});

/*===========================================================
                    LISTAR REGISTROS
=============================================================*/ 

listarAlumnos()

function listarAlumnos()
{
    $.post("server/ajax.php?op=list")
        .done(data=>{
            data = JSON.parse(data)

            $('.table tbody').html('');
            data.forEach(alumn => {
                $('.table tbody').append(`
                    <tr>
                        <td>${alumn.id}</td>
                        <td>${alumn.nombre}</td>
                        <td>${alumn.estado}</td>
                        <td class="text-center"><a href="#" class="btn btn-primary"  data-id="${alumn.id}" ><i class="fas fa-edit"></i></a></td>
                        <td class="text-center"><a href="#" class="btn btn-danger" data-id="${alumn.id}" ><i class="fa fa-times" aria-hidden="true"></i></a></td>
                    </tr>
                `)
            });
           update_alumn()
           delete_alumn() 
        })
}

/*===========================================================
                         ACTUALIZACION                                  
=============================================================*/
function update_alumn()
{
    $('a.btn-primary').click(function(){

        /*--- btn Guardar a Actualizar ---*/
        $('button.btn-primary').hide()
        $('button.btn-success').show()
        $('button.btn-warning').show()

        /*--- Crear el formulario de Actualizacion ---*/
        var el_nombre = $(this).parent().prev().prev('td').html()
        var el_estado = $(this).parent().prev().html()
        var id = $(this).attr('data-id')

        $('input').val(el_nombre)
        $('select').val(el_estado)

        /* Si se presiona el boton de "Cancelar"*/
        $('button.btn-warning').click((e)=>{
            e.preventDefault()
            limpiarForm()
            $('button.btn-primary').show()
            $('button.btn-success').hide()
            $('button.btn-warning').hide()
        })

        /* Si se presiona el boton de "actualizar"*/
        $('button.btn-success').click((e)=>{
            e.preventDefault()
            $.post("server/ajax.php?op=update",{
                id: id,
                nombre: $('input').val(),
                estado: $('select').val()
            })
            .done(data =>{
                limpiarForm()
                $('button.btn-primary').show()
                $('button.btn-success').hide()
                $('button.btn-warning').hide()

                $('.alertas').html(`
                <span class="alert alert-success"> Alumno Actualizado !</span>
                `);
                removerAlertas()
                listarAlumnos()
            })
        })  
    })
}
function delete_alumn()
{
    $('a.btn-danger').click(function(e){
        e.preventDefault()
        let id = $(this).attr('data-id')
        $.post("server/ajax.php?op=delete",{id : id})
            .done(data=>{
                console.log('data :', data);
                if(data === 'ok'){
                    $('.alertas').html(`
                    <span class="alert alert-danger"> Alumno eliminado !</span>
                    `); 
                    removerAlertas()
                    listarAlumnos()
                }else{
                    console.log('hubo un error');
                    
                }
            })
    })
}

}) /* Fin funcion autoejecutable*/