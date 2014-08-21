#pragma strict

private var playerSource: GameStart;
public var collectDistance : float;
var life : int;

function Start () {
	playerSource = Camera.main.GetComponent("GameStart");
	life = Random.Range(1,5);
}

function Update () {
	if(life <=0){
		Destroy(gameObject);
	}
}

function OnMouseDown() {
	var players : GameObject[];
	var player : GameObject;
	var playerPosition : Vector3;
	var distance : float;
	players = GameObject.FindGameObjectsWithTag("Player");
	player = players[0];
	playerPosition = player.transform.position;
	distance = Vector3.Distance(playerPosition, transform.position);
	if (distance < collectDistance) {
		gatherStone();
		life --;
	}
}
	
function gatherStone(){
	if(playerSource.itemCheck("PickAxe")){
	playerSource.stone += 3;
	}
	else{
	playerSource.stone +=1;
	}
	playerSource.hunger -= playerSource.hungerPerCollect;
}