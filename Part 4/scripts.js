var checkboxList = document.querySelectorAll("input[type=checkbox]");

for(var i=0; i<checkboxList.length; i++){
	var checkbox = checkboxList[i];
	checkbox.addEventListener('change', function() {
	    var li = this.parentElement;
	    if(this.checked){
	    	li.style.textDecoration = "line-through"
	    }else{
	    	li.style.textDecoration = "none"
	    }
	});	
}

var addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function(){
	var ul = document.querySelector("ul");
	var input = document.getElementById("addInput")

	var li = document.createElement("li");
	li.innerText = input.value;

	var checkbox = document.createElement("input");
	checkbox.type = 'checkbox'

	li.prepend(checkbox)
	ul.append(li)
})
