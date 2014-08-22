#pragma strict

public var title: Texture2D;
public var start: Texture2D;

function OnGUI(){
GUI.Label(Rect(70,-80,512,512),title);
if(GUI.Button(Rect(280,280,100,100),start)){
	Application.LoadLevel("survivalPrototype");	
}
}