#pragma strict
var text: Texture2D;


function OnGUI() {
	GUI.Label(Rect(0,-50,500,500), text);
}

function Update () {
	if(Input.GetMouseButtonUp (0)){
		Application.LoadLevel("gameStart");
	}
}