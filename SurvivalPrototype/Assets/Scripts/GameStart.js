#pragma strict
 var health = 100;
 var hunger = 100;
 var alert = false;
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
 var turnsToCold = 15;
 var cold = false;

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

//items
 var hasAxe = false;
 var hasPickAxe = false;
 var hasKnife = false;
 var hasSpear = false;
 var hasCampfire = false;
 var rabbitTry = false;
 var deerTry = false;
 var isEnemy = false;

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
 var hungerPerExplore = 4;
 var hungerPerCollect = 1;
 var hungerPerRun = 8;
 var hungerPerCraft = 2;
 var hungerPerAttack = 5;

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

function Start () {
x= Screen.width;
y= Screen.height;
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
		GUI.DrawTexture(Rect(x-110,38,health,12),energyFill,ScaleMode.StretchToFill,true,10.0f);
				
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
			//consumption / crafting
			if (GUI.Button(Rect(0,10,80,20),"Eat Berries"))
				eatBerries();
			GUI.Label (Rect (85, 10, 100, 20),GUIContent("1", berriesIcon));
			
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
				craftItem("clothRags", "hides",10,"leaves",20);
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
				craftItem("leather","hides",2, "sharpenedStone", 1);
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

		if(alert){
			GUI.Label(Rect (300, 20, 100, 50),alertText);
		}
	
	}
	//gameOver
	else if (gameLost == true)
	{
	  GUI.Label(Rect(100,100,500,500), "YOU LOSE \n What to do if you find yourself stuck in a crack in the ground underneath a giant boulder you can't move, with no hope of rescue. Consider how lucky you are that life has been good to you so far. Alternatively, if life hasn't been good to you so far, which given your current circumstances seems more likely, consider how lucky you are that it won't be troubling you much longer");
	}
	else if (gameWin == true){
	  GUI.Label(Rect(100,100,500,500), "You Win - have a lolipop");	
	}
	
	//reset game
	if (GUI.Button(Rect(830,360,50,30),"Reset")){
			health = 100;
			hunger = 100;
			spawnWorld();
			wood = 0;
			rock = 0;
			stone = 0;
			meat = 0;
			hide = 0;
			berries = 0;
			gameLost = false;
			turnsToCold = 15;
			inventory = new Array();
			inventoryString = "";
			hasAxe = false;
			hasPickAxe = false;
			hasKnife = false;
			hasSpear = false;
			hasCampfire = false;
			rabbitTry = false;
			deerTry = false;
			isEnemy = false;
			dps = 5;
			cold = false;
			coldCounter = 0;
			turnCounter = 0;
			clearConditions();
	}
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

function conditionCheck(){
	if(turnCounter - coldCounter > (turnsToCold - 5) && conditionCheck("Cold") != true){
		conditionList.Add("Cold");
		updateConditions();
	}
	if(turnCounter - coldCounter > turnsToCold && conditionCheck("Freezing") != true){
		conditionList.Add("Freezing");
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
		else if(health < 76 && health > 50 && conditionCheck("Fair Health") != true)
		{
			conditionList.Add("Fair Health");
			updateConditions();
		}
		else if(health < 51 && conditionCheck("Injured") != true)
		{
			conditionList.Add("Injured");
			updateConditions();
		}	
	}	
}

function barUpdate()
{
	if(hunger != 0){
		alert = false;
		alertText = "";
	}
	else{
		health --;
		clearConditions();
	}
	if(conditionCheck("Freezing")){
		health --;	
		clearConditions();
	}
}


function spawnWorld(){
	spawner = Random.value*100;
	if(spawner> chanceForBear){
		isEnemy = true;
		enemyName = "Bear";
		enemyHealth = bearHealth;
	}
	if(spawner > chanceForWolf && spawner < chanceForBear){
		isEnemy = true;
		enemyName = "Wolf";
		enemyHealth = wolfHealth;
	}
	rabbitTry = false;
	deerTry = false;
	turnCounter ++;
}





function eatBerries(){
 if(berries>0){
	hunger +=5;
	berries -=1;
	alertText = "5 Hunger Gained";
	alert = true;
	}
}



function catchRabbit(){
	rabbitTry = true;
	if(itemCheck("Axe") || itemCheck("PickAxe") || itemCheck("Knife")){
		meat += 3;
		hide +=1;
		hunger -= hungerPerCollect;
		alertEvent("Rabbit Caught");
	}
	else if(Random.value > .5){
		meat += 3;
		hide +=1;
		hunger -= hungerPerCollect;
		alertEvent("Rabbit Caught");
	}
	else{
		tip = "Try crafting a \n weapon to catch \n zrabbits better";
		hunger -= hungerPerCollect;
	}
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
	return result;

}

function craftItem(result:String,item:String, amount:int){

//Debug.Log(result +"  " + item +"  " + amount);
	var rField = typeof(GameStart).GetField(result);
	var iField = typeof(GameStart).GetField(item);
	var rslt :int = rField.GetValue(this);
	var itm :int = iField.GetValue(this);
	if (itm > amount){
		rField.SetValue(this, rslt + 1)	;
		updateInventory();
		iField.SetValue(this, itm - amount);
		alertEvent(result.GetType().Name + " Crafted");
	}
	return result;
}
				
function craftAxe(){
	if(wood>=10 && stone>=5 && hasAxe == false){
		hasAxe = true;
		inventory.Add("Axe");
		updateInventory();
		wood -=10;
		stone -=5;
		dps = 10;
		hunger -= hungerPerCraft;
		alertEvent("Axe Crafted");
	}
		else{
	alertEvent("Not Enough Resources");
	}
}

function craftPickAxe(){
	if(wood>20 && stone>20 && hasPickAxe == false){
		hasPickAxe = true;
		inventory.Add("PickAxe");
		updateInventory();
		wood -=20;
		stone -=20;
		dps = 10;
		hunger -= hungerPerCraft;
		alertEvent("Pick Axe Crafted");
	}
		else{
	alertEvent("Not Enough Resources");
	}
}

function craftKnife(){
	if(wood>100 && stone>40 && hasKnife == false){
		hasKnife = true;
		inventory.Add( "Knife");
		updateInventory();
		wood -=100;
		stone -=40;
		dps = 30;
		hunger -= hungerPerCraft;
		alertEvent("Knife Crafted");
	}
		else{
	alertEvent("Not Enough Resources");
	}
}

function craftSpear(){
	if(wood>200 && stone>200 && hasSpear == false){
		hasSpear = true;
		inventory.Add("Spear");
		updateInventory();
		wood -=200;
		stone -=200;
		dps = 50;
		hunger -= hungerPerCraft;
		alertEvent("Spear Crafted");
	}
		else{
	alertEvent("Not Enough Resources");
	}
}

function craftCampfire(){
	if(wood>20 && rock>1 ){
		hasCampfire = true;
		inventory.Add("Campfire");
		updateInventory();
		wood -=20;
		cold = false;
		coldCounter = turnCounter;
		hunger -= hungerPerCraft;
		alertEvent("Campfire Crafted and Placed \n Exploring will leave it behind");
	}
	else{
	alertEvent("Not Enough Resources");
	}
}

function cookMeat(){
	if(hasCampfire && meat>=3){
		meat -=3;
		health +=10;
		clearConditions();
		hunger += 50;
		hunger -= hungerPerCraft;
		alertEvent("10 Health Gained \n 50 Hunger Gained");
	}
		else{
	alertEvent("Not Enough Resources");
	}
}

function craftClothing(){
	if(hide>5){
	hide -= 5;
	inventory.Add("Clothing");
	turnsToCold = 50;
	hunger -= hungerPerCraft;
	alertEvent("Clothing Crafted");
	}
	else{
	alertEvent("Not Enough Resources");
	}
}

function removeItem(item: String){
	for(var i =0; i<inventory.length; i++){
	if(inventory[i] == item){
		inventory.RemoveAt(i);
		updateInventory();
	}
	}
}

function updateInventory(){
	inventoryString = "";
	for(var i =0; i<inventory.length; i++){
	inventoryString += "\n " + inventory[i];
	}
}

function itemCheck(item: String)
{
	for(var i =0; i<inventory.length; i++){
		if(inventory[i] == item){
			return true;
		}
	}
	return false;
}




function alertEvent(text:String){
	alert = true;
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


