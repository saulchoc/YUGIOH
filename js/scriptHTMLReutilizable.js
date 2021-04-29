function decirActivo(strMenu,strModulo){
  if (strMenu == strModulo) {
    return "active";
  }
  else {
    return " ";
  }
}

// Codigo para la barra de navegación, que se visualiza en todos las paginas.
// ---------------------------------------------------------------------------
function barra_navegacion(strModulo) {
  var strHTML = `
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="./index.html">
              <img src="./imagenes/yugioh.jfif" alt="Logo YuGiOh"  style="border: 1px solid black; width: 70px; height: 70px">
              <span class="text-primary"> Yu-Gi-Oh </span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#barra"
            aria-controls="barra"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div class="collapse navbar-collapse" id="barra">
            <!-- ul  que alinea a la izquierda dejando margen a la derecha. -->
            <ul class="navbar-nav mr-auto">  
              <li class="nav-item ${decirActivo(strModulo,'index.html')}">
                <a class="nav-link" href="./index.html">Inicio</a>
              </li>
            </ul>

            <!-- ul que se alinea a la derecha, dejando margen a la izquierda -->
            <ul class="navbar-nav ml-auto ">  
              <li class="nav-item ${decirActivo(strModulo,'contacto.html')}">
                <!-- Button to desplegar información de contacto -->
                <a class="btn btn-primary m-1" data-toggle="modal" data-target="#modalDatoContacto" role="button" href="./contacto.html">Contacto</a>
              </li> 
              <li class="nav-item ${decirActivo(strModulo,'inicio_sesion.html')}">
                <a class="btn btn-primary m-1" href="./inicio_sesion.html">Inicio de Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;
      document.getElementById("barra_navegacion").innerHTML = strHTML;       
}

// Codigo para el modal que despliega la información del contacto, visible en todos las paginas.
// ---------------------------------------------------------------------------
function informacionContacto() {
  strHTML = `<!-- Pontalla Modal -->
    <div class="modal fade" id="modalDatoContacto">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Contacto</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
            <p>Saul Francisco Choc Gonzalez</p>
            <p>saul.choc@gmail.com</p>
            <div class="text-primary">(502) 5533 0808</div>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>`;

  document.getElementById("infoContacto").innerHTML = strHTML; 
}


// -------------------------------------------------------------------------- 
// Nombre del archivo que llama este modulo (el que se visualiza en el URL)  
function filename(){
  var rutaAbsoluta = self.location.href;   
  var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
  var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
  return rutaRelativa;  
}


// --------------------------------------------------------------------------  
$(document).ready(function () {
  var nombre_archivo = filename();  // nombre del archivo de URL leido.
  barra_navegacion(nombre_archivo); // adicionar la barra de navegación en la pantalla.
  informacionContacto();            // Modal de datos de contacto para todos los modulos.
});