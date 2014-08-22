#pragma strict

public var hp : float = 100;
public var damage : float = 10;
public var isDangerous : boolean = true;
public var targetRange : float = 10;
public var attackRange : float = 1;
public var walkSpeed : float = 1;
public var runSpeed : float = 2;
public var attackPace : float = 100;
public var viewAngle : float = 35;
public var difficultyLevel : int = 1;
public var maxChaseDistance : float = 30;
public var maxRoamDistance : float = 5; // For not dangerous creatures, this is max flee radius
public var animalFreeWaitTimeLoop : int = 50;
public var animalFreeRoamTimeLoop : int = 500;
public var fleeTimeLoop : int = 2000;

public var idleAnimations : String[];
public var attackAnimation : String[];
public var angryAnimation : String[];
public var walkAnimation : String[];
public var runAnimation : String[];
public var deathAnimation : String[];
private var playerSource: GameStart;


var player : GameObject;
var lastAttackTime : float;
var isAttacking : boolean;
var isFleeing : boolean;

private var initialPosition : Vector3;
private var waitingLoop : int;
private var runningLoop : int;
private var fleeingLoop : int;
private var currentAnimation : AnimationTypes;

enum AnimationTypes {
	IDLE,
	WALK,
	RUN,
	ATTACK,
	ANGRY,
	DEAD
}

function Start () {
	initialPosition = transform.position;
	player = GameObject.FindGameObjectWithTag("Player");
	isAttacking = false;
	playerSource = Camera.main.GetComponent("GameStart");
	waitingLoop = animalFreeWaitTimeLoop;
	runningLoop = animalFreeRoamTimeLoop;
}

function Update () {
	if (isInPlayerRange() && isInLineOfSight()) {
		if (isDangerous) {
			isAttacking = true;
			if (isInAttackRange()) {
				tryToAttack();
			} else {
				moveTowardsPlayer();
			}
		} else {
			tryToFlee();
		}
	} else if (isInAttackRange()){
		if (isDangerous) {
			isAttacking = true;
			tryToAttack();
		} else {
			tryToFlee();
		}
	} else {
		isAttacking = false;
		isFleeing = false;
		roamAroundLazy();
	}
}

function tryToFlee () {
	isFleeing = true;
	if (fleeingLoop == 0) {
		fleeingLoop = fleeTimeLoop;
	}
	if(Random.Range(0,9) > 7) {
		transform.Rotate(0, runSpeed * 5 * Time.deltaTime, 0);
	} else {
		var rayDirection = player.transform.position - transform.position;
		var angle = Vector3.Angle(transform.forward, rayDirection);
		if (Mathf.Abs(angle) < 90) {
			var	lookRotation = Quaternion.LookRotation(player.transform.forward);
			transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, Time.deltaTime * runSpeed * 5);
		}
		var distanceToMove = transform.forward * runSpeed * Time.deltaTime;
		var newPossiblePosition = Vector3.MoveTowards(transform.position, transform.position + distanceToMove, runSpeed);
		playAnimation(AnimationTypes.RUN);
		transform.position = newPossiblePosition;
	}
	fleeingLoop--;
	if (fleeingLoop <= 0 || !isInPlayerRange()) {
		fleeingLoop = 0;
		isFleeing = false;
	}
}

function rotateToInitialPoint () {
  	var direction = (initialPosition - transform.position).normalized;
	var	lookRotation = Quaternion.LookRotation(direction);
	transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, Time.deltaTime * walkSpeed * 5);
}

function OnCollisionEnter (col : Collision) {
	rotateToInitialPoint();
}

function roamAroundLazy () {
	if (!isAnimalInsideBoundaryRadius(transform.position, maxRoamDistance)) {
		rotateToInitialPoint();
		playAnimation(AnimationTypes.WALK);
		transform.position = Vector3.MoveTowards(transform.position, initialPosition, walkSpeed * Time.deltaTime);
		return;
	}
	if (waitingLoop > 0) {
		waitingLoop--;
		return;
	}
	if (runningLoop > 0 || Random.Range(0,4) < 1) {
		if (runningLoop > 0) {
			runningLoop --;
		} else {
			runningLoop = animalFreeRoamTimeLoop;
		}
		if(Random.Range(0,9) > 6) {
			transform.Rotate(0, walkSpeed*Time.deltaTime, 0);
		} else {
			var distanceToMove = transform.forward * walkSpeed * Time.deltaTime;
			var newPossiblePosition = Vector3.MoveTowards(transform.position, transform.position + distanceToMove, walkSpeed);
			var xDistRoamed = Mathf.Abs(newPossiblePosition.x - initialPosition.x);
			var zDistRoamed = Mathf.Abs(newPossiblePosition.z - initialPosition.z);
			var dist = Mathf.Sqrt(Mathf.Pow(xDistRoamed,2)+Mathf.Pow(zDistRoamed,2));
			playAnimation(AnimationTypes.WALK);
			if (isAnimalInsideBoundaryRadius(newPossiblePosition, maxRoamDistance)) {
				transform.position = newPossiblePosition;
			} else {
				rotateToInitialPoint();
			}
		}
	} else {
		waitingLoop = animalFreeWaitTimeLoop;
		playAnimation(AnimationTypes.IDLE);
	}
}

function isAnimalInsideBoundaryRadius (curPos:Vector3, maxDist:float) {
	var xDistRoamed = Mathf.Abs(curPos.x - initialPosition.x);
	var zDistRoamed = Mathf.Abs(curPos.z - initialPosition.z);
	var dist = Mathf.Sqrt(Mathf.Pow(xDistRoamed,2)+Mathf.Pow(zDistRoamed,2));
	return (dist <= maxDist);
}

function isInPlayerRange () {
	return (distanceFromPlayer() <= targetRange && isAnimalInsideBoundaryRadius(transform.position, maxChaseDistance));
}

function isInLineOfSight () {
	if (isAttacking || isFleeing) {
		return true;
	}
	var hit : RaycastHit;
	var rayDirection = player.transform.position - transform.position;
	if (Physics.Raycast(transform.position, rayDirection, hit)) {
//		Debug.Log(hit.collider.gameObject.name);
	 	if (hit.transform == player.transform) {
	 		return isFacingPlayer();
	 	}
	}
	return isFacingPlayer();
}

function isFacingPlayer () {
	var rayDirection = player.transform.position - transform.position;
	var angle = Vector3.Angle(transform.forward, rayDirection);
	return (angle < viewAngle);
}

function isInAttackRange () {
	return (distanceFromPlayer() <= attackRange && isAnimalInsideBoundaryRadius(transform.position, maxChaseDistance));
}

function distanceFromPlayer () {
	return Vector3.Distance(transform.position, player.transform.position);
}

function moveTowardsPlayer () {
	playAnimation(AnimationTypes.RUN);
	transform.LookAt(player.transform);
	transform.position = Vector3.MoveTowards(transform.position, player.transform.position, runSpeed * Time.deltaTime);
}

function tryToAttack () {
	if (canAttack()) {
		if (!isFacingPlayer()) {
			transform.LookAt(player.transform);
		}
		lastAttackTime = Time.time * 1000;
		playAnimation(AnimationTypes.ATTACK);
		playerSource.health -= damage;
	} else {
	}
}

function canAttack () {
	if (!isDangerous) {
		return false;
	}
	return (((Time.time * 1000) - lastAttackTime) >= attackPace);
}

function OnMouseDown() {
	if(playerSource.canAttack(this.transform.position)){
		player.GetComponent.<Player>().playerState= PlayerStatus.ATTACK;
		reduceHP(playerSource.dps);
		playerSource.energyCountDown();
	}
}

public function reduceHP (damage:float) {
	hp -= damage;
	Debug.Log(hp);
	// do hurt damage
	if (hp <= 0) {
		animalDidDie();
	}
}

function animalDidDie () {
	// update player that the animal has died
	Debug.Log("enemy died");
	playAnimation(AnimationTypes.DEAD);
	Destroy(this.gameObject, 0.5);
}

function playAnimation(animationType:AnimationTypes) {
	if (currentAnimation == animationType) {
		return;
	}
	currentAnimation = animationType;
	switch(animationType) {
		case AnimationTypes.IDLE:
			playAnimationFromList(idleAnimations);
		break;
		case AnimationTypes.WALK:
			playAnimationFromList(walkAnimation);		
		break;
		case AnimationTypes.RUN:
			playAnimationFromList(runAnimation);
		break;
		case AnimationTypes.ANGRY:
			playAnimationFromList(angryAnimation);
		break;
		case AnimationTypes.ATTACK:
			playAnimationFromList(attackAnimation);
		break;
		case AnimationTypes.DEAD:
			playAnimationFromList(deathAnimation);
		break;
		default:
			playAnimationFromList(idleAnimations);
		break;
	}
}

function playAnimationFromList (animations:String[]) {
	var index = Random.Range(0, animations.Length);
	var animationName = animations[index];
//	Debug.Log(animationName);
	animation.CrossFade(animationName);
}
