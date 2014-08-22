#pragma strict

function OnGUI() {
	GUI.Label(Rect(Screen.width/2,Screen.height/2,500,500), "Game Over");
	if(GUI.Button(Rect(Screen.width/2,(Screen.height/2)+30,100,40), "Reset Game")){
		Application.LoadLevel("survivalPrototype");	
	}
}

function Update () {

}