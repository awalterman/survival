#pragma strict
var text: Texture2D;
var stringToEdit : String = "Edit Me";
var url = "http://localhost:8080/survive/leaderboard";


function OnGUI() {
	GUI.Label(Rect(0,-50,500,500), text);
	GUI.Label(Rect(600,180,100,50),"Time Survived: "+PlayerPrefs.GetInt("TimeLived"));
	stringToEdit = GUI.TextField (Rect (600, 200, 200, 20), stringToEdit, 25);
	if(stringToEdit != "Edit Me")
		if(GUI.Button(Rect(600,250,100,50),"Submit Score")){
			postScore(stringToEdit, PlayerPrefs.GetInt("TimeLived").ToString());
			Application.LoadLevel("gameStart");
		}
}

function Update () {
}

function postScore(name: String, score: String){
	var temp = name + "-" + score;
	var form = new WWWForm();
	form.AddField( "score", temp);
	// Create a download object
	var download = new WWW( url, form );
	yield download;
}