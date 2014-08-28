#pragma strict

public var audioClips : AudioClip[];

private var lastTimePlayed : int;
private var timeGap : float;

function Start () {
	lastTimePlayed = 0;
	timeGap = Random.Range(8,12);
}

function Update () {
	if (Time.time - lastTimePlayed >= timeGap) {
		var indexToPlay = Random.Range(0, audioClips.Length);
		lastTimePlayed = Time.time;
		audio.PlayOneShot(audioClips[indexToPlay]);
	}
}