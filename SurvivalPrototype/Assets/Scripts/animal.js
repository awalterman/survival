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

enum AnimationTypes {
	IDLE,
	WALK,
	RUN,
	ATTACK,
	ANGRY,
	DEAD
}

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
	isAttacking = false;
	playerSource = Camera.main.GetComponent("GameStart");

}

function Update () {
	if (isInPlayerRange() && isDangerous && isInLineOfSight()) {
		isAttacking = true;
		if (isInAttackRange()) {
			tryToAttack();
		} else {
			moveTowardsPlayer();
		}
	} else if (isInAttackRange()){
		tryToAttack();
	} else {
		playAnimation(AnimationTypes.IDLE);
	}
}

function isInPlayerRange () {
	return (distanceFromPlayer() <= targetRange);
}

function isInLineOfSight () {
	if (isAttacking) {
		return true;
	}
	var hit : RaycastHit;
	var rayDirection = player.transform.position - transform.position;
	
	if (Physics.Raycast(transform.position, rayDirection, hit)) {
	
	 	if (hit.transform == player.transform) {
	 		return isFacingPlayer();
	 	}
	}
	return false;
}

function isFacingPlayer () {
	var rayDirection = player.transform.position - transform.position;
	var angle = Vector3.Angle(transform.forward, rayDirection);
	return (angle < viewAngle);
}

function isInAttackRange () {
	return (distanceFromPlayer() <= attackRange);
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
		// do idle angry animation
//		playAnimation(AnimationTypes.ANGRY);
	}
}

function canAttack () {
	if (!isDangerous) {
		return false;
	}
	return (((Time.time * 1000) - lastAttackTime) >= attackPace);
}

function OnMouseDown() {
	if(canAttack){
		reduceHP(playerSource.dps);
	}
}

public function reduceHP (damage:float) {
	hp -= damage;
	// do hurt damage
	if (hp <= 0) {
		animalDidDie();
	}
}

function animalDidDie () {
	// update player that the animal has died
	Debug.Log("enemy died");
	playAnimation(AnimationTypes.DEAD);
	Destroy(this.gameObject, 2);
}

function playAnimation(animationType:AnimationTypes) {
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
	animation.CrossFade(animationName);
}
