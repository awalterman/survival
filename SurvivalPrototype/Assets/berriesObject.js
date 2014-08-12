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
	playerSource.gatherBerries();
	life --;
	}