#pragma strict

private var playerSource: GameStart;
public var collectDistance : float;
var life : int;
var isDestroyed : int;

function Start () {
	playerSource = Camera.main.GetComponent("GameStart");
	life = Random.Range(1,5);
}

function Update () {
	if (life <= 0) {
		destroyObject();
	}
}

function OnMouseDown() {
	if (life <= 0) {
		destroyObject();
	}
	var players : GameObject[];
	var player : GameObject;
	var playerPosition : Vector3;
	var distance : float;
	players = GameObject.FindGameObjectsWithTag("Player");
	player = players[0];
	playerPosition = player.transform.position;
	distance = Vector3.Distance(playerPosition, transform.position);
	if (distance < collectDistance) {
		Debug.Log("Collected stone.");
		gatherStone();
		life --;
	} else {
		Debug.Log("Cannot collect stone.");
	}
}
	
function gatherStone(){
	if(playerSource.pickAxe>0){
	playerSource.stone += 3;
	}
	else{
	playerSource.stone +=1;
	}
	playerSource.hunger -= playerSource.hungerPerCollect;
}

function destroyObject() {
	if (isDestroyed == 0) {
		isDestroyed++;
		Destroy(gameObject);
	}
}