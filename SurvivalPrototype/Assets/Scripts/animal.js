#pragma strict

public var hp : float = 100;
public var damage : float = 10;
public var isDangerous : boolean = true;
public var targetRange : float = 10;
public var attackRange : float = 1;
public var walkSpeed : float = 1;
public var runSpeed : float = 2;
public var attackPace : float = 100;

//var animator : Animator;
var player : GameObject;
var lastAttackTime : float;

// Animation states
//var dieStateHash : int = Animator.StringToHash("dead");

function Start () {
//	animator = GetComponent.<Animator>();
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	if (isInPlayerRange() && isDangerous) {
		if (isInAttackRange()) {
			tryToAttack();
		} else {
			moveTowardsPlayer();
		}
	} else {
		
	}
}

function isInPlayerRange () {
	return (distanceFromPlayer() <= targetRange);
}

function isInAttackRange () {
	return (distanceFromPlayer() <= attackRange);
}

function distanceFromPlayer () {
	return Vector3.Distance(transform.position, player.transform.position);
}

function moveTowardsPlayer () {
	// do movement animation
	animation.CrossFade("sprint");
	transform.LookAt(player.transform);
	transform.position = Vector3.MoveTowards(transform.position, player.transform.position, runSpeed * Time.deltaTime);
}

function tryToAttack () {
	if (canAttack()) {
		Debug.Log("here");
		lastAttackTime = Time.time * 1000;
		animation.CrossFade("crouch");
		// do attack animation
	} else {
		// do idle angry animation
		animation.CrossFade("jump");
	}
}

function canAttack () {
	if (!isDangerous) {
		return false;
	}
	return (((Time.time * 1000) - lastAttackTime) >= attackPace);
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
//	animator.SetTrigger(dieStateHash);
	animation.Play("die");
	Destroy(this.gameObject, 2);
}

