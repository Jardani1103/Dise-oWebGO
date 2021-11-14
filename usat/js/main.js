function agregar_producto(pos) {

    let productos = [];

    let nombre1 = document.getElementById(`agregar_nombre1_${pos}`).innerHTML.trim();
    let nombre2 = document.getElementById(`agregar_nombre2_${pos}`).innerHTML.trim();
    let costo = document.getElementById(`agregar_costo_${pos}`).value;

    let index = Object.entries(sessionStorage).length;

    productos[index] = {};
    productos[index].nombre1 = nombre1;
    productos[index].nombre2 = nombre2;
    productos[index].costo = costo;

    console.log(productos[productos.length - 1]);

    sessionStorage.setItem(index, JSON.stringify(productos[productos.length - 1]));
}

$(function () {

    let productos = [];

    $.each(Object.entries(sessionStorage), function (index, row) {
        let json_row = JSON.parse(row[1]);
        productos[index] = {};
        productos[index].nombre1 = json_row.nombre1;
        productos[index].nombre2 = json_row.nombre2;
        productos[index].costo = json_row.costo;
        productos[index].cantidad = (json_row.cantidad == undefined) ? '0' : json_row.cantidad;
        productos[index].costo_total = (json_row.costo_total == undefined) ? '0' : json_row.costo_total;
    });

    console.log(productos);

    $.each(productos, function (key, value) {
        $('#table_carrito').append('<tr> <td>' + value.nombre1 + '</br>' + value.nombre2 + '</td>  <td>' + value.costo + '</td> <td class="contentEditable">' + value.cantidad + '</td> <td>' + value.costo_total + '</td></tr>');
    });

    $("#contador-productos").text(productos.length);

    console.log($("#table_carrito tr").length);
    if ($("#table_carrito tr").length > 0) {
        $("#actualizar").removeClass("d-none").addClass("d-block");
        $("#actualizar").removeClass("d-none").addClass("d-block");
        $("#aceptar").addClass("d-none");
    } else {
        $("#actualizar").addClass("d-none");
        $("#aceptar").addClass("d-none");
        $("#proceder").addClass("d-none");
    }

});

function calcular_total() {
    $("#actualizar").removeClass("d-none").addClass("d-block");
    $("#aceptar").removeClass("d-block").addClass("d-none");

    var productos = [];
    var rows = $("#table_carrito tr");
    var trLength = $("#table_carrito tr").length;
    var validar_tabla = $('#table_carrito tr:last').find("td:eq(0)").text();
    sessionStorage.clear();

    $.each(rows, function (index, row) {

        if(validar_tabla == ''){
            if (index === (trLength - 1)){
                return
             }
        }

        var columns = $(row).find("td");
        var nombre = columns[0].innerHTML.trim().split("<br>");
        productos[index] = {};
        productos[index].nombre1 = nombre[0].trim();
        productos[index].nombre2 = nombre[1].trim();
        productos[index].costo = columns[1].innerHTML.trim();
        productos[index].cantidad = columns[2].innerHTML.trim();
        productos[index].costo_total = columns[3].innerHTML.trim();
        sessionStorage.setItem(index, JSON.stringify(productos[index]));
    });

    let total = 0;
    $("#table_carrito tr").each(function (index) {
        if(validar_tabla == ''){
            if (index === (trLength - 1)){
                return
             }
        }
        let self = $(this);
        let costo = self.find("td:eq(3)").text().trim();
        total += parseFloat(costo);
    });

    if(validar_tabla == ''){
        $('#table_carrito tr:last').replaceWith('<tr><td colspan="2"></td><td class="fw-bold">TOTAL</td><td class="fw-bold">0</td></tr>');
        $('#table_carrito tr:last').find("td:eq(2)").text(total.toString());
        console.log('Final');
    }else{
        $('#table_carrito tr:last').after('<tr><td colspan="2"></td><td class="fw-bold">TOTAL</td><td class="fw-bold">0</td></tr>');
        $('#table_carrito tr:last').find("td:eq(2)").text(total.toString());
        console.log('Sin final');
    }

    $(this).find("td:eq(2)").attr("contentEditable", "false");

}

function actualizar_cantidad() {
    $("#actualizar").removeClass("d-block").addClass("d-none");
    $("#aceptar").removeClass("d-none").addClass("d-block");

    $("#table_carrito tr").find("td:eq(2)").attr("contentEditable", "true");

    $("#table_carrito tr").on('click', function () {

        $(this).find("td:eq(2)").on('keypress', function (e) {
            const ENTER_KEY_CODE = 13;
            const ENTER_KEY = "Enter";

            if (e.code == ENTER_KEY_CODE || e.key == ENTER_KEY) {
                $(this).attr("contentEditable", "false");
                let cantidad = $(this).text();
                let precio = $(this).parent().find("td:eq(1)").text();
                let total = parseFloat(cantidad) * parseFloat(precio);
                $(this).parent().find("td:eq(3)").html(total.toString());
            }
        });

    });
}

function nueva_compra() {
    sessionStorage.clear();
    window.location.href = '../index.html';
}

function proceder_compra() {

    var validar = false;

    $("#table_carrito tr").each(function () {
        let self = $(this);
        let cantidad = self.find("td:eq(2)").text().trim();
        if (parseInt(cantidad) == 0) {
            validar = true;
        }
    });

    if (validar == false) {
        window.location.href = './orden-compra.html';
    } else {
        alert('Falta llenar la cantidad en un registro!');
    }


}

function agregar_total_compra() {
    var total_compra = 0;
    $("#table_carrito tr").each(function () {
        let self = $(this);
        let cantidad = self.find("td:eq(3)").text().trim();
        total_compra += parseFloat(cantidad);
    });
    $("#pago_total").text(total_compra);
}

function enviarPago() {
    sessionStorage.clear();
    alert('Se realizó el pago exitosamente!');
    window.location.href = '../index.html';
}