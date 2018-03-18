#pragma strict

var RotSpeed : int = 3;
var bobSpeed : int = 1;
var StartPosition : Vector3;
var goUp : boolean = true;

var game : GameObject;

function Start () {
    StartPosition = transform.position;
    game = GameObject.Find("GameDummy");
}

function Update () {
    transform.Rotate(0, RotSpeed*Time.deltaTime,0);
    if(goUp == true){
        transform.Translate(0, bobSpeed*Time.deltaTime,0);
    }
    else{
        transform.Translate(0, -bobSpeed*Time.deltaTime,0);
    }

    if(transform.position.y >= StartPosition.y+1){
        goUp = false;
    }
    else if(transform.position.y <= StartPosition.y){
        goUp = true;
    }
}

function OnTriggerEnter(collider : Collider) {
    Destroy(gameObject); //pieni kirjain osoittaa olevan kyseessä oleva peliobjekti
    game.GetComponent(GameScript).score += 100;
}
