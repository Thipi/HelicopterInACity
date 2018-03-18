#pragma strict

var targetObject : GameObject;
var offset : Vector3;

function Start () {

}

function Update () {
    offset = targetObject.transform.TransformPoint(0, 15, 30); //määrittää kameran sijainnin helikopterin yllä

    transform.position = Vector3.Lerp(transform.position, offset, 7 * Time.deltaTime); //origin, finishing and time
    transform.LookAt(targetObject.transform.position);
}