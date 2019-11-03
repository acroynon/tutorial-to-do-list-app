<?php

require_once("database.php");

$request_uri = $_SERVER['REQUEST_URI'];

switch($request_uri){
	case '/':
		require __DIR__ . '/index.html';
		break;
	case '/scripts.js':
		require __DIR__ . '/scripts.js';
		break;
	case '/style.css':
		require __DIR__ . '/style.css';
		break;
	case '/api/items':
		echo $db->getItems();
}