function getFirstName(){
	var firstName = document.getElementById("input_first_name").value;
}
function getLastName(){
	var lastName = document.getElementById("input_last_name").value;
}
function getEmail(){
	var email = document.getElementById("input_email").value;
}
function getUsername(){
	var username = document.getElementById("input_username").value;
}
function getPassword(){
	var password = document.getElementById("input_password").value;
}

function visibility(){
	var pass = document.getElementById("input_password");
	if(pass.type === "password"){
		document.getElementById("input_password").type = "text";
	}else{
		pass.type = "password";
	}
	
}

function inputValidity(){
	let inputMap = new Map([
		["First name", document.getElementById("input_first_name").value],
		["Last name", document.getElementById("input_last_name").value],
		["Email", document.getElementById("input_email").value],
		["Username", document.getElementById("input_username").value],
		["Password", document.getElementById("input_password").value],
	]);
	for(const[key, value] of inputMap.entries()){
		console.log(key, value);
		if(value.length < 1){
			alert(key + " is empty");
			return;
		}
		if(value.indexOf(" ") >= 0){
			alert(key + " contains spaces");
			return;
		}
		if(value.length > 50){
			alert(key + " cannot contain over 100 characters");
			return;
		}
	}

	if(inputMap.get("Username").length < 3){
		alert("Username must contain at least 3 characters");
	}else{
		alert("Nice username, " + inputMap.get("Username").toString());
	}
}
var signButton = document.getElementById("signup");
signButton.addEventListener("click", inputValidity, false);
var visibleButton = document.getElementById("visible");
visibleButton.addEventListener("click", visibility, false);
