
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const items = document.querySelector('.items');
let milliseconds = 0;
let minute = 0;
let second = 0;
let isJumping = false;
let position = 0;
let score = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }

    }
}

//Função para o Yoshi pular
function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 200) {
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 10;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// Funcão para criar obstaculo aleatoreamente.
function createItem() {
    const item = document.createElement('div');
    let itemPosition = 1000;
    let randomTime = Math.random() * 6000;
    let randomItem = Math.floor(Math.random() * 5);

    switch (randomItem) {
        case 1:
            item.classList.add('goomba');
            break;
        case 2:
            item.classList.add('montain');
            break;
        case 3:
            item.classList.add('bala');
            break;
        case 4:
            item.classList.add('planta');
            break;
        default:
            item.classList.add('goomba');
    }
    //cactus.style.right = 100 + 'px';
    background.appendChild(item);

    let leftInterval = setInterval(() => {

        if (itemPosition < -100) {
            clearInterval(leftInterval);
            background.removeChild(item);
        } else if (itemPosition > 0 && itemPosition < 80 && position < 100) {
            clearInterval(leftInterval);
            window.location.href = "./gameOver.html";
            document.getElementById("scoreFinal").innerText = `Seu score foi ${score}`;

        } else {
            itemPosition -= 10;
            item.style.left = itemPosition + 'px';
            console.log(position);
        }
    }, 20)

    setTimeout(createItem, randomTime);
}

//Função para cruar animação de fundo.
function createNave() {
    const nave = document.createElement('div');

    let randomTime = Math.random() * 5000;

    nave.classList.add('nave_espacial');
    items.appendChild(nave);

    setTimeout(createNave, randomTime);
}

//Iniciar o cronometro.
function startTime() {
    let time = setInterval(() => { timer(); }, 10);
}

//Calcula e mostra o tempo.
function timer() {
    if ((milliseconds += 10) == 1000) {
        milliseconds = 0;
        second ++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }

    document.getElementById("time").innerText = `Time: ${minute}:${second}`;
    scoreCount();
}

//Calcula e mostra o score.
function scoreCount(){
    score = second * 10;
    document.getElementById("score").innerText = `Score: ${score} points.`;
}

startTime();

createNave();

createItem();

//add um event listener para identificar a tecla espaço.
document.addEventListener('keydown', handleKeyUp);