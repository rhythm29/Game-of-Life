const HEIGHT = 600;
const WIDTH = 400;
var liveCell = {};
var doAlive = {};
var doDead = {};
var c_canvas = document.getElementById("c");
var context = c_canvas.getContext("2d");

for (var x = 0; x < WIDTH; x += 10) {
  context.moveTo(x, 0);
  context.lineTo(x, HEIGHT);
}

for (var y = 0; y < HEIGHT; y += 10) {
  context.moveTo(0, y);
  context.lineTo(WIDTH, y);
}

context.strokeStyle = "#ddd";
context.stroke();

var startbutton = document.createElement("BUTTON");
startbutton.id = "start-button";
startbutton.innerHTML = "Start";
startbutton.addEventListener("click", init);
document.body.appendChild(startbutton);

var stopbutton = document.createElement("BUTTON");
stopbutton.id = "stop-button";
stopbutton.innerHTML = "Stop";
document.body.appendChild(stopbutton);

var resetbutton = document.createElement("BUTTON");
resetbutton.id = "reset-button";
resetbutton.innerHTML = "Reset";
resetbutton.addEventListener("click", end);
document.body.appendChild(resetbutton);

var stepbutton = document.createElement("BUTTON");
stepbutton.id = "step-button";
stepbutton.innerHTML = "STEP";
stepbutton.addEventListener("click", step);
document.body.appendChild(stepbutton);

function fillCell(x, y){
context.beginPath();
context.fillStyle="green";
context.fillRect(x,y,10,10); 
context.closePath();
var key = x + '_' + y;
liveCell[key] = true;
}

function init(){
	for(var i = 0; i<(HEIGHT)/5; i++){
	var x = Math.random()*WIDTH;
    x = x - x%10;
	var y = Math.random()*HEIGHT;
	y = y - y%10;
    fillCell(x, y);
    }
}

function line(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.strokeStyle = "#ddd";
    context.stroke();
}

function clearCell(x, y){
	context.beginPath();
	context.clearRect(x, y, 10, 10);
	context.closePath();
	line(x, y, x+10, y);
	line(x+10, y, x+10, y+10);
	line(x+10, y+10, x, y+10);
	line(x, y+10, x, y);
	delete liveCell[x + '_' + y];

}

function end(){
	for(var i = 0; i <WIDTH; i+=10){
		for(var j= 0; j<HEIGHT; j+=10){
			clearCell(i,j);
		}
	}
}

function isAlive(x, y){
	var count = 0;
	
	if (x + '_' + (y-10) in liveCell){
		count+=1;
	}
	if ((x+10) + '_' + (y) in liveCell){
		count+=1;
	}
	if ((x-10) + '_' + y in liveCell){
		count+=1;
	}
	if ((x-10) + '_' + (y+10) in liveCell){
		count+=1;
	}
	if ((x+10) + '_' + (y-10) in liveCell){
		count+=1;
	}
	if (x+10 + '_' + (y+10) in liveCell){
		count+=1;
	}
	if ((x-10) + '_' + (y-10) in liveCell){
		count+=1;
	}
	if (x + '_' + (y+10) in liveCell){
		count+=1;
	}
	
	if(count <2){
		return false;
	}
	if(count == 3){
		return true;
	}
    if(count==2 || count ==3){
    	return true;
    }
    if(count > 3){
    	return false;
    }
}

function changeGeneration(){
	for (key in doAlive){
		var coord = key.split('_');
		fillCell(coord[0],coord[1]);
	}
	for (key in doDead){
		var coord = key.split('_');
		clearCell(coord[0],coord[1]);
	}

}
function step(){
	//predict future
	for(var i = 0; i <WIDTH; i+=10){
		for(var j= 0; j<HEIGHT; j+=10){
			if (isAlive(i,j)){
				doAlive[i+"_"+j] = true;
			}
			else{
				doDead[i+"_"+j] = true;
			}
    	}
 	}
 	changeGeneration();
}
