
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
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].setAttribute('draggable', 'true');
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


function gameModeSelection(){
	let keybordMoving = document.querySelector('.keyboard_moving');
	let dragAndDropPlayer = document.querySelector('.drag_and_drop_player');
	let dragAndDropWall = document.querySelector('.drag_and_drop_wall');
	let buttonEndGame = document.querySelector('.game_over_selection_none');
	let modeSelestionField = document.querySelector('.mode_selection')

	keybordMoving.addEventListener('click', function(){

		buttonEndGame.classList.remove('game_over_selection_none');
		buttonEndGame.classList.add('game_over_selection');

		modeSelestionField.classList.remove('mode_selection');
		modeSelestionField.classList.add('mode_selection_none');

		document.addEventListener('keydown', activateKeyMovement);

		buttonEndGame.addEventListener('click', refreshGame);
	})

	dragAndDropPlayer.addEventListener('click', function(){
		buttonEndGame.classList.remove('game_over_selection_none');
		buttonEndGame.classList.add('game_over_selection');

		modeSelestionField.classList.remove('mode_selection');
		modeSelestionField.classList.add('mode_selection_none');

		table.addEventListener('dragenter', activateDragenterPlayer);
		table.addEventListener('dragover', activateDragOverPlayer);
		table.addEventListener('dragleave', activateDragLeavePlayer);
		table.addEventListener('drop', activateDragAndDropPlayer);

		buttonEndGame.addEventListener('click', refreshGame);
	})

	dragAndDropWall.addEventListener('click', function(){
		buttonEndGame.classList.remove('game_over_selection_none');
		buttonEndGame.classList.add('game_over_selection');

		modeSelestionField.classList.remove('mode_selection');
		modeSelestionField.classList.add('mode_selection_none');

		activateDraggableWall();
		table.addEventListener('dragstart', activateDragstartWall);
		table.addEventListener('dragenter', activateDragenterWall);
		table.addEventListener('dragover', activateDragoverWall);
		table.addEventListener('dragleave', activateDragleaveWall);
		table.addEventListener('drop', activateDropWall);

		buttonEndGame.addEventListener('click', refreshGame);
	})
}
gameModeSelection();



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
	document.removeEventListener('keydown', activateKeyMovement);
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






// keyboard moving
function activateKeyMovement (event){
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
		gameEnd();
		activateGameOverField();
	}
}



// drag and drop player
function activateDragenterPlayer(event){
	if (!event.target.classList.contains('wall')){
		event.target.classList.add('available');
	}
}

function activateDragOverPlayer(event){
	event.preventDefault();
}

function activateDragLeavePlayer(event){
	if (!event.target.classList.contains('wall')){
		event.target.classList.remove('available');
	}
}

function activateDragAndDropPlayer(event){
	if (!event.target.classList.contains('wall')){
		document.querySelector('.enter').removeAttribute('draggable');
		document.querySelector('.enter').classList.remove('enter');
		event.target.classList.add('enter');
		event.target.setAttribute('draggable', 'true');
		event.target.classList.remove('available');
		if(event.target.classList.contains('exit')){
			gameEnd();
			activateGameOverField();
		}
	}
}

function checkAvailableFields(x, y){
	
	for (i = x + 1;; i++){
		if (checkField(i, y)){
			table.rows[y].cells[i].classList.add('available');
		}
		else{
			break;
		}
		console.log(checkField(i, y))
	}
	for (i = x - 1;; i--){
		if (checkField(i, y) == true){
			table.rows[y].cells[i].classList.add('available');
		}
		else{
			break;
		}
	}
	for (i = y + 1;; i++){
		if (checkField(x, i) && !table.rows[i].cells[x].classList.contains('exit')){
			table.rows[i].cells[x].classList.add('available');
		}
		else {
			break;
		}
	}
	for (i = y - 1;; i--){
		if (checkField(x, i)){
			table.rows[i].cells[x].classList.add('available');
		}
		else {
			break;
		}
	}
}
checkAvailableFields(x, y)





// drag and drop wall
function activateDraggableWall(){
	for (let i = 0; i < parsedData.fields.length; i++){
		if (parsedData.fields[i].type == 'wall'){
			table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].setAttribute('draggable', 'true');
		}
	}
}

function activateDragstartWall(event){
	if(event.target.classList.contains('wall')){
		event.target.classList.add('draggable-wall');
	}
}

function activateDragenterWall(event){
	if (document.querySelector('.draggable-wall') && (!event.target.classList.contains('enter') && !event.target.classList.contains('exit') && !event.target.classList.contains('wall'))){
		event.target.classList.add('available');
	}	
}

function activateDragoverWall(event){
	if (!event.target.classList.contains('enter') && !event.target.classList.contains('exit') && !event.target.classList.contains('wall')){
		event.preventDefault();
	}	
}

function activateDragleaveWall(event){
	if(!event.target.classList.contains('enter') && !event.target.classList.contains('exit') && !event.target.classList.contains('wall')){
		event.target.classList.remove('available');
	}
}

function activateDropWall(event){
	document.querySelector('.draggable-wall').removeAttribute('draggable');
	document.querySelector('.draggable-wall').classList.remove('wall');
	document.querySelector('.draggable-wall').classList.remove('draggable-wall');

	if (!event.target.classList.contains('enter') && !event.target.classList.contains('exit') && !event.target.classList.contains('wall')){
		event.target.classList.add('wall');
		event.target.setAttribute('draggable', 'true');
		event.target.classList.remove('available');
		event.preventDefault();
	}
}
	
	




