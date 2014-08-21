#pragma strict

private var playerSource: GameStart;
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
	gatherStone();
	life --;
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