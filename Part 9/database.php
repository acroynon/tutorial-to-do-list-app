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
