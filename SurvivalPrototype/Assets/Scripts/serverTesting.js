#pragma strict

import 	SimpleJSON;
var url = "http://localhost:8080/survive/leaderboard";
var www: WWW;
var leaderboard;

function Start () {

www = new WWW (url);

// wait for request to complete
yield www;
 
// and check for errors
if (www.error == null)
	{
	  var scores = www.data;
		//success
		Debug.Log("WWW Ok!: " + scores);	
	} 

else {
    // something wrong!
    Debug.Log("WWW Error: "+ www.error);
	}

leaderboard = formatLeaderboards(parseString(www.data));

}

function postScore(name: String, score: String){
	var temp = name + "-" + score;
	var form = new WWWForm();
	form.AddField( "score", temp);
	// Create a download object
	var download = new WWW( url, form );
	yield download;
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
	Debug.Log(result);
	return result;
}

function formatLeaderboards(data: Array){
	var results: String;
	for(var i = 1; i<data.length;i++){
		if(i%2 == 1){
			results+= data[i] + " ";
		}
		else{
			results+= " Score: " + data[i] + "\n";
		}
	}
	return results;
}

function OnGUI(){
	GUI.Label(Rect(50,50,1000,1000), "" + leaderboard);
}
