#pragma strict
 var health = 100;
 var hunger = 100;
 var alert = false;
 var alertText = "";
 var timer = 0.0;

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
 var dps = 5;
 var enemyName = "";
 var enemyHealth = 0;

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


function Start () {
} 

function OnGUI() {
	GUI.Label(Rect(0,0,100,100), "Time Survived: " + timer);
	if(gameLost == false && gameWin == false){
		//status bars
		GUI.Box(Rect(10,5,100,30),"Health:"+health);	
		GUI.Box(Rect(10,40,100,30),"Hunger:"+hunger);	
			 
		//inventory 
		GUI.Box (Rect (120, 80, 80, 20),"Wood: "+ wood);
		GUI.Box (Rect (120, 110, 80, 20),"Stone: "+ stone);
		GUI.Box (Rect (120, 140, 80, 20),"Berries: "+ berries);
		GUI.Box (Rect (120, 170, 80, 20),"Rock: "+ rock);
		GUI.Box (Rect (120, 200, 80, 20),"Meat: "+ meat);
		GUI.Box (Rect (120, 230, 80, 20),"Hides: "+ hide);
		GUI.Box (Rect (120, 260, 80, 20),"DPS: "+ dps);
		
		GUI.Box (Rect (10, 80, 100, 250),"Inventory:"+ inventoryString);
		GUI.Box (Rect (500, 210, 100, 100),"Tip: "+ tip);
		
		//world gathering
		if(isEnemy == false){
			if(spawner > chanceForRabbit && !rabbitTry && spawner < chanceForDeer)
				if (GUI.Button(Rect(305,135,50,50),"Rabbit"))
					catchRabbit();
			if(spawner > chanceForDeer && !deerTry && spawner< chanceForWolf)
				if (GUI.Button(Rect(360,135,50,50),"Deer"))
					catchDeer();
			if (GUI.Button(Rect(280,280,100,50),"Explore"))
				{
					if(hasCampfire){
						removeItem("Campfire");
						hasCampfire = false;
						updateInventory();
					}
					spawnWorld();
					hunger -= hungerPerExplore;
					updateInventory();
					if(conditionCheck("Healthy")){
						health ++;
					}
					if(conditionCheck("Injured")){
						health --;
					}
					barUpdate();
					tip = "";
				}
				GUI.Label (Rect (282, 280, 100, 20),""+ spawner);
		}
		if(isEnemy == true){
			GUI.Label (Rect (270, 220, 100, 50)," "+ enemyName + "\n Health: " + enemyHealth);
			if (GUI.Button(Rect(370,190,45,45),"Fight"))
				attackEnemy();
			if (GUI.Button(Rect(370,240,45,45),"Run"))
				escape();
		}	
		if(isEnemy == false){	
			//consumption / crafting
			if (GUI.Button(Rect(500,10,100,20),"Eat Berries"))
				eatBerries();
			GUI.Label (Rect (605, 11, 100, 20),"1 Berry");
			if (GUI.Button(Rect(500,35,100,20),"Craft Axe"))
				craftAxe();
			GUI.Label (Rect (605, 36, 100, 20),"10W + 5S");
			if (GUI.Button(Rect(500,60,100,20),"Craft Pickaxe"))
				craftPickAxe();
			GUI.Label (Rect (605, 61, 100, 20),"20W + 20S");
			if (GUI.Button(Rect(500,85,100,20),"Craft Knife"))
				craftKnife();
			GUI.Label (Rect (605, 86, 100, 20),"100W + 40S");
			if (GUI.Button(Rect(500,110,100,20),"Craft Spear"))
				craftSpear();
			GUI.Label (Rect (605, 111, 100, 20),"200W + 200S");
			
			if (GUI.Button(Rect(500,135,100,20),"Craft Campfire"))
				craftCampfire();
			GUI.Label (Rect (605, 136, 100, 20),"20W, 1R");
			if (GUI.Button(Rect(500,160,100,20),"Cook Meat"))
				cookMeat();
			GUI.Label (Rect (605, 161, 100, 20),"1 Fire, 3 Meat");
			if (GUI.Button(Rect(500,185,100,20),"Craft Clothing"))
				craftClothing();
			GUI.Label (Rect (605, 186, 100, 20),"5 Hide");
		}
		else if(alert){
			GUI.Label(Rect (300, 20, 100, 50),alertText);
		}
		//conditions
		GUI.Box(Rect(120, 4, 80, 70), "Condition: \n" + conditionString);	
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
	if(isEnemy == true){
	enemyDamage();
	}
}

function catchDeer(){
	deerTry = true;
	if(hasSpear){
		meat += 20;
		hide +=5;
		removeItem("Spear");
		hunger -= hungerPerCollect;
		alertEvent("Deer Caught!");
	}
	else{
		tip = "Try crafting a \n spear to kill \n deer";
		hunger -= hungerPerCollect;
	}
	if(isEnemy == true){
	enemyDamage();
	}
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

function enemyDamage(){
	if(enemyName == "Bear")
	{
		health -= bearDPS;
		clearConditions();
		hunger -= hungerPerAttack;
		alertEvent(bearDPS + " Health Lost");
	}
	else{
		health -= wolfDPS;
		clearConditions();
		hunger -= hungerPerAttack;
		alertEvent(wolfDPS + " Health Lost");
	}
}

function attackEnemy(){
	if(enemyName == "Bear")
	{
		enemyHealth -= dps;
		health -= bearDPS;
		clearConditions();
		alertEvent(bearDPS + " Health Lost");
		hunger -= hungerPerAttack;
	}
	else{
		enemyHealth -= dps;
		health -= wolfDPS;
		clearConditions();
		alertEvent(wolfDPS + " Health Lost");
		hunger -= hungerPerAttack;
	}
	
	if(enemyHealth <=0){
		isEnemy = false;
		if(enemyName == "Bear")
		{
			gameWin = true;
		}
		else{
			meat += Random.Range(3,12);
			hide += Random.Range(3,12);
		}
	}
}
function escape(){
	if(enemyName == "Bear")
	{
		if(Random.value < chanceToEscapeBear){
			isEnemy = false;
			spawnWorld();
			hunger -= hungerPerRun;
		}
		else{
			health -= bearDPS;
			clearConditions();
			alertText = bearDPS + " Health Lost";
			alert = true;
			hunger -= hungerPerRun;
		}
	}
	else{
		if(Random.value < chanceToEscapeWolf){
			isEnemy = false;
			spawnWorld();
			hunger -= hungerPerRun;
		}
		else{
			health -= wolfDPS;
			clearConditions();
			alertText = wolfDPS + " Health Lost";
			alert = true;
			hunger -= hungerPerRun;
		}
	}
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


