#pragma strict

public var spawnChance : float = 50;

function Start() {
	for (var i = transform.childCount - 1; i >= 0; i--) {
		if (Random.Range(0, 100) > spawnChance) {
			GameObject.Destroy(transform.GetChild(i).gameObject);
		}		
	}
}
