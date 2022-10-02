
   'use strict' 




var palabras = [
   "ALURA",
    "NIÑO",
    "AFINIDAD",
    "PROGRAMAR",
    "ORACLE",
    "YOUTUBE"
]

var header = document.getElementById("content-button0"); 
var save = document.getElementById("save");
var main = document.getElementById("div");
var partida = document.querySelector(".content-main");  
var cancelar = document.getElementById("cant");
var agregarPalabra = document.getElementById("newWord")
var comenzar = document.getElementById("newGame");
var boton = document.querySelector(".btn-blanco");

comenzar.addEventListener("click", ()=>{
    header.setAttribute("hidden",true);
    partida.removeAttribute("hidden");

})

cancelar.addEventListener("click",()=>{
    main.setAttribute("hidden",true);
    header.removeAttribute("hidden");

})

agregarPalabra.addEventListener("click",()=>{
     header.setAttribute("hidden",true);
     main.removeAttribute("hidden",false);
})


save.addEventListener("click",()=>{
    var inputWord = document.getElementById("input").value.toUpperCase();
    if(inputWord.length <= 8){
        palabras.push(inputWord);
    }
    partida.removeAttribute("hidden");
    main.setAttribute("hidden",true);
})

boton.addEventListener("click",()=>{
    partida.setAttribute("hidden",true);
    header.removeAttribute("hidden");
})


var juego = null
var finalizado = false

var $html = {
       hombre: document.getElementById("hombre"),
       adivinado: document.querySelector(".adivinado"),
       errado: document.querySelector(".errado")
    };

    function dibujar(juego){
        var $elem
        $elem = $html.hombre;
        var estado = juego.estado;
        if(estado == 8){
            estado = juego.previo
        }
        $elem.src = "./img/estado/" + estado + ".png" ;

        var palabra = juego.palabra;
        var adivinado = juego.adivinado;
        $elem = $html.adivinado;
        $elem.innerHTML = ""
        
        for(let letra of palabra){
            let $span = document.createElement('span');
            let $txt = document.createTextNode('');
            if (adivinado.has(letra)){
                $txt.nodeValue= letra
            };
            $span.appendChild($txt);
            $elem.appendChild($span);
        };
        
        var errado = juego.errado;
        $elem = $html.errado;
        $elem.innerHTML = ""
        for(let letra of errado){
            let $span = document.createElement("span");
            let $txt = document.createTextNode(letra);
            $span.appendChild($txt);
            $elem.appendChild($span);
        };
    };

    function adivinar(juego,letra){
        var estado = juego.estado;
       
        if (estado == 6  || estado == 8){
            return
        };
        var adivinado = juego.adivinado;
        var errado = juego.errado;

        if(adivinado.has(letra) || errado.has(letra)){
            return
        };
        var palabra= juego.palabra
        var letras = juego.letras

        if (letras.has(letra)){
            adivinado.add(letra)
            juego.restante--;
            if (juego.restante == 0){
                    juego.previo = juego.estado;
                    juego.estado = 8;
                };
            }
         else{
            juego.estado++
            errado.add(letra)
        };
    };    

window.onkeypress = function adivinarLetra(e){
    var letra = e.key
    letra = letra.toUpperCase();
    if(/[^A-ZÑ]/.test(letra)){
        return
    };
    adivinar(juego, letra);
    var estado = juego.estado;
    if(estado == 8 && !finalizado){
        setTimeout(alertaGanado, 100)
        finalizado = true
    }else if(estado == 6 && !finalizado){
        let palabra =  juego.palabra;
        let fn = alertaPerdido.bind(undefined,palabra);
        setTimeout(fn, 100);
        finalizado = true
    };
    dibujar(juego)
};


window.nuevoJuego = function nuevoJuego(){
    var palabra = palabraAleatoria();
    juego = {};
    juego.palabra = palabra;
    juego.estado = 0;
    juego.adivinado = new Set();
    juego.errado = new Set();
    finalizado = false;

    var letras = new Set()
    for(let letra of palabra){
        letras.add(letra)
    }
    juego.letras = letras
    juego.restante = letras.size

    dibujar(juego);
    console.log(juego);

};

function palabraAleatoria(){
    var index = ~~(Math.random() * palabras.length);
    return palabras[index]
};

function alertaGanado(msg){
    alert('Felicidades, ganaste!');
};

function alertaPerdido(palabra){
    alert("lo siento, perdiste ... la palabra era: " + juego.palabra);
};


nuevoJuego()


