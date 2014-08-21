#pragma strict

function OnGUI(){
if(GUI.Button(Rect(200,200,150,150),"Start Game")){
	Application.LoadLevel("survivalPrototype");	
}
}