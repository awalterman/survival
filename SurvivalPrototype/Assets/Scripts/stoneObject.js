#pragma strict

private var playerSource: GameStart;

function Start () {
	playerSource = Camera.main.GetComponent("GameStart");
}

function Update () {
}

function OnMouseDown() {
	var collectible : Collectible;
	collectible = GetComponent(Collectible);
	if (collectible.attemptCollect("stone")) {
		gather();
	}
}
	
function gather(){
	if(playerSource.pickAxe>0){
	playerSource.stone += 3;
	playerSource.alertText = "3 Stone Collected";
	}
	else{
	playerSource.stone +=1;
	playerSource.alertText = "1 Stone Collected";
	}
	playerSource.energyCountDown();
}