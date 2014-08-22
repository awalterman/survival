#pragma strict

function ONGUI() {
	GUI.Label(Rect(150,150,500,500), "Game Over");
	if(GUI.Button(Rect(150,200,100,40), "Reset Game")){
		Application.LoadLevel("survivalPrototype");	
	}
}

function Update () {

}