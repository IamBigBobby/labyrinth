
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
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('enter');
		y = parsedData.fields[i].x - 1; 
		x = parsedData.fields[i].y - 1;
	}
	else if(parsedData.fields[i].type == 'exit'){
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('exit');
	}
	else {
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('wall');
	}
}



function movement (event){
	let prisoner = document.querySelector('.enter')
	let keyName = event.key;

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

	prisoner.classList.remove('enter');
	table.rows[y].cells[x].classList.add('enter');

	if (checkExit(x, y)){
		gameEnd();
		activateGameOverField();
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

function gameEnd(){
	document.removeEventListener('keydown', movement);
}



let refresh = document.querySelector(".refresh_game")

function refreshGame(){
	window.location.reload()
}

refresh.addEventListener('click', refreshGame)


function activateGameOverField(){
	let gameOverField = document.querySelector('.game_over_none');
	gameOverField.classList.remove('game_over_none');
	gameOverField.classList.add('game_over_active');
}

// drag and drop

const dragAndDrop = () => {
	const prisoner = document.querySelector('.enter');
	prisoner.setAttribute('draggable', 'true');
	const cell = document.querySelector('#table').querySelectorAll('td')

	function dragStart(){
		this.classList.add('hide');
		this.classList.remove('enter')
	};
	function dragEnd() {
		this.classList.remove('hide');
	}
	function dragOver (event){
		event.preventDefault();
	}
	function dragEnter() {
		this.classList.add('hovered');
	}
	function dragLeave() {
		this.classList.remove('hovered');
	}
	function dragDrop() {
		this.classList.add('enter');
		this.classList.remove('hovered');
	}

	cell.forEach((cell) => {
		cell.addEventListener('dragover', dragOver);
		cell.addEventListener('dragenter', dragEnter);
		cell.addEventListener('dragleave', dragLeave);
		cell.addEventListener('drop', dragDrop);
	})

	prisoner.addEventListener('dragstart', dragStart);
	prisoner.addEventListener('dragend', dragEnd);
}
dragAndDrop();