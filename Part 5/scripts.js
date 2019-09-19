var data = [
	{id: 1, text: 'Washing up', isDone: false},
	{id: 2, text: 'Do the laundry', isDone: false},
	{id: 3, text: 'Work out', isDone: false},
	{id: 4, text: 'Etc...', isDone: false}
]

function render(){
	clearList(); // ** otherwise it just adds the items to the list
	for(var i=0; i<data.length; i++){
		var item = data[i];

		var ul = document.querySelector("ul");
		
		var li = document.createElement("li");
		li.innerText = item.text;

		var checkbox = document.createElement("input");
		checkbox.type = 'checkbox'
		checkbox.addEventListener('change', checkboxClickHandler.bind(this, item.id));

		checkbox.checked = item.isDone; // ** otherwise re-render checkboxes are unchecked
		li.style.textDecoration = item.isDone ? "line-through" : "none"; // **

		li.prepend(checkbox);
		ul.append(li);
	}
}

function clearList(){
	var ul = document.querySelector("ul");
	while(ul.firstChild){
		ul.removeChild(ul.firstChild);
	}
}

function checkboxClickHandler(id, event){
	var item = data.find(function(i){
		return i.id == id;
	})
	item.isDone = event.target.checked;
	render();
}

render();