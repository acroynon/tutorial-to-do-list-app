function render(){
	getItems(function(data){
		console.log(data);
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
	})

}

function clearList(){
	clearItems(function(){
		render();
	})
}

function checkboxClickHandler(id, event){
	setChecked(id, event.target.checked, function(){
		render();
	})
}

function removeClickHandler(id, event){
	deleteItem(id, function(){
		render();
	})
}

var addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function(){
	var input = document.getElementById("addInput")
	var text = input.value;
	addItem(text, function(){
		render();
	})
});

var clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener('click', function(){
	var sure = confirm("Are you sure you want to clear all items?");
	if(sure){
		clearItems(function(){
			render();
		})
	}
})

function ajax(method, uri, callback, data){
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(this.responseText);
		}
	};
	xhttp.open(method, uri, true);
	xhttp.send(data);
}
ajax('GET', '/api/items', function(response){
	console.log(response);
})

function getItems(callback){
	ajax('GET', '/api/items', function(response){
		var items = JSON.parse(response);
		callback(items);
	})
}

function addItem(text, callback){
	ajax('POST', '/api/items', function(response){
		console.log(response)
		callback();
	}, {text: text})
}

function deleteItem(id, callback){
	ajax('DELETE', '/api/items', function(response){
		callback();
	}, {id: id})
}

function clearItems(callback){
	ajax('DELETE', '/api/items', function(response){
		callback();
	})
}

function setChecked(id, checked, callback){
	ajax('PATCH', '/api/items', function(response){
		callback();
	}, {id: id, checked : checked})
}