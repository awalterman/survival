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
	gatherBerries();
	life --;
	}
	
function gatherBerries(){
	playerSource.berries +=Random.Range(1,2);
	playerSource.hunger -= playerSource.hungerPerCollect;

}