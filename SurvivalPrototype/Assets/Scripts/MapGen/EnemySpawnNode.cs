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

	void Update() {
		timer += Time.deltaTime;
		if (timer >= nextSpawnTime) {
			if (Random.Range(0, 100) < SpawnChance() && spawnedObjects.Count < 2) {
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
						toSpawn = bearPrefab;
					}
					else {
						toSpawn = wolfPrefab;
					}
				}
				GameObject spawned = GameObject.Instantiate(toSpawn, transform.position, Quaternion.identity) as GameObject;
				spawned.transform.parent = transform;
				spawnedObjects.Add(spawned);
			}

			generation++;
			nextSpawnTime += kSpawnInterval;
		}
	}

	private float SpawnChance() {
		return 50;
	}
	private float PassiveSpawnChance() {
		return 100 - 10 * generation;
	}
	private float HarderSpawnChance() {
		return 50;
	}
}
