#pragma strict

public var title: Texture2D;
public var start: Texture2D;
public var info : Texture2D;
var url;
var www: WWW;
var leaderboard = "Name\n";
var scores = "Score \n";

function OnGUI(){
GUI.Label(Rect(500,-150,512,512),title);
GUI.Label (Rect (25, Screen.height/4, 418, 445), info);
GUI.Label(Rect(500,200, 1000,1000),""+ leaderboard);
GUI.Label(Rect(600,200, 1000,1000),""+ scores);
if(GUI.Button(Rect(700,500,50,50),start)){
	Application.LoadLevel("PlayerInTestMap");	
}
}

function Start () {
url = "http://coastal-sanctum-691.appspot.com/survive/leaderboard";
leaderboard = "Name\n";
scores = "Score \n";
www = new WWW (url);
yield www;
 
// and check for errors
if (www.error == null)
	{
	leaderboard += formatLeaderboards(parseString(www.data));
	} 

else {
    // something wrong!
    Debug.Log("WWW Error: "+ www.error);
	}
}

function parseString( data: String){
	var result = new Array();
	var temp: String;
	for(var i = 0; i< data.Length;i++){
		if(data[i] == "[" || data[i] == "," || data[i]== "]" ){
		
		}
		else if(data[i] == '"' && temp != ""){
			result.push(temp);
			temp = "";
		}
		else if (temp != " "){
			//Debug.Log(data[i]);
			temp += data[i];
		}
	}
	for(var j = 0;j< result.length; j++){
		if(result[j] == "" || result[j] == " "){
			result.RemoveAt(j);
		}
	}
	return result;
}

function formatLeaderboards(data: Array){
	var results: String;
	for(var i = 1; i<data.length;i++){
		if(i%2 == 1){
			results+= data[i] + " \n";
		}
		else{
			scores+= "" + data[i] + "\n";
		}
	}
	return results;
}