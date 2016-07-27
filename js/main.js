var can1;
var can2;

var canWidth;
var canHeight;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBoby = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;
var wave;

var halo;

var dust;
var dustPic = [];

document.body.onload=game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	//获取canvas
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext('2d');

	can1.addEventListener("mousemove",onMouseMove,false);

	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom = new momObj();
	mom.init();
	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	for(var i =0; i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i + ".png";
	}
	for(var j = 0; j < 2; j++){
		babyEye[j] = new Image();
		babyEye[j].src = "./src/babyEye" + j +".png";
	}
	for(var k = 0; k < 20; k++){
		babyBoby[k] = new Image();
		babyBoby[k].src = "./src/babyFade" + k + ".png";
	}

	for(var i =0; i < 8; i++){
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail" + i + ".png";
	}
	for(var j = 0; j < 2; j++){
		momEye[j] = new Image();
		momEye[j].src = "./src/bigEye" + j +".png";
	}

	data = new dataObj();

	for(var k = 0; k < 8; k++){
		momBodyOrange[k] = new Image();
		momBodyBlue[k] = new Image();
		momBodyOrange[k].src = "./src/bigSwim" + k + ".png";
		momBodyBlue[k].src = "./src/bigSwimBlue" + k + ".png";  
	}

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i = 0; i < 7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}
	dust = new dustObj();
	dust.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40){
		deltaTime = 40;
	}

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){
		mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	}
	}
}