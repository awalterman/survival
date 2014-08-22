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
   	Camera.main.transform.position = transform.position + cameraOffset;
	oldPosition = transform.position;
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
	moveTowardsTargetPosition(targetPosition);
}

function OnCollisionEnter (col : Collision) {
	print("Ran into object: " + col.transform.name);
	moveTowardsTargetPosition(rigidbody.position);
}

function OnCollisionStay (col : Collision) {
	print("Still running into object: " + col.transform.name);
}

function OnCollisionExit(collisionInfo : Collision) {
	print("No longer in contact with " + collisionInfo.transform.name);
}

function moveTowardsTargetPosition(targetPosition : Vector3) {
	targetPosition = Vector3(targetPosition.x, 0, targetPosition.z);
	targetDirection = targetPosition - transform.position;
	Debug.DrawLine(transform.position, targetPosition);
	distance = targetDirection.magnitude;
	if (distance > rotationCutoff) {
		var newDir = Vector3.RotateTowards(transform.forward, targetDirection, rotationSpeed * Time.deltaTime, 0);
		rigidbody.rotation = Quaternion.LookRotation(newDir);
	}
	rigidbody.position = Vector3.MoveTowards(transform.position, targetPosition, speed * Time.deltaTime);
    Camera.main.transform.position = transform.position + cameraOffset;
}