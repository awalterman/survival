public var camera: GameObject;

private var pos : Vector3;
public var speed = 3;
public var spacing = 0.5;

function Start () {
	    pos = transform.position;

}

function Update () {
	if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow))
       pos.y += spacing;
    if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow))
       pos.y -= spacing;
    if (Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow))
       pos.x -= spacing;
    if (Input.GetKeyDown(KeyCode.D)|| Input.GetKeyDown(KeyCode.RightArrow))
       pos.x += spacing;
       
    if (Input.GetMouseButtonDown (0))
		{
		var hit: RaycastHit;
		var ray: Ray;
		ray = (Camera.main.ScreenPointToRay(Input.mousePosition));
		if(Physics.Raycast(ray, hit)){
			pos = hit.point;
		}
		}
    transform.position = Vector3.MoveTowards(transform.position, pos, speed * Time.deltaTime);
	Camera.main.transform.position.x = transform.position.x;
	Camera.main.transform.position.y = transform.position.y;

}