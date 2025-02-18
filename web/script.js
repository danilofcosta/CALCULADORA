document.addEventListener("DOMContentLoaded", function () {
    const botoes = [
        "CE", "C", "<-", "÷",
        "7", "8", "9", "x",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "+/-", "0", ",", "="
    ];

    const container = document.getElementById("botoes");
    const display = document.getElementById("display");
    let expressao = "";

    botoes.forEach((texto) => {
        const botao = document.createElement("button");
        botao.textContent = texto;
        botao.classList.add("botao");

        botao.addEventListener("click", () => processarEntrada(texto));

        container.appendChild(botao);
    });

    document.addEventListener("keydown", function (event) {
        let tecla = event.key;

        const mapaTeclas = {
            "Enter": "=",
            "Backspace": "<-",
            "Delete": "C",
            "Escape": "CE",
            "*": "*",
            "/": "÷",
            "-": "-",
            "+": "+",
            ",": ","
        };

        if (mapaTeclas[tecla]) {
            console.log(tecla)
            tecla = mapaTeclas[tecla];
        }

        if (!isNaN(tecla) || botoes.includes(tecla)) {
            processarEntrada(tecla);
        }
    });

    function processarEntrada(texto) {
        if (texto === "=") {
            expressao = expressao.replace(/X/g, "x");

            eel.calcular(expressao)((res) => {
                if (res === "Erro") {
                    expressao = "";
                    display.textContent = "Erro";
                } else {
                    display.textContent = res;
                    expressao = res;
                }
            });
        } else if (texto === "C" || texto === "CE") {
            expressao = "";
            display.textContent = "0";
        } else if (texto === "+/-") {
            expressao = expressao.charAt(0) === "-" ? expressao.slice(1) : `-${expressao}`;
            display.textContent = expressao;
        } else if (texto === "<-") {
            expressao = expressao.slice(0, -1);
            display.textContent = expressao || "0";
        } else {
            const operadores = ['÷', 'X', '+', ',', '-'];
            const isTextoOperador = operadores.includes(texto);

            if (expressao === "" && isTextoOperador && texto !== "-") {
                return;
            }

            if (checkIsoperador(expressao, texto)) {
                ;
            } else {
                expressao += texto.replace('x', '*').replace('÷','/');
                display.textContent = expressao.replace('*', 'x').replace('/', '÷');
            }
        }
    }

    const titulo = document.getElementById("titulo");
    eel.opa()(res => { titulo.textContent = res; });

    eel.fundo()(res => {
        document.querySelector("#fundo img").src = res;
    });
});

function checkIsoperador(str, texto) {
    const ultimoCaractereStr = str.charAt(str.length - 1);
    const operadores = ['*', '/', 'x',"÷",'+', ',', '-'];
    const isUltimoCaractereOperador = operadores.includes(ultimoCaractereStr);
    const isTextoOperador = operadores.includes(texto);
    return isUltimoCaractereOperador && isTextoOperador;
}