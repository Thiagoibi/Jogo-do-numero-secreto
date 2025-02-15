/* let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um Número entre 1 e 10'; */
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
exibirMensagemInicial();
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto' );
    exibirTextoNaTela('p', `Escolha um Número entre 1 e ${numeroLimite}`);
}



function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute== numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavrasTentativas = tentativas == 1 ?'tentativa' : 'tentativas';
        let mensagemsTentativas =  `Você descobriu o numero secreto com ${tentativas} ${palavrasTentativas}!`;
        exibirTextoNaTela('p', mensagemsTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        exibirTextoNaTela('h1', 'Errou!')
        if( chute>numeroSecreto){
            exibirTextoNaTela('p', 'O numero secreto e menor!');
        }else{
            exibirTextoNaTela('p', 'O numero secreto e maior!');
        }
        tentativas ++;
        limparCampo();
    
}
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*numeroLimite +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
    
}

function reiniciarJogo () {
    numeroSecreto =gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}
