#pragma strict

public var collectDistance : float = 2;
public var minInitialLife : int = 1;
public var maxInitialLife : int = 5;
var life : int;
var isDestroyed : int;

function Start () {
	life = Random.Range(minInitialLife, maxInitialLife);

}

function Update () {
	if(life <=0){
		destroyObject();
	}
}

public function attemptCollect(name : String) {
	if (life <= 0) {
		Debug.Log("Destroying on mouse down: " + name);
		destroyObject();
		return false;
	}
	var players : GameObject[];
	var player : GameObject;
	var playerPosition : Vector3;
	var distance : float;
	players = GameObject.FindGameObjectsWithTag("Player");
	player = players[0];
	var playerComponent : Player;
	playerComponent = player.GetComponent(Player);
	playerPosition = player.transform.position;
	distance = Vector3.Distance(playerPosition, transform.position);
	if (distance < collectDistance) {
		Debug.Log("Collected " + name);
		life --;
		playerComponent.hasCollected();
		return true;
	} else {
		Debug.Log("Cannot collect " + name);
	}
}

function destroyObject() {
	if (isDestroyed == 0) {
		isDestroyed++;
		Destroy(gameObject);
	}
}