// lista para armazenar os numeros aleatórios, para não se repetirem
let listaDeNumerosSorteados = []
let numeroLimite = 20;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


// MUDAR O TÍTULO E O PARÁGRAFO AO ACONTECEREM AS AÇÕES 
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;    
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2}); 
}

// MENSAGENS INCIAIS DO JOGO
function mensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 20');
}

mensagemInicial();

// VERIFICAR O CHUTE PARA QUANDO O BOTÃO CLICAR FOR SELECIONADO 
function verificarChute(){ 
    let chute = document.querySelector('input').value;
    
    
    // VERIFICANDO SE O CHUTE É IGUAL AO NUMERO SECRETO, SE SIM...MUDAM OS TITULOS E PARAGRAFOS PARA DIZER QUE ACERTOU E OS NUMERO DE TENTATIVAS. 
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        // MUDAR A STRING 'TENTATIVAS'
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        // MUDAR A STRING DE ACORDO COM O NUMERO DE TENTATIVAS QUE O USUARIO FEZ 
        let mensagemTentativas = `Você acertou com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        // REMOVER ATRIBUTO/ELEMENTO QUE DESATIVA O BOTÃO "NOVO JOGO"
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        // SE O NUMERO DOR MENOR QUE O CHUTE, DAR A DICA AO USUARIO
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p',`O número secreto é menor que ${chute}`);
        } else { 
                // SE O NUMERO DOR MAIOR QUE O CHUTE, DAR A DICA AO USUARIO
                exibirTextoNaTela('p',`O número secreto é maior que ${chute}`);
        
        }
        // AUMENTA O NUMERO DE TENTATIVAS CADA VEZ QUE O USUARIO ERRA 
        tentativas++;
        limparCampo();
    }
}

// GERAR UM NÚMERO ALEATÓRIO PARA SER O NUMERO SECRETO
function gerarNumeroAleatorio() {
    let NumeroEscolhido = parseInt( Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // verificando se a lista recebeu o limite máximo de elementos, se sim, irá limpar a lista para não dar nenhum erro e reiniciar a lista
    
    if(quantidadeDeElementosNaLista == numeroLimite ) {
        listaDeNumerosSorteados = [];
    }

    // verificar se tem o elemento na lista (includes), para não se repetir o número anterior.
    if (listaDeNumerosSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        // incluir um número diferente do último sorteado na lista (push).
        listaDeNumerosSorteados.push(NumeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return NumeroEscolhido;
    }
}

// LIMPAR O CHUTE PARA (''), E O USUARIO NÃO TER QUE FICAR LIMPANDO
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

// REINICIA O JOGO 
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    // HABILITA O COMANDO "DISABLED" QUE FAZ O BOTÃO "NOVO JOGO" FICAR CINZA NOVAMENTE, NÃO PODENDO SER CLICADO
    document.getElementById('reiniciar').setAttribute('disabled',true);
}