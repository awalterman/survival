public var camera: GameObject;

public var speed = 3;
public var spacing = 0.5;
public var targetPosition = Vector3.zero;

function Start () {
	    position = transform.position;
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
    transform.position = Vector3.MoveTowards(transform.position, targetPosition, speed * Time.deltaTime);
	Camera.main.transform.position.x = transform.position.x;
	Camera.main.transform.position.z = transform.position.z;
}