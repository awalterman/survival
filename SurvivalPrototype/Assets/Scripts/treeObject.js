#pragma strict

private var playerSource: GameStart;
var life : int;
public var collectDistance : float;
var isDestroyed : int;

function Start () {
	playerSource = Camera.main.GetComponent("GameStart");
	life = Random.Range(1,5);
}

function Update () {
	if(life <=0){
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
	var playerComponent : Player;
	playerComponent = player.GetComponent(Player);
	playerPosition = player.transform.position;
	distance = Vector3.Distance(playerPosition, transform.position);
	if (distance < collectDistance) {
		Debug.Log("Collected wood.");
		playerComponent.hasCollected();
		gatherWood();
		life --;
	} else {
		Debug.Log("Cannot collect wood.");
	}
}
	
public function gatherWood(){
	if(playerSource.axe>0){
	playerSource.wood+= 3;
	}
	else{
	playerSource.wood += 1;
	}
	playerSource.hunger -= playerSource.hungerPerCollect;
}

function destroyObject() {
	if (isDestroyed == 0) {
		isDestroyed++;
		Destroy(gameObject);
	}
}