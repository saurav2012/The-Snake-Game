//Snake - Game
//Game Loop - Init, Draw, Update,

let score = document.getElementById("score");
function init() 
{
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    food = getRandomFood();
    score.textContent = 0;
    game_over = false;
    snake = {
        init_length : 1,
        color : "rgb(42,245,42)",
        cells : [],
        direction : "right",

        createSnake : function (){
            for(var i = this.init_length-1; i>=0; i--)
            {
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake : function () {
            for(var i=0; i<this.cells.length; i++)
            {
                pen.strokeStyle = "black";
                pen.lineWidth = 2;
                pen.fillStyle = "yellow";
                pen.strokeRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);
                pen.fillRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);
                if(i!=0)
                {
                    pen.fillStyle = this.color;
                    pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
                    pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
                }
            }
        },
        updateSnake : function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(headX == food.x && headY==food.y)
            {
                food = getRandomFood();
                score.textContent++;
            }
            else
            {
                //Pop last cell if food not eaten
                this.cells.pop();
            }

            if(this.direction == "right")
            {
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left")
            {
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down")
            {
                nextX = headX;
                nextY = headY+1;
            }
            else
            {
                nextX = headX;
                nextY = headY-1;
            }
            //Insert the new cell at head/front
            this.cells.unshift({ x: nextX, y: nextY });

            //Find out the last coordinate (boundaries)
            var last_x = Math.round(W/10);
            var last_y = Math.round(H/10);

            if (this.cells[0].y < -1 || this.cells[0].x < -1 || this.cells[0].x > last_x || this.cells[0].y > last_y)
            {
                game_over = true;
            }

            
        }
    };
    snake.createSnake();

    //Add eventListeners 
    function KeyPressed(e)
    {
        if(e.key == "ArrowRight")
        {
            snake.direction="right";
        } 
        else if (e.key == "ArrowLeft") 
        {
            snake.direction = "left";
        } 
        else if (e.key == "ArrowDown") 
        {
            snake.direction = "down";
        }
        else
        {
            snake.direction = "up";
        }
    }
    document.addEventListener('keydown',KeyPressed);
}

function draw() 
{
    //to clear entire screen
    console.log("draw");
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
}

function update()
{
    snake.updateSnake();
}

/*function isTouchitself()
{
    for (var i = 1; i < snake.cells.length; i++) {
        if ((snake.cells[0].x == snake.cells[i].x) && (snake.cells[0].y == snake.cells[i].y))
        {
            return true;
        }
        else 
        return false;
    }
}*/

function gameLoop() {
    draw();
    update();
    if(game_over == true)
    {
        clearInterval(f);
        pen.fillStyle = "red";
        pen.font = "20px bold";
        pen.fillText("GAME OVER!", 85, 70); //game over on screen
        canvas.style.zIndex = -100;
    }
    
}

function getRandomFood()
{
    var foodX = Math.round(Math.random()*(W - 10)/10);
    var foodY = Math.round(Math.random() * (H - 10) / 10);

    foodColors = ["red","crimson","pink","royalblue","white","gray","coral","purple","orangered"];
    var i = Math.round(Math.random()*foodColors.length);
     
    var food = {
        x : foodX,
        y : foodY,
        color : foodColors[i],
    };
    return food;

}

init();

var f = setInterval(gameLoop,100);

