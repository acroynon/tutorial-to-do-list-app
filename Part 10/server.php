<?php

require_once("database.php");

$request_uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];


if($method == "GET" && $request_uri == "/"){
	require __DIR__ . '/index.html';
} else if($method == "GET" && $request_uri == "/scripts.js"){
	require __DIR__ . '/scripts.js';
} else if($method == "GET" && $request_uri == "/style.css"){
	require __DIR__ . '/style.css';
} else if($method == "GET" && $request_uri == "/api/items"){
	echo $db->getItems();
} else if($method == "POST" && $request_uri == "/api/items"){
	$text = $_POST["text"];
	echo $db->addItem($text);
} else if($method == "DELETE" && $request_uri == "/api/items"){
	$id = $_POST["id"];
	if($id){
		echo $db->deleteItem($id);
	}else{
		echo $db->clearItems();
	}
}  else if($method == "PATCH" && $request_uri == "/api/items"){
	$id = $_POST["id"];
	$checked = $_POST["checked"];
	echo $db->setChecked($id, $checked);
} 
