﻿#pragma strict
public var camera: GameObject;

enum PlayerStatus {
	IDLE,
	WALK,
	RUN,
	ATTACK,
	COLLECTING,
	DEAD
}

public var speed = 3;
public var rotationSpeed = 6;
public var rotationCutoff = 1;
public var spacing = 0.5;
public var targetPosition = Vector3(25, 0, 25);
public var targetDirection = Vector3(0,0,0);
public var collectPace : float = 500;
public var idleAnimations : String[];
public var walkAnimations : String[];
public var runAnimations : String[];
public var attackAnimations : String[];
public var collectingAnimations : String[];
public var deadAnimations : String[];
public var walkPingEffect : GameObject;

public var playerState = PlayerStatus.IDLE;
var lastCollectTime : float;

var cameraOffset : Vector3;
private var playerSource: GameStart;

function Start () {
	cameraOffset = Camera.main.transform.position;
	rigidbody.position = targetPosition;
   	Camera.main.transform.position = rigidbody.position + cameraOffset;
	playerSource = Camera.main.GetComponent("GameStart");
}

function FixedUpdate () {
	var isMoving : boolean;
	if (isCollecting()) {
		targetPosition = rigidbody.position;
	} else {
		if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow)) {
	       targetPosition.z += spacing;
	       isMoving = true;
	    }
	    if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow)) { 
	      	targetPosition.z -= spacing;
	     	isMoving = true; 
	    }
	    if (Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow)) {
	       targetPosition.x -= spacing;
	       isMoving = true;
	    }
	    if (Input.GetKeyDown(KeyCode.D)|| Input.GetKeyDown(KeyCode.RightArrow)) {
	       targetPosition.x += spacing;
	       isMoving = true;
	    }
	}

	moveTowardsTargetPosition();
	updateState();
	if (isMoving == true) {
		addMovePingEffect();
	}
	if(Vector3.Distance(targetPosition, transform.position) > 0.05) {
		playerSource.energyCountDown();
	}
}
function FindMovingTarget() {
	if (Input.GetMouseButtonUp (0) &&
			!GameStart.didClickGui &&
			!isCollecting()) {
		var hits: RaycastHit[];
		var ray: Ray;
		ray = (Camera.main.ScreenPointToRay(Input.mousePosition));
		hits = Physics.RaycastAll(ray);
		for (var i = 0; i < hits.length; i++) {
			var hit = hits[i];
			var obj = hit.transform.gameObject;

			if (obj.name.EndsWith("Floor")) {
				targetPosition = hit.point;
				addMovePingEffect();
			} else {
				obj.SendMessage("OnMouseDown", null, SendMessageOptions.DontRequireReceiver);
			}
		}
	}
}

function Update(){
	if(playerSource.conditionCheck("Freezing")){
		speed = 2.25;
	}
	else if(playerSource.conditionCheck("Cold")){
		speed = 2.55;
	}
	else{
		speed = 3.0;
	}
}

function OnCollisionEnter (col : Collision) {
	// print("Ran into object: " + col.transform.name);
	targetPosition = rigidbody.position;
	moveTowardsTargetPosition();
}

function OnCollisionStay (col : Collision) {
}

function OnCollisionExit(collisionInfo : Collision) {
}

function moveTowardsTargetPosition() {
	targetPosition = Vector3(targetPosition.x, 0, targetPosition.z);
	targetDirection = targetPosition - rigidbody.position;
	targetDirection = Vector3(targetDirection.x, 0, targetDirection.z);
	Debug.DrawLine(rigidbody.position, targetPosition);
	var distance = targetDirection.magnitude;
	if (distance > rotationCutoff) {
		var newDir = Vector3.RotateTowards(transform.forward, targetDirection, rotationSpeed * Time.deltaTime, 0);
		rigidbody.rotation = Quaternion.LookRotation(newDir);
	}
	rigidbody.position = Vector3.MoveTowards(rigidbody.position, targetPosition, speed * Time.deltaTime);
    Camera.main.transform.position = rigidbody.position + cameraOffset;
}

function updateState() {
	targetPosition = Vector3(targetPosition.x, 0, targetPosition.z);
	targetDirection = targetPosition - rigidbody.position;
	targetDirection = Vector3(targetDirection.x, 0, targetDirection.z);
	Debug.DrawLine(rigidbody.position, targetPosition);
	var moveDistance = targetDirection.magnitude;
	if (isCollecting()) {
		playerState = PlayerStatus.COLLECTING;
	} else if (moveDistance > 0.5) {
		if (playerSource.conditionCheck("Freezing") || playerSource.conditionCheck("Cold")) {
			playerState = PlayerStatus.WALK;
		} else {
			playerState = PlayerStatus.RUN;
		}
	} else {
		playerState = PlayerStatus.IDLE;
	}
	playAnimationForState(playerState);
}

function isCollecting() {
	return (Time.time * 1000 - lastCollectTime < collectPace);
}

public function hasCollected() {
	lastCollectTime = Time.time * 1000;
}

function playAnimationForState(state:PlayerStatus) {
	switch(state) {
		case PlayerStatus.IDLE:
			playAnimationFromList(idleAnimations);
			break;
		case PlayerStatus.WALK:
			playAnimationFromList(walkAnimations);
			break;
		case PlayerStatus.RUN:
			playAnimationFromList(runAnimations);
			break;
		case PlayerStatus.ATTACK:
			playAnimationFromList(attackAnimations);
			break;
		case PlayerStatus.COLLECTING:
			playAnimationFromList(collectingAnimations);
			break;
		case PlayerStatus.DEAD:
			playAnimationFromList(deadAnimations);
			break;
		default:
			playAnimationFromList(idleAnimations);
			break;
	}
}

function playAnimationFromList(animations:String[]) {
	var index = Random.Range(0, animations.Length);
	var animationName = animations[index];
	// Debug.Log("Player animation named " + animationName);
	animation.CrossFade(animationName);
}

function addMovePingEffect() {
	var particleObject : GameObject;
	particleObject = GameObject.Instantiate(walkPingEffect, Vector3(targetPosition.x, 1, targetPosition.z), Quaternion.Euler(90,0,0));
	particleObject.particleSystem.Play();
	
}