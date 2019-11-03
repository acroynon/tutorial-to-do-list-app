var data = JSON.parse(window.localStorage.getItem("data")) || [];

function render(){
	clearList(); 
	for(var i=0; i<data.length; i++){
		var item = data[i];

		var ul = document.querySelector("ul");
		
		var li = document.createElement("li");
		li.innerText = item.text;

		var checkbox = document.createElement("input");
		checkbox.type = 'checkbox'
		checkbox.addEventListener('change', checkboxClickHandler.bind(this, item.id));

		checkbox.checked = item.isDone; 
		li.style.textDecoration = item.isDone ? "line-through" : "none"; 

		var button = document.createElement("button");
		button.innerText = "Remove";
		button.classList.add("remove-btn")
		button.addEventListener('click', removeClickHandler.bind(this, item.id));

		li.prepend(checkbox);
		li.append(button);
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

function removeClickHandler(id, event){
	data = data.filter(function(i){
		return i.id != id;
	});
	render();
}

var addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function(){
	var input = document.getElementById("addInput")
	var text = input.value;
	var ids = data.map(function(i){ return i.id });
	var maxId = Math.max.apply(this, ids);
	var nextId = maxId + 1;
	if(data.length == 0){ nextId = 0 }

	var item = {
		id: nextId,
		text: text,
		isDone: false
	};
	data.push(item);
	input.value = ''
	render();
});

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener('click', function(){
	var sure = confirm("Are you sure you want to clear all items?");
	if(sure){
		data = [];
		render();
	}
})

render();

window.onbeforeunload = function () {
    window.localStorage.setItem("data", JSON.stringify(data));
}