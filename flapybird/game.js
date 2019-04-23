var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

var gap = 90 ;

//при нажатии на клавишу
document.addEventListener("keydown", moveUp);

function moveUp (){
	yPos -= 25;
}

//создание блоков
var pipe = [];

pipe [0] = {
	x : cvs.width,
	y : 0 
}

//позиция птички
var xPos = 10;
var yPos = 150;
var graw = 1.5;
var score = 0;

function draw () {
	ctx.drawImage(bg,0,0);

	for(var i = 0 ; i < pipe.length ; i++){

		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		if(pipe[i].x == 128){
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height 
			})
		}

		if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + 
			pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
			 || yPos + bird.height >= cvs.height - fg.height)
		{

			location.reload();
		}
		if(pipe[i].x == 5){
			score++;
		}

		pipe[i].x--;

	}

	
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += graw ;



	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Счет :" + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}



pipeBottom.onload = draw;