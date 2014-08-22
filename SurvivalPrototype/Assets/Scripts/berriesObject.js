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
	if (collectible.attemptCollect("berries")) {
		gather();
	}
}
	
function gather(){
	playerSource.berries +=Random.Range(1,2);
	playerSource.alertText = "Berries Collected";
	playerSource.energyCountDown();
}