
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

 
let cell = document.querySelector('td')

for (let i = 0; i < parsedData.fields.length; i++){
	if (parsedData.fields[i].type == 'enter'){
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('enter')
	}
	if(parsedData.fields[i].type == 'exit'){
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('exit')
	}
	else{
		table.rows[parsedData.fields[i].x - 1].cells[parsedData.fields[i].y - 1].classList.add('wall')
	}	
}

// добавить координаты
let left = 0;
let up = 0;


// old movement

// document.onkeydown = function (event){
// 	console.log(event);
// 	if (event.key =="ArrowRight"){
// 		block.style.left = left + 'px';
// 		left++;
// 	}
// 	else if(event.key == 'ArrowDown'){
// 		block.style.top = up + 'px';
// 		up++;
// 	}
// 	else if(event.key == 'ArrowLeft'){
// 		block.style.left = left - 'px';
// 		left--;
// 	}
// 	else if(event.key == 'ArrowUp'){
// 		block.style.top = up - 'px';
// 		up--;
// 	}
// }

document.onkeydown = function (event){
	if (event.key == "ArrowRight"){
		left++;
	}
	else if(event.key == "ArrowDown"){
		up++;
	}
	else if (event.key == "ArrowLeft"){
		left--;
	}
	else if (event.key == "ArrowUp"){
		up--;
	}
	document.querySelector('.enter').classList.remove('enter');
	table.rows[up].cells[left].classList.add('enter');
}
// bla-bla

