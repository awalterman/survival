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
	if (collectible.attemptCollect("rock")) {
		gather();
	}
}
	
function gather(){
	playerSource.rock +=1;
	playerSource.alertText = "1 Rock Collected";
	playerSource.energyCountDown();
}