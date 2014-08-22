#pragma strict

 var health = 100.0;
 var hunger = 100.0;
 var alert = true;
 var alertText = "";
 var timer = 0.0;

 var x: float;
 var y: float;
 var ix = -150;
 var cx = -200;
 var scrollViewVector : Vector2 = Vector2.zero;
 var scrollViewVector2 : Vector2 = Vector2.zero;

	
//turn counters
 var turnCounter = 0;
 var coldCounter = 0;
 var gameLost = false;
 var gameWin = false;

//conditions
 var conditionList = new Array();
 var conditionString = "";
 var turnsToCold = 30;
 var turnsToFreezing = 10; 

//resources
 var wood=0;
 var stone=0;
var berries=0;
 var inventory = new Array ();
 var inventoryString = "";
 var tip = "";
 var rock = 0;
 var meat = 0;
 var hide = 0;
 var leaves = 0;
 var dps = 5;
 var enemyName = "";
 var enemyHealth = 0;
 var woodShaft = 0;
 var sharpenedStone = 0;
 var leather = 0;
 var healingHerb = 0;
 var cookedMeat = 0;
 var clothRags = 0;
 var armor = 0;
 var axe = 0;
 var pickAxe = 0;
 var stoneAxe = 0;
 var knife = 0;
 var spear = 0;

//world generation
 var spawner = 0;
 var chanceForBerry = 50;
 var chanceForTree = 20;
 var chanceForStone = 75;
 var chanceForRock = 40;
 var chanceForRabbit = 70;
 var chanceForDeer = 80;
 var chanceForWolf = 85;
 var chanceForBear = 95;
 var wolfHealth = 20;
 var bearHealth = 50;
 var chanceToEscapeWolf = .6;
 var chanceToEscapeBear = .8;
 var bearDPS = 25;
 var wolfDPS = 15;

public var woodIcon: Texture2D;
public var stoneIcon: Texture2D;
public var rockIcon: Texture2D;
public var meatIcon: Texture2D;
public var hidesIcon: Texture2D;
public var berriesIcon: Texture2D;
public var fireIcon: Texture2D;
public var healthIcon: Texture2D;
public var energyIcon: Texture2D;
public var healthFill: Texture2D;
public var energyFill: Texture2D;
public var leavesIcon: Texture2D;
public var woodShaftIcon: Texture2D;
public var sharpenedStoneIcon: Texture2D;
public var leatherIcon: Texture2D;
public var healingHerbIcon:Texture2D;
public var cookedMeatIcon: Texture2D;
public var clothRagIcon: Texture2D;
public var armorIcon:Texture2D;
public var axeIcon:Texture2D;
public var pickAxeIcon: Texture2D;
public var stoneAxeIcon: Texture2D;
public var knifeIcon: Texture2D;
public var spearIcon: Texture2D;

public var campfireObject: GameObject;

public static var didClickGui = false;
private var player : Player;

function Start () {
x= Screen.width;
y= Screen.height;
player = GameObject.Find("Player").GetComponent.<Player>();

InvokeRepeating("energyCountDown", 1, 2);
InvokeRepeating("alertTextReset", 1, 3);
InvokeRepeating("turnCounterUpdate", 1, 3);
} 

function OnGUI() {
	//time survived
	GUI.Label(Rect(10,10,100,100), "Time Survived: " + timer);
	
	if(gameLost == false && gameWin == false){		
		//health bar
		GUI.Label(Rect(x-180,7,100,30),GUIContent("Health",healthIcon));
		GUI.Box(Rect(x-110,10,100,20),"");
		GUI.skin.box.stretchWidth = true;
		GUI.skin.box.stretchHeight = true;
		GUI.DrawTexture(Rect(x-110,13,health,12),healthFill,ScaleMode.StretchToFill,true,10.0f);
		
		//energy
		GUI.Label(Rect(x-180,32,100,30),GUIContent("Energy",energyIcon));
		GUI.Box(Rect(x-110,35,100,20),"");
		GUI.DrawTexture(Rect(x-110,38,hunger,12),energyFill,ScaleMode.StretchToFill,true,10.0f);
				
		//condition box
		GUI.Box(Rect(x-110, 60, 100, 70), "Condition:" + conditionString);
				 	 	 	 
		//inventory 
		if(GUI.Button(Rect(10, y-40, 100,30),"Inventory")){
			if(ix == -150)
			ix = Mathf.Lerp(-150,10,1);
			
			else
			ix = Mathf.Lerp(10,-150,1);
		}
		// Begin the ScrollView
    	scrollViewVector = GUI.BeginScrollView (Rect(ix, 80, 100, 250), scrollViewVector, Rect (0, 80, 80, 600));
 		GUI.Label(Rect (0, 80, 30, 30), woodIcon);
 		GUI.Label(Rect (30, 80, 80, 20),""+ wood);
 		GUI.Label(Rect (0, 110, 30, 30),stoneIcon);
		GUI.Label(Rect (30, 110, 80, 20),""+stone);
		GUI.Label(Rect (0, 140, 30, 30),berriesIcon);
		GUI.Label(Rect (30, 140, 80, 20),""+berries);
		GUI.Label(Rect (0, 170, 30, 30),rockIcon);
		GUI.Label(Rect (30, 170, 80, 20),""+rock);
		GUI.Label(Rect (0, 200, 30, 30),meatIcon);
		GUI.Label(Rect (30, 200, 80, 20),""+meat);
		GUI.Label(Rect (0, 230, 30, 30),hidesIcon);
		GUI.Label(Rect (30, 230, 80, 20),""+hide);
		GUI.Label(Rect (0, 260, 30, 30),leavesIcon);
		GUI.Label(Rect (30, 260, 80, 20),""+leaves);
		
		GUI.Label(Rect (0, 290, 30, 30),woodShaftIcon);
		GUI.Label(Rect (30, 290, 80, 20),""+woodShaft);
		GUI.Label(Rect (0, 320, 30, 30),sharpenedStoneIcon);
		GUI.Label(Rect (30, 320, 80, 20),""+sharpenedStone);
		GUI.Label(Rect (0, 350, 30, 30),leatherIcon);
		GUI.Label(Rect (30, 350, 80, 20),""+leather);
		GUI.Label(Rect (0, 380, 30, 30),healingHerbIcon);
		GUI.Label(Rect (30, 380, 80, 20),""+healingHerb);
		GUI.Label(Rect (0, 410, 30, 30),cookedMeatIcon);
		GUI.Label(Rect (30, 410, 80, 20),""+cookedMeat);
		GUI.Label(Rect (0, 440, 30, 30),axeIcon);
		GUI.Label(Rect (30, 440, 80, 20),""+axe);
		GUI.Label(Rect (0, 470, 30, 30),pickAxeIcon);
		GUI.Label(Rect (30, 470, 80, 20),""+pickAxe);
		GUI.Label(Rect (0, 500, 30, 30),stoneAxeIcon);
		GUI.Label(Rect (30, 500, 80, 20),""+stoneAxe);
		GUI.Label(Rect (0, 530, 30, 30),knifeIcon);
		GUI.Label(Rect (30, 530, 80, 20),""+knife);
		GUI.Label(Rect (0, 560, 30, 30),spearIcon);
		GUI.Label(Rect (30, 560, 80, 20),""+spear);
		
   		// End the ScrollView
   	 	GUI.EndScrollView();

		
		if(GUI.Button(Rect(120, y-40, 100,30),"Crafting")){
			if(cx == -200)
			cx = Mathf.Lerp(-200,120,1);
			
			else
			cx = Mathf.Lerp(120,-200,1);
		}
		    scrollViewVector2 = GUI.BeginScrollView (Rect(cx, 80, 200, 250), scrollViewVector2, Rect (0, 10, 80, 400));
			//crafting
			if (GUI.Button(Rect(0,35,80,20),"Axe"))
				craftItem("axe", "woodShaft",1, "rock", 10);
			GUI.Label (Rect (85, 36, 100, 20),GUIContent("1",woodShaftIcon));
			GUI.Label (Rect (120, 36, 100, 20),GUIContent("10",rockIcon));
			
			if (GUI.Button(Rect(0,60,80,20),"Pickaxe"))
				craftItem("pickAxe","woodShaft",3,"sharpenedStone",3);
			GUI.Label (Rect (85, 61, 100, 20),GUIContent("3",woodShaftIcon));
			GUI.Label (Rect (120, 61, 100, 20),GUIContent("3",sharpenedStoneIcon));
			
			if (GUI.Button(Rect(0,85,80,20),"Knife"))
				craftItem("knife","woodShaft",1,"sharpenedStone",5);
			GUI.Label (Rect (85, 86, 100, 20),GUIContent("1",woodShaftIcon));
			GUI.Label (Rect (120, 86, 100, 20),GUIContent("5",sharpenedStoneIcon));
			
			if (GUI.Button(Rect(0,110,80,20),"Spear"))
				craftItem("spear","woodShaft",5,"sharpenedStone",5);
			GUI.Label (Rect (85, 111, 100, 20),GUIContent("5",woodShaftIcon));
			GUI.Label (Rect (120, 111, 100, 20),GUIContent("5",sharpenedStoneIcon));
			
			if (GUI.Button(Rect(0,135,80,20),"Campfire"))
				craftCampfire();
			GUI.Label (Rect (85, 136, 100, 20),GUIContent("10",woodIcon));
			GUI.Label (Rect (120, 136, 100, 20),GUIContent("5",rockIcon));
			
			if (GUI.Button(Rect(0,160,80,20),"Cook Meat"))
				craftItem("cookedMeat","meat",1);
			GUI.Label (Rect (85, 161, 100, 20),GUIContent("1",fireIcon));
			GUI.Label (Rect (120, 161, 100, 20),GUIContent("1",meatIcon));
			
			if (GUI.Button(Rect(0,185,80,20),"Cloth Rags"))
				craftItem("clothRags", "hide",10,"leaves",20);
			GUI.Label (Rect (85, 186, 100, 20),GUIContent("10",hidesIcon));
			GUI.Label (Rect (120, 186, 100, 20),GUIContent("20",leavesIcon));
			
			if (GUI.Button(Rect(0,210,80,20),"Wood Shaft"))
				craftItem("woodShaft","wood",10);
			GUI.Label (Rect (85, 211, 100, 20),GUIContent("10",woodIcon));
			
			if (GUI.Button(Rect(0,235,80,20),"Sharpened Stone"))
				craftItem("sharpenedStone","stone",5, "rock", 3);
			GUI.Label (Rect (85, 236, 100, 20),GUIContent("5",stoneIcon));
			GUI.Label (Rect (120, 236, 100, 20),GUIContent("3",rockIcon));
			
			if (GUI.Button(Rect(0,260,80,20),"Leather"))
				craftItem("leather","hide",2, "sharpenedStone", 1);
			GUI.Label (Rect (85, 261, 100, 20),GUIContent("2",hidesIcon));
			GUI.Label (Rect (120, 261, 100, 20),GUIContent("3",sharpenedStoneIcon));
			
			if (GUI.Button(Rect(0,285,80,20),"Healing Herb"))
				craftItem("healingHerb","leaves",10, "berries", 10);
			GUI.Label (Rect (85, 286, 100, 20),GUIContent("10",leavesIcon));
			GUI.Label (Rect (120, 286, 100, 20),GUIContent("10",berriesIcon));
			
			if (GUI.Button(Rect(0,310,80,20),"Armor"))
				craftItem("armor","leather",5);
			GUI.Label (Rect (85, 311, 100, 20),GUIContent("5",leatherIcon));
			
			if (GUI.Button(Rect(0,335,80,20),"Stone Axe"))
				craftItem("stoneAxe","woodShaft",3, "sharpenedStone", 5);
			GUI.Label (Rect (85, 336, 100, 20),GUIContent("3",woodShaftIcon));
			GUI.Label (Rect (120, 336, 100, 20),GUIContent("5",sharpenedStoneIcon));
			GUI.EndScrollView();
			GUI.Label(Rect (300, 20, 300, 200),alertText);

		//consumables
		if(berries>0){
			if (GUI.Button(Rect(230,y-40,30,30),berriesIcon))
				eatBerries();
			}
		if(meat>0){
			if (GUI.Button(Rect(280,y-40,30,30),meatIcon))
				eatRawMeat();
		}
		if(cookedMeat>0){
			if (GUI.Button(Rect(330,y-40,30,30),cookedMeatIcon))
				eatMeat();
		}
		if(healingHerb>0){
			if (GUI.Button(Rect(380,y-40,30,30),healingHerbIcon))
				eatHealingHerb();
		}
	
	}
	//gameOver
	else if (gameLost == true)
	{
		PlayerPrefs.SetInt("TimeLived",timer);
		Application.LoadLevel("gameEnd");	
	}
	else if (gameWin == true){
	  GUI.Label(Rect(100,100,500,500), "You Win - have a lolipop");	
	}
	
	GUI.color = Color(0,0,0,0);
	if (Input.GetMouseButtonUp(0)) {
		GameStart.didClickGui = true;
	}
	if(GUI.Button(Rect(0, 0, x, y), "")) {
		GameStart.didClickGui = false;
	}
	player.FindMovingTarget();
	GUI.color = Color(1,1,1,1);
}


function Update () {
	if(gameLost == false){
		timer += Time.deltaTime;
	}
	//are you dead?
	if(health <=0){
		gameLost = true;
	}
	//update conditions
	conditionCheck();
	if(conditionCheck("Freezing")){
		hunger -= .001;
		health -= .001;	
	}
	if(conditionCheck("Starving")){
		health -= .001;
	}
	//health and hunger updater
	//spawn new world objects
	//hunger and health shouldnt be more than 100 or less than 0
	if(hunger> 100){
		hunger = 100;
	}
	if(health> 100){
		health = 100;
	}
	if(hunger <0){
		hunger = 0;
	}
	
}

function energyCountDown(){
	hunger -= 1;
}

function alertTextReset(){
	alertText = "";	
}

function turnCounterUpdate(){
	turnCounter +=1;
}

function conditionCheck(){
	if(turnCounter > turnsToCold&& conditionCheck("Cold") != true){
		conditionList.Add("Cold");
		removeCondition("Healthy");
		updateConditions();
	}
	else if(turnCounter > turnsToCold + turnsToFreezing && conditionCheck("Freezing") != true){
		conditionList.Add("Freezing");
		removeCondition("Healthy");
		removeCondition("Cold");
		updateConditions();
	}
	if(hunger == 0 && conditionCheck("Starving") != true){
		conditionList.Add("Starving");
		updateConditions();
	}
	else{
		if(health >= 76 && conditionCheck("Healthy") != true)
		{
			conditionList.Add("Healthy");
			updateConditions();
		}
		else if(health < 76 && health > 24 && conditionCheck("Fair Health") != true)
		{
			conditionList.Add("Fair Health");
			removeCondition("Healthy");
			updateConditions();
		}
		else if(health < 25 && conditionCheck("Injured") != true)
		{
			conditionList.Add("Injured");
			removeCondition("Fair Health");
			removeCondition("Healthy");
			updateConditions();
		}	
	}
	if(armor>0){
		removeCondition("Freezing");
		removeCondition("Cold");
		}
	if(clothRags>0){
		turnsToCold = 60;
	}
}



function eatBerries(){
 if(berries>0){
	hunger +=5;
	berries -=1;
	alertText = "5 Hunger Gained";
	}
}

function eatRawMeat(){
	meat --;
	hunger += 25;
	health -= 15;
	alertText = "15 Health Lost - 25 Hunger Gained";
}

function eatMeat(){
	cookedMeat --;
	hunger += 30;
	health += 25;
	alertText = "30 Hunger Gained - 25 Health Gained";
}

function eatHealingHerb(){
	healingHerb --;
	hunger +=10;
	health +=10;
	alertText = "10 Hunger Gained - 10 Health Gained";
}

	
function craftItem(result:String,item:String, amount:int, item2:String, amount2:int){
	var rField = typeof(GameStart).GetField(result);
	var iField = typeof(GameStart).GetField(item);
	var i2Field = typeof(GameStart).GetField(item2);
	var rslt :int = rField.GetValue(this);
	var itm :int = iField.GetValue(this);
	var itm2 :int = i2Field.GetValue(this);
	if (itm > amount && itm2 > amount2){
		rField.SetValue(this, rslt + 1)	;
		iField.SetValue(this, itm - amount);
		i2Field.SetValue(this, itm2 - amount2);
		alertEvent(result.GetType().Name + " Crafted");
	}
	else{
		alertText = "Not Enough Resource";
	}
	updateDPS();
	return result;

}

function craftItem(result:String,item:String, amount:int){
	var rField = typeof(GameStart).GetField(result);
	var iField = typeof(GameStart).GetField(item);
	var rslt :int = rField.GetValue(this);
	var itm :int = iField.GetValue(this);
	if (itm > amount){
		rField.SetValue(this, rslt + 1)	;
		iField.SetValue(this, itm - amount);
		alertEvent(result.GetType().Name + " Crafted");
	}
	else{
		alertText = "Not Enough Resource";
	}
	updateDPS();
	return result;
}
				
function craftCampfire(){
	if(wood>10 && rock>5 ){
		Instantiate(campfireObject, transform.position, transform.rotation);
		removeCondition("Cold");
		removeCondition("Freezing");
		turnCounter = 0;
		wood -=20;
		alertEvent("Campfire Crafted and Placed \n Exploring will leave it behind");
	}
	else{
	alertEvent("Not Enough Resources");
	}
}

function updateDPS(){
	if(axe != 0)
		dps = 5;
 	if(pickAxe != 0)
 		dps = 5;
 	if(stoneAxe != 0)
 		dps = 15;
 	if(knife != 0)
 		dps = 20;
 	if(spear != 0)
 		dps = 30;
}

function alertEvent(text:String){
	alertText = text;
}

function removeCondition(item: String){
	for(var i =0; i<conditionList.length; i++){
	if(conditionList[i] == item){
		conditionList.RemoveAt(i);
		updateConditions();
	}
	}
}

function updateConditions(){
	conditionString = "";
	for(var i =0; i<conditionList.length; i++){
	conditionString += "\n " + conditionList[i];
	}
}

function conditionCheck(item: String)
{
	for(var i =0; i<conditionList.length; i++){
		if(conditionList[i] == item){
			return true;
		}
	}
	return false;
}

function clearConditions(){
	conditionList = new Array();
}

function canAttack(pos: Vector3){
	if(Vector3.Distance(this.transform.position, pos)<300){
		return true;
	}
	else{
		return false;
	}
}

