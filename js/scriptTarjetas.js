// Variable global de usuarios leidos...
// ---------------------------------------------------------------------------------
var registroTarjetas = [];  // Registro de las tarjetas YO-GI-OH
// ---------------------------------------------------------------------------------


function tarjetaDetalle(i) {
    alert("Detalle de tarjeta " + i);
    strHTML = `<!-- Pontalla Modal -->
          <div class="modal fade" id="modalTarjetaDetalle">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title">Detalle de tarjeta: ${registro[i].name} </h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body">
              <div class="container">
                    <div class="card" style="width:400px">
                        <img class="card-img-top" src="${registro[i].card_images[0].image_url_small}" alt="imagen tarjeta pequeña" style="width:100%">
                        <div class="card-body">
                        <h4 class="card-title">${registro[i].name}</h4>
                        <p class="card-text">type: ${registro[i].type}</p>
                        <p class="card-text">archtype: ${registro[i].archtype}</p>
                        <p class="card-text">race: ${registro[i].race}</p>
                        <p class="card-text">desc: ${registro[i].desc}</p>
                            <!-- <a href="#" class="btn btn-primary">See Profile</a>  -->
                        </div>
                    </div>
                    <!-- <div class="text-primary">(502) 5533 0808</div> -->
              </div>
              
              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
              
            </div>
          </div>
        </div>`;
      
    var Str1 = strHTML;
    document.getElementById("infoContacto").innerHTML = strHTML; 
}
      

/* -------------------------------------------------------------------------------------
 Crea codigo HTML para el listado de las tarjetas, tomando en consideración el Fitro de busqueda que pueda ser aplicado */
function listadoHTMLTarjetas(registro) {
    // Crear dinamicamente el codigo HTML correspondiente a la lista de tarjetas...

    // Dispositivo mobil 1 columna
    // Dispositivo mediano - tablet 3 columnas
    // dispositivo PC - 5 columnas.
    var StrHTML = "<hr>";  // Linea de separación
        
    // listado de tarjetas; cada cancion es una columna...
    for (var i = 0; i < registro.length; i++){
        StrHTML += `<div class="col-12 col-md-4 col-lg-3 p-4 border" onclick="tarjetaDetalle(${i});">
            <div class="row" ><span class="mx-auto text-primary font-weight-bold bg-ligt">name :${registro[i].name}</span></div>
            <div class="row border"><p>type: ${registro[i].type}</p></div>
            <div class="row border"><p>archetype: ${registro[i].archetype}</p></div>
            <div class="row border"><p>race: ${registro[i].race}</p></div>
        </div>`;
    }
    return StrHTML;
}

// -------------------------------------------------------------------------------------
function filtroTarjetas(formulario) {
    var ListaTarjetas = [];
    var cuentaCoincidencias = 0;
    var cuentaComparaciones = 0;

    for (i = 0; i < registroTarjetas.length; i++,cuentaComparaciones++){
        if (registroTarjetas[i].name.toLowerCase().includes(formulario.nombre.value.toLowerCase())||
            registroTarjetas[i].type.toLowerCase().includes(formulario.nombre.value.toLowerCase())||
            registroTarjetas[i].archetype.toLowerCase().includes(formulario.nombre.value.toLowerCase())||
            registroTarjetas[i].race.toLowerCase().includes(formulario.nombre.value.toLowerCase())
            ){
            ListaTarjetas.push(registroTarjetas[i]);
            cuentaCoincidencias++;
        }
    }

    document.getElementById("errorNombre").innerHTML = cuentaCoincidencias;
    document.getElementById("tarjetasDisponibles").innerHTML = listadoHTMLTarjetas(ListaTarjetas);
}

// -------------------------------------------------------------------------- 
// Nombre del archivo que llama este modulo (el que se visualiza en el URL)  
function filename(){
    var rutaAbsoluta = self.location.href;   
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    return rutaRelativa;  
  }
  

// leer el listado de tarjetas del archivo JSON.
$(document).ready(function () {
    //Carga los datos que estan en el archivo JSON usando AJAX
    $.ajax({
/*         url: "http://127.0.0.1:5500/doc/tarjetas.json" */
        url: "./doc/tarjetas.json"
    }).done(function (respuesta) {
        for (var i = 0; i < respuesta.data.length; i++){
            registroTarjetas.push(respuesta.data[i]);  // Registro de tarjetas.
        }
        console.log("Tarjetas: " + registroTarjetas);

        var Str1 = listadoHTMLTarjetas(registroTarjetas);
        document.getElementById("tarjetasDisponibles").innerHTML = Str1;
    
    }).fail(function (jqXHR) {
            console.log('Error de lectura de archivo de tarjetas: ' + jqXHR.statusText);
            alert('Error de lectura de archivo de tarjetas: ' + jqXHR.statusText);
    });
});
