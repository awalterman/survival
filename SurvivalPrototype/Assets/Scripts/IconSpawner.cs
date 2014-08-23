using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class IconSpawner : MonoBehaviour {
	public GameObject iconPrefab;
	public Texture textureToSet;

	private GameObject uiCamera;
	private GameObject player;

	private GameObject spawnedIcon;
	private GameObject spawnedBackground;

	private const float kDrawDistanceMin = 4.0f;
	private const float kDrawDistanceMax = 6.0f;

	void Start() {
		uiCamera = GameObject.Find("2dCamera");
		player = GameObject.Find("Player");
	}
	
	void Update() {
		if (spawnedIcon == null) {
			spawnedIcon = GameObject.Instantiate(iconPrefab) as GameObject;
			spawnedIcon.transform.forward = uiCamera.transform.forward;
			// spawnedIcon.transform.parent = uiCamera.transform;
			spawnedIcon.transform.parent = transform;
			spawnedIcon.transform.position = transform.position + new Vector3(0, 4, 0);
			spawnedIcon.renderer.material.mainTexture = textureToSet;

			spawnedBackground = spawnedIcon.transform.GetChild(0).gameObject;
			// whoop = true;
		}

		if (spawnedIcon != null) {
			// spawnedIcon.transform.position = uiCamera.transform.position + uiCamera.transform.forward + point;
			// spawnedIcon.SetActive(Vector3.Distance(transform.position, player.transform.position) < kDrawDistance);
			float dist = Vector3.Distance(transform.position, player.transform.position);
			float a = Mathf.InverseLerp(kDrawDistanceMax, kDrawDistanceMin, dist);
			Color c = Color.Lerp(new Color(1, 1, 1, 0), Color.white, a);
			spawnedIcon.renderer.material.color = c;
			spawnedBackground.renderer.material.color = c;
		}
	}
}
