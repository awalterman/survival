#pragma strict
private var health = 100;
private var hunger = 100;
private var alert = false;
private var alertText = "";

//resource counters
private var treeCounter = 0;
private var rockCounter = 0;
private var berriesCounter = 0;
private var stoneCounter = 0;

//turn counters
private var turnCounter = 0;
private var coldCounter = 0;
private var gameLost = false;
private var gameWin = false;

//conditions
private var conditionList = new Array();
private var conditionString = "";
private var turnsToCold = 15;
private var cold = false;

//resources
private var wood=0;
private var stone=0;
private var berries=0;
private var inventory = new Array ();
private var inventoryString = "";
private var tip = "";
private var rock = 0;
private var meat = 0;
private var hide = 0;
private var dps = 5;
private var enemyName = "";
private var enemyHealth = 0;

//items
private var hasAxe = false;
private var hasPickAxe = false;
private var hasKnife = false;
private var hasSpear = false;
private var hasCampfire = false;
private var rabbitTry = false;
private var deerTry = false;
private var isEnemy = false;

//world generation
private var spawner = 0;
private var chanceForBerry = 50;
private var chanceForTree = 20;
private var chanceForStone = 75;
private var chanceForRock = 40;
private var chanceForRabbit = 70;
private var chanceForDeer = 80;
private var chanceForWolf = 85;
private var chanceForBear = 95;
private var wolfHealth = 20;
private var bearHealth = 50;
private var chanceToEscapeWolf = .6;
private var chanceToEscapeBear = .8;
private var bearDPS = 25;
private var wolfDPS = 15;
private var hungerPerExplore = 4;
private var hungerPerCollect = 1;
private var hungerPerRun = 8;
private var hungerPerCraft = 2;
private var hungerPerAttack = 5;


function Start () {
} 

function OnGUI() {

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
		if(spawner > chanceForBerry && berriesCounter !=3)
			if (GUI.Button(Rect(250,80,50,50),"Berry"))
			{
				gatherBerries();
				berriesCounter +=1;
			}
		if(spawner > chanceForTree && treeCounter != 3)
			if (GUI.Button(Rect(305,80,50,50),"Tree"))
			{
				gatherWood();
				treeCounter +=1;
			}
		if(spawner > chanceForRock && rockCounter !=3)
			if (GUI.Button(Rect(360,80,50,50),"Rock"))
			{
				gatherRock();
				rockCounter +=1;
			}
		if(spawner > chanceForStone && stoneCounter != 3)
			if (GUI.Button(Rect(250,135,50,50),"Stone"))
			{
				gatherStone();
				stoneCounter +=1;
			}
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
					treeCounter = 0;
					rockCounter = 0;
					berriesCounter = 0;
					stoneCounter = 0;
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

function gatherBerries(){
	berries +=Random.Range(1,2);
	hunger -= hungerPerCollect;
	if(isEnemy == true){
	enemyDamage();
	}
}

function gatherRock(){
	rock +=1;
	hunger -= hungerPerCollect;
	if(isEnemy == true){
	enemyDamage();
	}
}

function eatBerries(){
 if(berries>0){
	hunger +=5;
	berries -=1;
	alertText = "5 Hunger Gained";
	alert = true;
	}
}
public function gatherWood(){
	if(itemCheck("Axe")){
	wood+= 3;
	}
	else{
	wood += 1;
	}
	hunger -= hungerPerCollect;
	if(isEnemy == true){
	enemyDamage();
	}
	}

function gatherStone(){
	if(itemCheck("PickAxe")){
	stone += 3;
	}
	else{
	stone +=1;
	}
	hunger -= hungerPerCollect;
	if(isEnemy == true){
	enemyDamage();
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


