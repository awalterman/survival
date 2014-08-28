using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class MapGenerator : MonoBehaviour {
	public GameObject[] tilePrefabs;
	public bool allowRandom = true;
	public bool debugAllowRespawn = false;

	private GameObject player;

	private float tileDim = 1.0f;
	private List<GameObject> spawnedTiles = new List<GameObject>();
	private int[,] madeMap = {
		{ 0, 0, 1, 3, 2, 0, 2, 2, 3, 2, 0, 0, 0, 0, 0 },
		{ 0, 1, 1, 3, 3, 2, 2, 3, 3, 3, 2, 2, 1, 0, 0 },
		{ 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 0, 0 },
		{ 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0 },
		{ 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0 },
		{ 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 0, 0 },
		{ 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0 },
		{ 1, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 1 },
		{ 1, 2, 3, 2, 3, 3, 3, 3, 3, 2, 2, 3, 2, 2, 1 },
		{ 1, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1 },
		{ 1, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1 },
		{ 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1 },
		{ 1, 2, 2, 2, 3, 3, 2, 3, 2, 3, 3, 2, 2, 1, 0 },
		{ 0, 0, 2, 2, 2, 3, 2, 0, 2, 2, 2, 1, 1, 0, 0 },
	};

	void Start() {
		player = GameObject.Find("Player");
		tileDim = tilePrefabs[0].transform.localScale.x;
		PermuteMap();
	}
	
	void Update() {
		if (debugAllowRespawn && Input.GetKeyDown(UnityEngine.KeyCode.Space)) {
			PermuteMap();
		}
	}

	private class TileSpawnData {
		public GameObject tile;
		public int x;
		public int y;

		public TileSpawnData(GameObject tile, int x, int y) {
			this.tile = tile;
			this.x = x;
			this.y = y;
		}
	}

	private class PathFindNode {
		public TileSpawnData tile;
		public PathFindNode parent;
		public PathFindNode(TileSpawnData t, PathFindNode p) {
			tile = t;
			parent = p;
		}
	}

	private bool ContainsTile(List<PathFindNode> list, TileSpawnData t) {
		for (var i = 0; i < list.Count; i++) {
			var n = list[i];
			if (n.tile == t) {
				return true;
			}
		}
		return false;
	}

	private void Shuffle(ref TileSpawnData[] list) {
		for (var i = 0; i < list.Length - 1; i++) {
			var t = list[i];
			var r = Random.Range(i, list.Length);
			list[i] = list[r];
			list[r] = t;
		}
	}

	private List<TileSpawnData> FindPath(TileSpawnData start, TileSpawnData end, TileSpawnData[,] tileMap) {
		int w = tileMap.GetLength(0);
		int h = tileMap.GetLength(1);
		var toCheck = new List<PathFindNode>();
		var checkedList = new List<PathFindNode>();
		toCheck.Add(new PathFindNode(start, null));
		while (toCheck.Count > 0) {
			var t = toCheck[0];
			toCheck.RemoveAt(0);
			checkedList.Add(t);

			if (t.tile == end) {
				var retList = new List<TileSpawnData>();
				var cur = t;
				while (cur != null) {
					retList.Add(cur.tile);
					cur = cur.parent;
				}
				return retList;
			}

			var x = t.tile.x;
			var y = t.tile.y;
			TileSpawnData[] neighbors = {
				x - 1 >= 0 ? tileMap[x - 1, y] : null,
				y - 1 >= 0 ? tileMap[x, y - 1] : null,
				x + 1 < w ? tileMap[x + 1, y] : null,
				y + 1 < h ? tileMap[x, y + 1] : null
			};
			Shuffle(ref neighbors);
			for (var i = 0; i < neighbors.Length; i++) {
				var n = neighbors[i];
				if (n != null && !ContainsTile(checkedList, n)) {
					toCheck.Add(new PathFindNode(n, t));
				}
			}
		}
		return new List<TileSpawnData>();
	}

	private void PermuteMap() {
		// Clean up old map
		foreach (GameObject tile in spawnedTiles) {
			GameObject.Destroy(tile);
		}
		spawnedTiles.Clear();
		
		// Create new map
		int w = madeMap.GetLength(0);
		int h = madeMap.GetLength(1);
		var tileMap = new TileSpawnData[w, h];
		var i = 0;
		var j = 0;
		for (i = 0; i < w; i++) {
			for (j = 0; j < h; j++) {
				GameObject newTile = null;
				var tileVal = madeMap[i, j];
				var randSpawn = Random.value > 0.5;
				if (tileVal == 3 ||
						(tileVal == 2 && (!allowRandom || randSpawn)) ||
						tileVal == 1 && allowRandom && randSpawn) {
					var z = -(i - w/2);
					var x = j - h/2;
					newTile = GameObject.Instantiate(tilePrefabs[Random.Range(0, tilePrefabs.Length)]) as GameObject;
					newTile.name += " (" + i + ", " + j + ")";
					newTile.transform.parent = transform;
					newTile.transform.position = new Vector3(x * tileDim, 0, z * tileDim) + transform.position;
					newTile.GetComponent<MapTile>().SetDoors(0);
				}
				if (newTile) {
					spawnedTiles.Add(newTile);
					tileMap[i,j] = new TileSpawnData(newTile, i, j);
				}
			}
		}

		// Connect paths
		var openSet = new List<TileSpawnData>();
		int cx = 0;
		int cy = 0;
		for (i = 0; i < w; i++) {
			for (j = 0; j < h; j++) {
				if (tileMap[i,j] != null) {
					openSet.Add(tileMap[i,j]);
					cx += i;
					cy += j;
				}
			}
		}
		cx = Mathf.RoundToInt((float)cx / spawnedTiles.Count);
		cy = Mathf.RoundToInt((float)cy / spawnedTiles.Count);

		var center = tileMap[cx, cy];
		while (center == null && spawnedTiles.Count > 0) {
			center = tileMap[Random.Range(0, w), Random.Range(0, h)];
		}
		// var p = center.tile.transform.position;
		// Debug.DrawLine(p, p + Vector3(1, 1, 1), Color.red, 1000, false);
		while (openSet.Count > 0) {
			var index = Random.Range(0, openSet.Count);
			var tile = openSet[index];
			openSet.RemoveAt(index);
			var path = FindPath(tile, center, tileMap);
			while (path.Count > 1) {
				var fst = path[0];
				var snd = path[1];
				path.RemoveAt(0);
				var dy = snd.x - fst.x;
				var dx = snd.y - fst.y;
				Dir d1;
				Dir d2;
				if (dx == -1) {
					d1 = Dir.West;
					d2 = Dir.East;
				}
				else if (dx == 1) {
					d1 = Dir.East;
					d2 = Dir.West;
				}
				else if (dy == -1) {
					d1 = Dir.North;
					d2 = Dir.South;
				}
				else { // if (dy == 1) {
					d1 = Dir.South;
					d2 = Dir.North;
				}
				// Debug.DrawLine(fst.tile.transform.position, snd.tile.transform.position, Color.white, 1000, false);
				fst.tile.GetComponent<MapTile>().OpenDoors(d1);
				snd.tile.GetComponent<MapTile>().OpenDoors(d2);
				openSet.Remove(fst);
			}
		}

		// Clean up redundant walls
		bool wasLast = false;
		// MapTile mt;
		for (j = 0; j < h; j++) {
			wasLast = false;
			for (i = 0; i < w; i++) {
				if (tileMap[i, j] != null) {
					var mt = tileMap[i,j].tile.GetComponent<MapTile>();
					if (wasLast) {
						mt.OpenDoors(Dir.North);
					}
					wasLast = (Dir.South & mt.GetDoors()) == 0;
				}
				else {
					wasLast = false;
				}
			}
		}
		for (i = 0; i < w; i++) {
			wasLast = false;
			for (j = 0; j < h; j++) {
				if (tileMap[i, j] != null) {
					var mt = tileMap[i,j].tile.GetComponent<MapTile>();
					if (wasLast) {
						mt.OpenDoors(Dir.West);
					}
					wasLast = (Dir.East & mt.GetDoors()) == 0;
				}
				else {
					wasLast = false;
				}
			}
		}

		if (player) {
			player.transform.position = center.tile.transform.position;
			player.transform.Translate(0, -player.transform.position.y, 0);
		}
	}
}
