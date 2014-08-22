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
	if (collectible.attemptCollect("leaves")) {
		gather();
	}
}
	
function gather(){
	playerSource.leaves += 1;
	playerSource.alertText = "1 Leaf Collected";
	playerSource.energyCountDown();
}