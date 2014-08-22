#pragma strict
var text: Texture2D;


function OnGUI() {
	GUI.Label(Rect(0,-50,500,500), text);
	GUI.Label(Rect(600,180,100,50),"Time Survived: "+PlayerPrefs.GetInt("TimeLived"));
}

function Update () {
	if(Input.GetMouseButtonUp (0)){
		Application.LoadLevel("gameStart");
	}
}