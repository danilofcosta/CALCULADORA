import eel,os,json,random

eel.init("web")

@eel.expose
def calcular(expressao):
    """Calcula a expressão matemática e retorna o resultado."""
    try:
        resultado = eval(expressao)
        return str(resultado)
    except Exception as e:
        return "Erro"
@eel.expose
def opa():    
    return os.getlogin() 

@eel.expose
def fundo():  
    with open(  "lista.json", "r", encoding="utf-8") as f:
        try:
            lista = json.load(f)
            return random.choice(lista)
        except json.JSONDecodeError:
            lista = []
    if len(lista) == 0:
        return 'NOT IMG'

    
    

# Abre a interface web
eel.start(
    "index.html",
    mode="chrome",    size=(400, 590),  
    cmdline_args=["--window-size=350,500", "--disable-resize"]
)

