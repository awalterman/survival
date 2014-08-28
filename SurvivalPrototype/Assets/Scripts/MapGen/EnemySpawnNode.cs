using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class EnemySpawnNode : MonoBehaviour {
	public GameObject bunnyPrefab;
	public GameObject deerPrefab;
	public GameObject wolfPrefab;
	public GameObject bearPrefab;

	private const float kSpawnInterval = 15.0f;

	private float nextSpawnTime = 0.0f;
	private float timer = 0.0f;
	private int generation = 0;
	private List<GameObject> spawnedObjects = new List<GameObject>();

	private GameObject player;

	private const float kMinDist = 15.0f;
	private const float kMaxDist = 75.0f;

	void Start() {
		player = GameObject.Find("Player");
	}

	void Update() {
		timer += Time.deltaTime;
		if (timer >= nextSpawnTime) {
			var distFromPlayer = Vector3.Distance(transform.position, player.transform.position);
			if ((generation == 0 || Random.Range(0, 100) < SpawnChance())
					&& spawnedObjects.Count <= 2
					&& distFromPlayer > kMinDist && distFromPlayer < kMaxDist) {
				GameObject toSpawn;
				if (Random.Range(0, 100) < PassiveSpawnChance()) {
					if (Random.Range(0, 100) < HarderSpawnChance()) {
						toSpawn = deerPrefab;
					}
					else {
						toSpawn = bunnyPrefab;
					}
				}
				else {
					if (Random.Range(0, 100) < HarderSpawnChance()) {
						Debug.Log("bear");
						toSpawn = bearPrefab;
					}
					else {
						Debug.Log("wolf");
						toSpawn = wolfPrefab;
					}
				}
				GameObject spawned = GameObject.Instantiate(toSpawn, transform.position, Quaternion.identity) as GameObject;
				spawned.transform.parent = transform;
				spawnedObjects.Add(spawned);
			} else if (distFromPlayer > kMaxDist * 2) {
				foreach (GameObject spawnedObject in spawnedObjects) {
					Destroy(spawnedObject);
				}
			}

			generation++;
			nextSpawnTime += kSpawnInterval;
		}
	}

	private float SpawnChance() {
		return 25;
	}
	private float PassiveSpawnChance() {
		return Mathf.Min(85, Mathf.Max(30, 100 - 10 * generation));
	}
	private float HarderSpawnChance() {
		return Mathf.Min(40, 100 - 10 * generation);
	}
}
