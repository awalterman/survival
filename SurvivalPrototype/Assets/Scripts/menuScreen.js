#pragma strict

public var title: Texture2D;
public var start: Texture2D;
public var info : Texture2D;

function OnGUI(){
GUI.Label(Rect(500,-150,512,512),title);
GUI.Label (Rect (25, Screen.height/4, 418, 445), info);
if(GUI.Button(Rect(700,500,50,50),start)){
	Application.LoadLevel("PlayerInTestMap");	
}
}