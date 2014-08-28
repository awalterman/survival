#pragma strict

public var environmentEffects : GameObject[];
public var weatherChangeDuration : int;

private var lastWeatherChangedTime : int;
private var wasUsingSpecialWeather : boolean;
private var weatherEffect : GameObject;

function Start () {
	lastWeatherChangedTime = 0;
}

function Update () {
	if (isTimeToChangeWeather ()) {
		lastWeatherChangedTime = Time.time;
		if (wasUsingSpecialWeather) {
			wasUsingSpecialWeather = false;
			removePreviousWeather ();
		} else {
			tryToShowNewWeather ();
		}
	}
}

function isTimeToChangeWeather () {
	return (Time.time - lastWeatherChangedTime >= weatherChangeDuration);
}

function removePreviousWeather () {
	Debug.Log("removing weather");
	weatherEffect.particleSystem.Stop();
}

function tryToShowNewWeather () {
	if (Random.Range(0,8) < 1) {
	Debug.Log("Adding weather");
		wasUsingSpecialWeather = true;
		var index = Random.Range(0, environmentEffects.Length);
		weatherEffect = environmentEffects[index];
		weatherEffect.particleSystem.Play();
	} else {
	Debug.Log("Clean weather");
	}
}
