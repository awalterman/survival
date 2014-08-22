#pragma strict

public var possibleAnimals : GameObject[];

var lastX : float = 0;
var lastZ : float = 0;

function Start () {
	Debug.Log("Generation script");
	generateAnimal();
}

function Update () {
//	generateAnimal();
}

function generateAnimal () {
	var index = Random.Range(0, possibleAnimals.Length);
	Debug.Log(index);
	lastX++;
	lastZ++;
	var animal;
	var prefab = possibleAnimals[index];
	animal = Instantiate(prefab, Vector3(lastX, 0, lastZ), Quaternion.Euler(0,0,0));	
}
