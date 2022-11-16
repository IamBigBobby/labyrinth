
const data = `{
	"width": 11,
	"height": 11,
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
		{"x": 1, "y": 1, "type": "enter"},
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


for (let i = 1; i <= parsedData.fields.length; i++){
	console.log(parsedData.fields[i])
	if (parsedData.fields[i].type === 'enter'){
		table.rows[parsedData.fields[i].x].cells[parsedData.fields[i].y].classList.add('enter')
	}
	else if(parsedData.fields[i].type === 'exit'){
		table.rows[parsedData.fields[i].x].cells[parsedData.fields[i].y].classList.add('exit')
	}
	else{
		table.rows[parsedData.fields[i].x].cells[parsedData.fields[i].y].classList.add('wall')
	}	
}


// for (let i = 0; i < parsedData.fields.length; i++){
// 	// console.log(parsedData.fields[i])
// 	for (let j = 0, row; row = table.rows[j]; j++){
// 		console.log(row)
// 		for (let k = 0, col; col = row.cells[k]; k++){
// 			console.log(col)
// 		}
// 	}
// }


















// for (let j = 0, row; row = table.rows[j]; j++){
// 	console.log(row)
// 	for (let i = 0; i < parsedData.fields.length; i++){
// 		if(j === parsedData.fields[i].x){
// 			for (let k = 0, col; col = row.cells[k]; k++){
// 				if( k === parsedData.fields[i].y){
// 					cell.classList.add('wall')
// 				}
// 			}
// 		}
// 	}
// }










































































// // console.log(parsedData.fields)
// // console.log(parsedData.fields[3].x)
// // console.log(parsedData.fields[9].y)
// // console.log(table.rows[0].cells[3])

// for (let j = 0; j < parsedData.fields.length; j++){
// 	console.log(parsedData.fields[j])
// 	for (let i = 0, row; row = table.rows[i]; i++){
// 		console.log(row)
// 		for (let k = 0, col; col = row.cells[k]; k++){
// 			table.cell.classList.add('wall')
// 		}
// 	}
// }



// // for (let i = 0; i < parsedData.width * parsedData.height; i++){
// // 	console.log(parsedData.fields[i]);
// // 	numberOfrow = 1;
// // 	numberOfcell = 1;
// // 	if (numberOfrow === parsedData.fields[i].x){
// // 		for (let row of table.rows){
// // 			if (numberOfcell === parsedData.fields[i].y){

// // 			}
// // 		}
// // 	}
	
// // }


// // for (let row of table.rows){
// // 	console.log(table.rows)
// // 	for (let cell of row.cells){
// // 		const text = cell.innerText;
// // 		cell.innerText = '123'
// // 	}
// // }


// console.log(parsedData.fields.length)
// console.log(parsedData.fields[0])
// console.log(cell)


// for (let i = 0; i < parsedData.fields.length; i++){
// 	// console.log(parsedData.fields[i])
// 	for (let j = 0, row; row = table.rows[j]; j++){
// 		console.log(row)
// 		for (let k = 0, col; col = row.cells[k]; k++){
// 			console.log(col)
// 		}
// 	}
// }


