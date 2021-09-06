//declaration variable
const canvas = document.querySelector('#canvas')
const scoreSpan = document.querySelector('.score')
const button = document.querySelector('.replay')
let score = 0

const context = canvas.getContext('2d')

const background = new Image()
background.src = './image/stade.jpg'

const foodImg = new Image()
foodImg.src  = './image/food.png'

const eatAudio = new Audio()
eatAudio.src = './mp3/eat.mp3'

const deadAudio = new Audio()
deadAudio.src = './mp3/dee.mp3'

const unit = 30
//pomme
let food = {
    x:Math.floor(Math.random() *19+1)*unit,
    y:Math.floor(Math.random() *19+1)*unit
}

snake = []
snake[0] = {
    x:10*unit,
    y:10*unit
}

//deplacement avec le clavier
let d
document.addEventListener('keydown', (e)=>{
    if(e.keyCode == 37 && d !="R"){
        d = "L"
    }
    else if(e.keyCode == 38 && d !="D"){
        d = "U"
    }
    else if(e.keyCode == 39 && d !="L"){
        d = "R"
    }
    else if(e.keyCode == 40 && d !="U"){
        d = "D"
    }
    else if(e.keyCode == 32){
    window.location.reload()
    }
})
function collisionBody(head,snake){
    for (let index = 0; index < snake.length; index++) {
        if(head.x == snake[index].x && head.y ==snake[index].y){
            return true
        }
        
    }
    return false
}
//serpent
function draw(){
    context.drawImage(background,0,0)
    for (let index = 0; index < snake.length; index++) {
        if(index === 0){
            context.fillStyle = "black"//tete du serpent
        }
        else{
            context.fillStyle = "red"//corps du serpent
        }
        context.fillRect(snake[index].x,snake[index].y,unit,unit)
        context.strokeStyle = 'yellow'
        context.strokeRect(snake[index].x,snake[index].y,unit,unit)
        
    }

    context.drawImage(foodImg,food.x,food.y)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    

    //mager la pomme
    if(snakeX == food.x && snakeY == food.y){
        food = {
            x:Math.floor(Math.random() *19+1)*unit,
            y:Math.floor(Math.random() *19+1)*unit
        }
        score +=1
        eatAudio.play()
    }
    else{
        snake.pop()
    }


    if(d=="L") snakeX -=unit
    if(d=="U") snakeY -=unit
    if(d=="R") snakeX +=unit
    if(d=="D") snakeY +=unit

    let newHead = {
        x:snakeX,
        y:snakeY
    }
    //les collisions
    if(snakeX<=-unit || snakeX>=canvas.width || snakeY<=-unit || snakeY>=canvas.height ||collisionBody(newHead,snake)){
        deadAudio.play()
        clearInterval(play)
        
    }
    
    snake.unshift(newHead)
    scoreSpan.textContent = score


}

let play = setInterval(draw,100)

function rejouer(){
    window.location.reload();
}
    //Fin du jeux
function perdu() {
    Swal.fire({
        title: 'Oops...',
        text: "Vous avez PERDU!!! votre Score est :" +score,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Voulez-vous Rejouer?'
      }).then((result) => {
        if (result.isConfirmed) {
          rejouer();
        }
      })
  }