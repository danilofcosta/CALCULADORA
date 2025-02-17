document.addEventListener("DOMContentLoaded", function () {
    const botoes = [
        "CE", "C", "<-", "÷",
        "7", "8", "9", "x",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "+|-", "0", ",", "="
    ];

    const container = document.getElementById("botoes");
    const display = document.getElementById("display");
    let expressao = "";

    // Gera os botões dinamicamente
    botoes.forEach((texto) => {
        const botao = document.createElement("button");
        botao.textContent = texto;
        botao.classList.add("botao");

        botao.addEventListener("click", () => processarEntrada(texto));

        container.appendChild(botao);
    });

    // Captura eventos do teclado
    document.addEventListener("keydown", function (event) {
        let tecla = event.key;

        const mapaTeclas = {
            "Enter": "=",
            "Backspace": "<-",
            "Delete": "C",
            "Escape": "CE",
            "*": "x",
            "/": "÷",
            "-": "-",
            "+": "+",
            ",": ","
        };

        // Converte teclas especiais para os botões correspondentes
        if (mapaTeclas[tecla]) {
            tecla = mapaTeclas[tecla];
        }

        // Se for um número ou um botão válido, processa a entrada
        if (!isNaN(tecla) || botoes.includes(tecla)) {
            processarEntrada(tecla);
        }
    });

    function processarEntrada(texto) {
        if (texto === "=") {
            eel.calcular(expressao)((res) => display.textContent = res);
            expressao = '';
        } else if (texto === "C" || texto === "CE") {
            expressao = "";
            display.textContent = "0";
        } else if (texto === "+|-") {
            expressao = expressao.charAt(0) === "-" ? expressao.slice(1) : `-${expressao}`;
            display.textContent = expressao;
        } else if (texto === "<-") {
            expressao = expressao.slice(0, -1);
            display.textContent = expressao;
        } else {
            expressao += texto.replace("x", "*").replace("÷", "/");
            display.textContent = expressao;
        }
    }

    // Pega o nome do usuário do sistema e exibe no título
    const titulo = document.getElementById("titulo");
    eel.opa()(res => { titulo.textContent = res; });

    eel.fundo()(res => {
        document.querySelector("#fundo img").src = res;
    });
    

});
