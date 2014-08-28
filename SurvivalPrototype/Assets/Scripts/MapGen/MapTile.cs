using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public enum Dir {
	North = 0x1,
	South = 0x2,
	East = 0x4,
	West = 0x8
}

public class MapTile : MonoBehaviour {

	public GameObject northDoor;
	public GameObject southDoor;
	public GameObject eastDoor;
	public GameObject westDoor;

	private Dir openDoors = 0;

	public void OpenDoors(Dir doors) {
		SetDoors(openDoors | doors);
	}

	public void CloseDoors(Dir doors) {
		SetDoors(openDoors & (~doors));
	}

	public void SetDoors(Dir doors) {
		if (openDoors != doors) {
			openDoors = doors;
			UpdateDoors();
		}
	}

	public Dir GetDoors() {
		return openDoors;
	}

	private void UpdateDoors() {
		northDoor.SetActive((openDoors & Dir.North) == 0);
		southDoor.SetActive((openDoors & Dir.South) == 0);
		eastDoor.SetActive((openDoors & Dir.East) == 0);
		westDoor.SetActive((openDoors & Dir.West) == 0);
	}
}
