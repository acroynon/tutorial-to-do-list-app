# How To Create A Simple To Do List App Using HTML, CSS, JS, and PHP - Part 9

This is the continuous of a series of tutorials about creating a to do list web application, if you haven't checked out the entire tutorial please start from Part 1.

```php
<?php

class MyDatabase extends SQLite3 {

	function __construct(){
		$this->open("mysqlitedb.db");	
		$this->exec("CREATE TABLE IF NOT EXISTS items (
				id INTEGER PRIMARY KEY, 
				checked BOOLEAN NOT NULL DEFAULT false,
				text VARCHAR NOT NULL
			)");	

		$this->exec("INSERT INTO items (text) VALUES ('Work out'), ('Do the washing up'), ('Take the rubbish out')");
	}

	function getItems(){
		$arr = [];
		$results = $this->query("SELECT * FROM items");

		while($row = $results->fetchArray(SQLITE3_ASSOC)){
			array_push($arr, $row);
		}

		return json_encode($arr);
	}

}

$db = new MyDatabase();

?>
```

```php
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
```

## Further Reading



Continue to Part 10

---

_Categories:_ Web Development, Fundamentals

_Tags:_ web development, fundamentals, html, javascript

_Keywords:_ computer programming, computer science, web development, learn web development, learn javascript,