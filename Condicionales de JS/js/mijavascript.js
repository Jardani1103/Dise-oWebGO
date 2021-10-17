function eleccion(){

var nota=20;
var mensaje;

switch(nota){

case 10:
    mensaje="mal";
    break;

case 13:
    mensaje="regular";
    break;    

case 17:
    mensaje="bien";
    break;

case 20:
    mensaje="excelente";
    break;

default:
    mensaje="valor inválido";    
}

alert(mensaje);

}


function ternario(){

var boolean=false, edad=25;

edad>18 ? (

    alert ("Puedes Continuar")
) :  (

    boolean=true,
    alert("Disculpa, eres menor de edad ")
)

}

function parImpar(numero) {
 

    if(numero % 2 == 0) {
      alert ("par");
    }
    else {
      alert ("impar");
    }
  }
  

    
   



