$(document).ready(function() {
    //alert('hola :)');
    llenadoTable();

});

//inicio de llanado tabla
function llenadoTable(){
    $.ajax({
        type: 'ajax',
        method: 'get',
        url: 'http://localhost:7555/api/Veterinaria/listar',
        success: function(gato){
            console.log("correcto listar"+JSON.stringify(gato));

            var cuerpo;
            for(var i = 0; i < gato.length; i++){
                cuerpo += '<tr>'+
                '<td>'+gato[i].idVeterinaria+'</td>'+
                '<td>'+gato[i].pacientetipo+'</td>'+
                '<td>'+gato[i].nombre+'</td>'+
                '<td>'+gato[i].edad+'</td>'+
                '<td>'+gato[i].peso+'</td>'+
                '<td>'+gato[i].fechaingreso+'</td>'+
                '<td>'+gato[i].fechasalida+'</td>'+
                '<td><a class = "btn btn-warning" data = "'+gato[i].idVeterinaria+'"><i class = "fa fa-fw fa-refresh"></i></td></a>'+
                '<td><a class = "btn btn-danger" data = "'+gato[i].idVeterinaria+'"><i class = "fa fa-fw fa-refresh"></i></td></a>'+
                '</th>';
            }//cierra for
            $('#CuerpoT').html(cuerpo);

        },//cirra success
        error: function(sasu){
            console.log("error listar"+JSON.stringify(sasu));
        }



    });//cierra ajax

}//fin de la funcion


$('#btnAbrirGuardar').click(function(){
    console.log("hola desde consola");
    $('#modalGuardar').modal('show');


});
//inicia btn Guardar
$('#btnGuardar').click(function(){

var idVeterinaria = $('#idVeterinaria').val();
var pacientetipo = $('#pacientetipo').val();
var nombre = $('#nombre').val();
var edad = $('#edad').val();
var peso = $('#peso').val();
var fechaingreso = $('#fechaingreso').val();
var fechasalida = $('#fechasalida').val();


    console.log("idVeterinaria: "+idVeterinaria);
    console.log("pacientetipo: "+pacientetipo);
    console.log("nombre: "+nombre);
    console.log("edad: "+edad);
    console.log("peso: "+peso);
    console.log("fechaingreso: "+fechaingreso);
    console.log("fechasalida: "+fechasalida);


        if(idVeterinaria == ''){
            alert("Falta el Id");
        }else if(pacientetipo == ''){
            alert("Falta el nombre");
        }else if(nombre == ''){
            alert("Falta el nombre");
        }else if(edad == ''){
            alert("Falta la edad");
        }else if(peso == ''){
            alert("Falta el peso");
        }else if(fechaingreso == ''){
            alert("Falta la fecha de ingreso");
        }else if(fechasalida == ''){
        }else{ 

    var json = {"idVeterinaria": idVeterinaria, "pacientetipo": pacientetipo, "nombre": nombre, "edad": edad, "peso": peso, "fechaingreso": fechaingreso, "fechasalida": fechasalida}
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7555/api/Veterinaria/guardar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto guardar"+JSON.stringify(gato));
            $('#modalGuardar').modal('hide');
            limpiar();
            $('.alert-success').html("se guardo la mascota: "+nombre).fadeIn().delay(4000).fadeOut('slow');
            llenadoTable();
        },
        error: function(sasu){
                    console.log("error guardar"+JSON.stringify(sasu));
        }

    });

    }//cierra else if

});



//iniciar buscar editar la tabla

$('#CuerpoT').on('click', '.btn-warning', function(){
    var idVeterinaria = $(this).attr('data')
    console.log("idVeterinaria = "+idVeterinaria);
    var json = {"idVeterinaria": idVeterinaria};
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7555/api/Veterinaria/buscar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto buscar"+JSON.stringify(gato));
            $('#idVeterinariaU').val(gato.idVeterinaria);
            $('#pacientetipoU').val(gato.pacientetipo);
            $('#nombreU').val(gato.nombre);
            $('#edadU').val(gato.edad);
            $('#pesoU').val(gato.peso);
            $('#fechaingresoU').val(gato.fechaingreso);
            $('#fechasalidaU').val(gato.fechasalida);
            $('#modalEditar').modal('show');
        },
        error: function(sasu){
                    console.log("error buscar"+JSON.stringify(sasu));
        }


});
});//cierrar buscar editar

//inicia botono editar
$('#btnEditar').click(function(){
    console.log("boton de editar funciona");

    var idVeterinaria = $('#idVeterinariaU').val();
    var pacientetipo = $('#pacientetipoU').val();
    var nombre = $('#nombreU').val();
    var edad = $('#edadU').val();
    var peso = $('#pesoU').val();
    var fechaingreso = $('#fechaingresoU').val();
    var fechasalida = $('#fechasalidaU').val();
    
    var json = {"idVeterinaria": idVeterinaria, "pacientetipo": pacientetipo, "nombre": nombre, "edad": edad, "peso": peso, "fechaingreso": fechaingreso, "fechasalida": fechasalida}
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7555/api/Veterinaria/editar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto editar"+JSON.stringify(gato));
            $('#modalEditar').modal('hide');
            $('.alert-warning').html("se edito la mascora"+nombre).fadeIn().delay(4000).fadeOut('slow');
            llenadoTable();

    },
    error: function(sasu){
                    console.log("error editar"+JSON.stringify(sasu));
                 }

    });

});//fin del boton editar

//inicia boton eliminar
$('#btnEliminar').click(function(){
    console.log("boton de eliminar funciona");

    var idVeterinaria = $('#idVeterinariaD').val();
    var pacientetipo = $('#pacientetipoD').val();
    var nombre = $('#nombreD').val();
    var edad = $('#edadD').val();
    var peso = $('#pesoD').val();
    var fechaingreso = $('#fechaingresoD').val();
    var fechasalida = $('#fechasalidaD').val();
    
    var json = {"idVeterinaria": idVeterinaria, "pacientetipo": pacientetipo, "nombre": nombre, "edad": edad, "peso": peso, "fechaingreso": fechaingreso, "fechasalida": fechasalida}
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7555/api/Veterinaria/eliminar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto eliminacion"+JSON.stringify(gato));
            $('#modalEliminar').modal('hide');
            $('.alert-danger').html("se elimino la mascora "+nombre).fadeIn().delay(4000).fadeOut('slow');
            llenadoTable();

    },
    error: function(sasu){
                    console.log("error eliminar"+JSON.stringify(sasu));
                 }

    });

});//fin del boton eliminar

//iniciar buscar eliminar la tabla

$('#CuerpoT').on('click', '.btn-danger', function(){
    var idVeterinaria = $(this).attr('data')
    console.log("idVeterinaria: "+idVeterinaria);
    var json = {"idVeterinaria": idVeterinaria};
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:7555/api/Veterinaria/buscar',
        data: JSON.stringify(json),
        contentType: 'application/json; charset= UTF-8',
        success: function(gato){
            console.log("correcto buscar"+JSON.stringify(gato));
            $('#idVeterinariaD').val(gato.idVeterinaria);
            $('#pacientetipoD').val(gato.pacientetipo);
            $('#nombreD').val(gato.nombre);
            $('#edadD').val(gato.edad);
            $('#pesoD').val(gato.peso);
            $('#fechaingresoD').val(gato.fechaingreso);
            $('#fechasalidaD').val(gato.fechasalida);
            $('#modalEliminar').modal('show');
        },
        error: function(sasu){
                    console.log("error eliminar "+JSON.stringify(sasu));
        }


});
});//cierrar buscar editar
function limpiar(){
    $('#idVeterinaria').val('');
    $('#pacientetipo').val('');
    $('#nombre').val('');
    $('#edad').val('');
    $('#peso').val('');
    $('#fechaingreso').val('');
    $('#fechasalida').val('');
}



function buscarTable() {
    $.ajax({
      type: 'ajax',
      method: 'get',
      url: 'http://localhost:7555/api/Veterinaria/listar',
      success: function(gato) {
        console.log("correcto listar" + JSON.stringify(gato));
  
        var cuerpo = '';
        for (var i = 0; i < gato.length; i++) {
          cuerpo += '<tr>' +
            '<td>' + gato[i].idVeterinaria + '</td>' +
            '<td>' + gato[i].pacientetipo + '</td>' +
            '<td>' + gato[i].nombre + '</td>' +
            '<td>' + gato[i].edad + '</td>' +
            '<td>' + gato[i].peso + '</td>' +
            '<td>' + gato[i].fechaingreso + '</td>' +
            '<td>' + gato[i].fechasalida + '</td>' +
            '<td><a class="btn btn-warning" data="' + gato[i].idVeterinaria + '"><i class="fa fa-fw fa-refresh"></i></a></td>' +
            '<td><a class="btn btn-danger" data="' + gato[i].idVeterinaria + '"><i class="fa fa-fw fa-refresh"></i></a></td>' +
            '</tr>';
        }
        $('#CuerpoT').html(cuerpo);
  
        // Asignar el evento de búsqueda al campo de entrada
        $('#table_search_input').on('input', function() {
          searchTable();
        });
  
      }, // cierra success
      error: function(sasu) {
        console.log("error listar" + JSON.stringify(sasu));
      }
    }); // cierra ajax
  }
  
  function searchTable() {
    var searchText = $('#table_search_input').val().toLowerCase();
    $('#CuerpoT tr').each(function() {
      var found = false;
      $(this).each(function() {
        if ($(this).text().toLowerCase().indexOf(searchText) !== -1) {
          found = true;
          return false; // Salir del bucle interno
        }
      });
      $(this).toggle(found);
    });
  }
  