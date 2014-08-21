public var camera: GameObject;

public var speed = 3;
public var rotationSpeed = 6;
public var rotationCutoff = 1;
public var spacing = 0.5;
public var targetPosition = Vector3(25, 0, 25);
var cameraOffset : Vector3;

function Start () {
	cameraOffset = Camera.main.transform.position;
	transform.position = targetPosition;
}

function Update () {
	if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow))
       targetPosition.z += spacing;
    if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow))
       targetPosition.z -= spacing;
    if (Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow))
       targetPosition.x -= spacing;
    if (Input.GetKeyDown(KeyCode.D)|| Input.GetKeyDown(KeyCode.RightArrow))
       targetPosition.x += spacing;
       
    if (Input.GetMouseButtonDown (0)) {
		var hit: RaycastHit;
		var ray: Ray;
		ray = (Camera.main.ScreenPointToRay(Input.mousePosition));
		if(Physics.Raycast(ray, hit)){
			targetPosition = hit.point;
		}
	}
	targetPosition = Vector3(targetPosition.x, 0, targetPosition.z);
	targetDirection = targetPosition - transform.position;
	Debug.DrawLine(transform.position, targetPosition);
	Debug.DrawLine(transform.position, transform.position + targetDirection);
	distance = targetDirection.magnitude;
	if (distance > rotationCutoff) {
		var newDir = Vector3.RotateTowards(transform.forward, targetDirection, rotationSpeed * Time.deltaTime, 0);
		transform.rotation = Quaternion.LookRotation(newDir);
	}
	
    transform.position = Vector3.MoveTowards(transform.position, targetPosition, speed * Time.deltaTime);
    Camera.main.transform.position = transform.position + cameraOffset;
}