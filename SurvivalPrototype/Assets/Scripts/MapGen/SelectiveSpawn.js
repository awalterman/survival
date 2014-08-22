#pragma strict

public var spawnChance : float = 50;

function Start() {
	if (Random.Range(0, 100) > spawnChance) {
		GameObject.Destroy(gameObject);
	}
}
