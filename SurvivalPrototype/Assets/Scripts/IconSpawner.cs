using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class IconSpawner : MonoBehaviour {
	public GameObject iconPrefab;

	private GameObject uiCamera;
	private GameObject player;

	private GameObject spawnedIcon;

	void Start() {
		uiCamera = GameObject.Find("2dCamera");
		player = GameObject.Find("Player");
	}
	
	void Update() {
		if (spawnedIcon == null) {
			spawnedIcon = GameObject.Instantiate(iconPrefab) as GameObject;
		}

		if (spawnedIcon != null) {
			Camera c = uiCamera.camera;
			// spawnedIcon.transform.position = 
		}
	}
}
