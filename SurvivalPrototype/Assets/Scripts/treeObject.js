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
	if (collectible.attemptCollect("wood")) {
		gather();
	}
}	
public function gather(){
	if(playerSource.axe>0){
	playerSource.wood+= 3;
	playerSource.alertText = "3 Wood Collected";
	}
	else{
	playerSource.wood += 1;
	playerSource.alertText = "1 Wood Collected";
	}
	playerSource.energyCountDown();
}