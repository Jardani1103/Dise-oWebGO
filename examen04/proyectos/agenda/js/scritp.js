function guardarDato() {
    var nombre = document.getElementById("nombre").value;
    var movil = document.getElementById("movil").value;
    var email = document.getElementById("email").value;
    var direccion = document.getElementById("direccion").value;
    var ciudad = document.getElementById("ciudad").value;
    var departamento = document.getElementById("departamento").value;

    const datos = {
        'movil': movil,
        'email': email,
        'direccion': direccion,
        'ciudad': ciudad,
        'departamento': departamento,
    };

    localStorage.setItem(nombre, JSON.stringify(datos));

    document.getElementById("nombre").value = "";
    document.getElementById("movil").value = "";
    document.getElementById("email").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("departamento").value = "";
    actualizarDatos();
}


function recuperarDato() {
    var nombre = document.getElementById("nombre").value;

    let datos = localStorage.getItem(nombre);
    datos = JSON.parse(datos);

    document.getElementById("movil").value = datos.movil;
    document.getElementById("email").value = datos.email;
    document.getElementById("direccion").value = datos.direccion;
    document.getElementById("ciudad").value = datos.ciudad;
    document.getElementById("departamento").value = datos.departamento;
}

function eliminarDato() {
    var nombre = document.getElementById("nombre").value;
    localStorage.removeItem(nombre);
    actualizarDatos();
}

function eliminarTodo() {
    localStorage.clear();
    actualizarDatos();
}

function actualizarDatos() {
    var registro = "";
    if (localStorage.length === 0) {
        registro += '<li>Vacío</li>';
    } else {
        for (var i = 0; i <= localStorage.length - 1; i++) {
            var key = localStorage.key(i);
            let datos = localStorage.getItem(key);
            datos = JSON.parse(datos);

            registro += `<li> 
            <span class="nom"> ${key} </span>
            <span class="nom"> ${datos.movil}</span>
            <span class="nom datosEmail"> ${datos.email}</span>
            <span class="nom datosDireccion"> ${datos.direccion}</span>
            <span class="nom datosCiudad"> ${datos.ciudad}</span>
            <span class="nom datosDepartamento"> ${datos.departamento}</span>
            </li><br>`;
        }
    }
    document.getElementById('contactos').innerHTML = registro;
}