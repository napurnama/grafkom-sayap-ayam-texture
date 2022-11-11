/*
    Scene
        Environment within application of the three.js program
    Cameras
        Our view of the 3D environment
    Renderer
        Displays what the camera sees to the screen
*/

//init scene
var scene = new THREE.Scene();

//init camera
var camera = new THREE.PerspectiveCamera(
    45, //FOV - angle of view
    innerWidth/innerHeight, //aspect ratio of screen
    1, //near clip - closest distance visible to camera
    100 //far clip - furthest distance visible to camera
);

//init renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

//#region simple geometry
// //init box
// var box = new THREE.BoxGeometry(1,2,3);
// var boxMat = new THREE.MeshBasicMaterial({color:0xff0000});
// var boxMesh = new THREE.Mesh(box, boxMat);

// // add box to scene
// scene.add(boxMesh);
//#endregion

//#region custom geometry
const my_geo = new THREE.BufferGeometry();
let vertices = new Float32Array([
    1.0, 1.0, 0, //top right
    -1.0, 1.0, 0, //top left
    -1.0, -1.0, 0, //bottom left
    1.0, -1.0, 0, //bottom right
    1.0, 1.0, -1, //top right
    -1.0, 1.0, -1, //top left
    -1.0, -1.0, -1, //bottom left
    1.0, -1.0, -1, //bottom right
]);
my_geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
my_geo.setIndex([
    0,1,2,0,2,3, //front
]);
const my_mat = new THREE.MeshBasicMaterial({color: 0xff0000});
let my_mesh = new THREE.Mesh(my_geo, my_mat);
scene.add(my_mesh);
//#endregion

//camera always starts at (0,0,0) and because the 
//near clip is 1, we are out of visible range
camera.position.z = 10;

//add renderer to html
document.body.appendChild(renderer.domElement);

//add window resize listener
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
})

var adder = 0.5;
//draw loop
const draw = () => {
    requestAnimationFrame(draw);
    if(camera.position.z > 100 || camera.position.z < 0) adder *= -1;
    camera.position.z += adder;
    renderer.render(scene, camera);
}

draw();