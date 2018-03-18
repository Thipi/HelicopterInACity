#pragma strict


function OnCollisionEnter(collision : Collision){
    if(collision.gameObject.tag != "pickUp"){
        //penalize.
        Debug.Log("help");
    }
}