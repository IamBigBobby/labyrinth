
const data = `{
	"width": 10,
	"height": 10,
	"fields": [
		{"x": 2, "y": 2, "type": "wall"},
		{"x": 3, "y": 2, "type": "wall"},
		{"x": 4, "y": 2, "type": "wall"},
		{"x": 5, "y": 2, "type": "wall"},
		{"x": 6, "y": 2, "type": "wall"},
		{"x": 8, "y": 1, "type": "wall"},
		{"x": 9, "y": 3, "type": "wall"},
		{"x": 10, "y": 3, "type": "wall"},
		{"x": 2, "y": 3, "type": "wall"},
		{"x": 2, "y": 4, "type": "wall"},
		{"x": 2, "y": 5, "type": "wall"},
		{"x": 5, "y": 4, "type": "wall"},
		{"x": 6, "y": 4, "type": "wall"},
		{"x": 7, "y": 4, "type": "wall"},
		{"x": 8, "y": 4, "type": "wall"},
		{"x": 9, "y": 4, "type": "wall"},
		{"x": 5, "y": 5, "type": "wall"},
		{"x": 5, "y": 6, "type": "wall"},
		{"x": 5, "y": 7, "type": "wall"},
		{"x": 2, "y": 7, "type": "wall"},
		{"x": 2, "y": 8, "type": "wall"},
		{"x": 2, "y": 9, "type": "wall"},
		{"x": 3, "y": 9, "type": "wall"},
		{"x": 4, "y": 9, "type": "wall"},
		{"x": 5, "y": 9, "type": "wall"},
		{"x": 9, "y": 6, "type": "wall"},
		{"x": 9, "y": 7, "type": "wall"},
		{"x": 9, "y": 8, "type": "wall"},
		{"x": 9, "y": 9, "type": "wall"},
		{"x": 7, "y": 7, "type": "wall"},
		{"x": 7, "y": 8, "type": "wall"},
		{"x": 7, "y": 9, "type": "wall"},
		{"x": 7, "y": 10, "type": "wall"},
		{"x": 1, "y": 2, "type": "enter"},
		{"x": 9, "y": 5, "type": "exit"}
	]
}`;

const parsedData = JSON.parse(data);

let table = document.querySelector('#table');


for (let i = 0; i < parsedData.width; i++) {
    let tr = document.createElement('tr');
    
    for (let i = 0; i < parsedData.height; i++) {
        let td = document.createElement('td');
        tr.appendChild(td);
    }
    
    table.appendChild(tr);
}

 
let x = 0;
let y = 0;

for (let i = 0; i < parsedData.fields.length; i++){
	if (parsedData.fields[i].type == 'enter'){
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('enter')
		y = parsedData.fields[i].x - 1; 
		x = parsedData.fields[i].y - 1;
	}
	else if(parsedData.fields[i].type == 'exit'){
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('exit')
	}
	else{
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('wall')
	}	
}

function movement (event){
	keyName = event.key;

	if (keyName == "ArrowRight" && checkField(x + 1, y)){
		x++;
	}
	else if(keyName == "ArrowDown" && checkField(x, y + 1)){
		y++;
	}
	else if (keyName == "ArrowLeft" && checkField(x - 1, y)){
		x--;
	}
	else if (keyName == "ArrowUp" && checkField(x, y - 1)){
		y--;
	}

	document.querySelector('.enter').classList.remove('enter');
	table.rows[y].cells[x].classList.add('enter');

	if (checkExit(x, y)){
		gameOver();
	}
}
document.addEventListener('keydown', movement)

function checkField (x, y){
	if (x < 0){
		return false;
	}
	else if (x > parsedData.width - 1){
		return false;
	}
	else if(y < 0){
		return false;
	}
	else if (y > parsedData.height - 1){
		return false;
	}
	else if (table.rows[y].cells[x].classList.contains('wall')){
		return false;
	}
	else{
		return true;
	}
}

function checkExit (x, y){
	if (table.rows[y].cells[x].classList.contains('exit')){
		return true;
	}
	return false;
}

function gameOver(){
	document.removeEventListener('keydown', movement);
}


