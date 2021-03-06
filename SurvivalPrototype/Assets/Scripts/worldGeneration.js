public var tree: GameObject;
public var stone: GameObject;
public var rock: GameObject;
public var berries: GameObject;
public var leaves : GameObject;

public var berryChance = 0.1;
public var treeChance = 0.3;
public var stoneChance = 0.2;
public var rockChance = 0.1;
public var leafChange = 0.1;

public var worldSizeX = 100;
public var worldSizeY = 100;

function Start () {
	var totalChance = berryChance + treeChance + stoneChance + rockChance;
	for(var i = 5; i< worldSizeX; i+=3 ){
		for(var j = 5; j<worldSizeY;j+=3){
			var value = Random.value;
			var obj:GameObject = null;
			if(value< 1 - totalChance){
				
			}
			else if (value< (1-totalChance) + berryChance){
				obj = GameObject.Instantiate (berries, Vector3(i+Random.Range(-1.0,1.0), 0, j+Random.Range(-1.0,1.0)), Quaternion.Euler(0,0,0));
			}
			else if (value< (1-totalChance) + berryChance + treeChance){
				obj = GameObject.Instantiate (tree, Vector3(i+Random.Range(-1.0,1.0), 0, j+Random.Range(-1.0,1.0)), Quaternion.Euler(0,0,0));
			}
			else if (value< (1-totalChance) + berryChance + treeChance + stoneChance){
				obj = GameObject.Instantiate (stone, Vector3(i+Random.Range(-1.0,1.0), 0, j+Random.Range(-1.0,1.0)), Quaternion.Euler(0,0,0));
			}
			else if (value< (1-totalChance) + berryChance + treeChance + stoneChance+ rockChance){
				obj = GameObject.Instantiate (rock, Vector3(i+Random.Range(-1.0,1.0), 0, j+Random.Range(-1.0,1.0)), Quaternion.Euler(0,0,0));
			}
			else if (value < (1 - totalChance) + berryChance + treeChance + stoneChance + rockChance + leafChange) {
				obj = GameObject.Instantiate (leaves, Vector3(i + Random.Range(-1.0, 1.0), 0, j + Random.Range(-1.0, 1.0)), Quaternion.Euler(0, 0, 0));
			}
			
			if (obj) {
				obj.transform.parent = transform;
			}
		}
	}
}



