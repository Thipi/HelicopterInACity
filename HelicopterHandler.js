#pragma strict

    var mainRotor : GameObject;
    var tailRotor : GameObject;

    var maxRotorForce : float = 24000;
    var maxRotorVelocity : float = 72000;
    static var rotorVelocity : float = 0;
    private var rotorRotation: float = 0;
    var maxTailRotorForce : float = 25000;
    var maxTailRotorVelocity : float = 2200;
    private var tailRotorVelocity : float = 0;
    private var tailRotorRotation : float = 0;
    var forwardRotorTorqueMultiplier : float = 0.5f;
    var sideWaysRotorTorqueMultiplier : float = 0.5f;

    var mainRotorActive : boolean = true;
    var tailRotorActive : boolean = true;

    private var rb : Rigidbody;

    function Start(){
        rb = GetComponent(Rigidbody);

    }

    function FixedUpdate(){ //Physics functions update. Update updates in every frame.
        //Scope: is this var relevant in this function or overall in the script. Creating a local var detains it to local function.
        var torqueValue : Vector3; //x, y and z
        var controlTorque : Vector3 = new Vector3(Input.GetAxis("Vertical") * forwardRotorTorqueMultiplier, 1.0, 
            -Input.GetAxis("Horizontal2") * sideWaysRotorTorqueMultiplier);
        if(mainRotorActive == true){
            //sulut kesken lauseen käskevät ohjelmaa laskemaan suluissa olevat asiat ennen muuta. Lisää sulun sisällön torquevalueen laskettuaan sen.
            torqueValue += (controlTorque * maxRotorForce * rotorVelocity);
            //adding relative force means adding force relative to the rotation of the object
            rb.AddRelativeForce(Vector3.up * maxRotorForce * rotorVelocity);
        }
        if(Vector3.Angle(Vector3.up, transform.up) < 80){ //if the calculated angle is less than 80
            transform.rotation = Quaternion.Slerp(transform.rotation, 
                Quaternion.Euler(0, transform.rotation.eulerAngles.y,0),
            Time.deltaTime * rotorVelocity * 2);//Quaternion calculates rotation
        }
        if(tailRotorActive == true){
            torqueValue -= (Vector3.up * maxTailRotorForce * tailRotorVelocity); //Vector3.ylös kertaa maksimiRoottoriVoima * Roottorin nopeus
            rb.AddRelativeTorque(torqueValue); //Torque is working with angular force
        }
    }

    function Update(){
        if(mainRotorActive == true){ //here we rotate
            mainRotor.transform.rotation = transform.rotation * Quaternion.Euler(270, rotorRotation, 0); //within the paranthesis you write values for x,y and z7
        }
        if(tailRotorActive == true){
            tailRotor.transform.rotation = transform.rotation * Quaternion.Euler(0, 270, tailRotorRotation);
        }
        rotorRotation += maxRotorVelocity * rotorVelocity * Time.deltaTime;
        tailRotorRotation += maxTailRotorVelocity * rotorVelocity * Time.deltaTime;

        var hoverRotorVelocity = (rb.mass * Mathf.Abs(Physics.gravity.y) / maxRotorForce);
        var hoverTailVelocity = (maxRotorForce * rotorVelocity) / maxTailRotorForce;

        if(Input.GetAxis("Vertical2") != 0.0){

            rotorVelocity += Input.GetAxis("Vertical2") * 0.005;
        }
        else{
            rotorVelocity = Mathf.Lerp(rotorVelocity, hoverRotorVelocity, Time.deltaTime * 5);
        }

        tailRotorVelocity = hoverTailVelocity - Input.GetAxis("Horizontal") * 0.05;

        if(rotorVelocity > 1.0){
            rotorVelocity = 1.0;
        }

        else if(rotorVelocity < 0.0){
            rotorVelocity = 0.0;
        }
    }

