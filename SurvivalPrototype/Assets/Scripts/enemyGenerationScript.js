#pragma strict

public var possibleAnimals : GameObject[];
public var totalAnimals : int;

var lastX : float = 0;
var lastZ : float = 0;

function Start () {
	for(var i:int = 0; i < totalAnimals; i++) {
		generateAnimal();
	}
}

function Update () {
//	generateAnimal();
}

function generateAnimal () {
	var index = Random.Range(0, possibleAnimals.Length);
	var curX = lastX + Random.Range(-50, 50);
	var curZ = lastZ + Random.Range(-50, 50);
	var animal;
	var prefab = possibleAnimals[index];
	animal = Instantiate(prefab, Vector3(lastX, 0, lastZ), Quaternion.Euler(0,0,0));	
}
