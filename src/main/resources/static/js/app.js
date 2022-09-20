const abrirCalculadora = () => {
    const main = document.getElementsByTagName("main").item(0);

    let cuerpo = "<h1>Calculadora</h1>"
    cuerpo += "<form //method='get' action='api/calculator//'>";
    cuerpo += "<div class='row'>";
    cuerpo += "<div class='col'><input name='num1' class='form-control' type='number' placeholder='numero 1' required ></div>";
    cuerpo += "<select name='op' class='col form-control'>";
    cuerpo += "  <option value='-'>Resta</option>";
    cuerpo += "  <option value='*'>multiplicacion</option>";
    cuerpo += "  <option value='/'>division</option>";
    cuerpo += "  <option value='%'>Residuo de division</option>";
    cuerpo += "  <option value='+'>suma</option>";
    cuerpo += "</select>";
    cuerpo += "<div class='col'><input name='num2' type='number' placeholder='numero 2' required class='form-control' ></div>";
    cuerpo += "</div>";
    cuerpo += "<div class='row'>'";
    cuerpo += "<button type='button' class='btn btn-primary col' onclick='realizarOperacion()'>Calcular</button>";
    cuerpo += "<button type='submit' class='btn btn-secundary col' onclick='realizarOperacion()'>Enviar</button>";
    cuerpo += "</div>";
    cuerpo += "<div id='resultado' class='row'></div>'";
    cuerpo += "</form>";
    main.innerHTML = cuerpo;
}

const realizarOperacion = () => {
    const num1 = document.getElementsByName("num1").item(0).value;
    const num2 = document.getElementsByName("num2").item(0).value;
    const op = document.getElementsByName("op").item(0).value;
    const tagResultado = document.getElementById('resultado');

    if (num1 == "") {
        alert("numero 1 no puede estar vacio", "danger");
        return;
    }
    if (num2 == "") {
        alert("numero 2 no puede estar vacio", "danger");
        return;
    }

    ejecutarOperacionRemotoPost(num1, op, num2, tagResultado);


}

//ejecutarOperacionLocal(num1,op,num2,tagResultado);

const alert = (message, type) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        alert('Nice, you triggered this alert message!', 'success')
    })
}

const ejecutarOperacionRemotoGet = (num1, op, num2, tagResultado) => {
    op = op == '+' ? '%2B' : op;
    op = op == '%' ? '%25' : op;
    const url = `api/calculator?num2=${num2}&op=${op}&num1=${num1}`;

    // Sincrona:: un orden de ejecucion descendiente
    fetch(url) //el fetch analiza el contenido y luego lo trae en los then
        .then(response => response.text())
        .then(respuesta => {
            tagResultado.innerHTML = respuesta;
        });

    console.log(123);
}

// Asincrono: async / await
const ejecutarOperacionRemotoPost = async (num1, op, num2, tagResultado) => {
    const url = 'api/calculator';

    const request = { // en javascript es una objeto todo elemento encerrado por {}
        "num1": num1,
        "op": op,
        "num2": num2
    }; //body request, Cuerpo del mensaje

    let response = await fetch(url, { //await es para esperr a una promesa
        method: 'POST', //se manda el metodo post osea desde la consola
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request) //convierte a cadena al json
    });

    if (response.ok) {
        let result = await response.json();
        tagResultado.innerHTML = result.resultado;
    } else {
        alert("HTTP-Error: " + response.status, "danger");
    }
}

const ejecutarOperacionLocal = (num1, op, num2, tagResultado) => {
    console.log(num1, op, num2);
    let resultado = 0;
    switch (op) {
        case '+':
            resultado = parseInt(num1) + parseInt(num2);
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            resultado = num1 / num2;
            break;
        case '%':
            resultado = num1 % num2;
            break;
    }

    tagResultado.innerHTML = resultado;
}


