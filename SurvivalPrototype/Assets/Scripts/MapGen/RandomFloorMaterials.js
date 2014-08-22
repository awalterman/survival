#pragma strict

public var materialPossibilities : Material[];

function Start() {
	for (var i = 0; i < transform.childCount; i++) {
		var obj = transform.GetChild(i);
		obj.renderer.material = materialPossibilities[Random.Range(0, materialPossibilities.length)];
	}
}
