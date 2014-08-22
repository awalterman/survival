using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class IconSpawner : MonoBehaviour {
	public GameObject iconPrefab;
	public Texture textureToSet;

	private GameObject uiCamera;
	private GameObject player;

	private GameObject spawnedIcon;

	private static bool whoop = false;

	void Start() {
		uiCamera = GameObject.Find("2dCamera");
		player = GameObject.Find("Player");
	}
	
	void Update() {
		if (spawnedIcon == null && !whoop) {
			spawnedIcon = GameObject.Instantiate(iconPrefab) as GameObject;
			transform.forward = uiCamera.transform.forward;
			// spawnedIcon.transform.parent = uiCamera.transform;
			spawnedIcon.transform.parent = transform;
			spawnedIcon.renderer.material.mainTexture = textureToSet;
			// whoop = true;
		}

		if (spawnedIcon != null) {
			Camera c = uiCamera.camera;
			var point = c.WorldToScreenPoint(transform.position);
			// spawnedIcon.transform.position = uiCamera.transform.position + uiCamera.transform.forward + point;
			spawnedIcon.transform.position = transform.position + new Vector3(0, 4, 0);
		}
	}
}
