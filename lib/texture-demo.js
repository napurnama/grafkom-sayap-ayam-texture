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

//prepare map
let grass_texture = new THREE.TextureLoader().load('./textures/minecraft-grass.png');
//prepare emissiveMap
let emit_texture = new THREE.TextureLoader().load('./textures/emit-texture.jpeg');
//prepare alphaMap
let alpha_texture = new THREE.TextureLoader().load('./textures/emit-texture.jpeg');
//prepare bumpMap
let brick_texture = new THREE.TextureLoader().load('./textures/emit-texture.png');


// prepare lighting
let pointLight = new THREE.PointLight(0xffffff, 1);
//init box 
var box = new THREE.BoxGeometry(1,1,1);
//

//#region emissiveMapDemo
//emissiveDemo material
var boxMat = new THREE.MeshPhongMaterial({
    map: grass_texture
});
//create object
var mapDemo = new THREE.Mesh(box, boxMat);
mapDemo.position.set(0,0,0);
pointLight.position.set(0,10,10);
// add box to scene
scene.add(mapDemo);
scene.add(pointLight)
//#endregion

//#region emissiveMapDemo
//emissiveDemo material
var boxMat = new THREE.MeshPhongMaterial({
    emissive: 0xffff00,
    emissiveIntensity: 1,
    emissiveMap: emit_texture,
});
//create object
var emissiveDemo = new THREE.Mesh(box, boxMat);
emissiveDemo.position.set(3,0,0);
pointLight.position.set(3,0,0);
// add box to scene
scene.add(emissiveDemo);
//#endregion

//#region lambert geometry
// lambert material takes into account lighting
//init box 
var boxMat = new THREE.MeshLambertMaterial({
    wireframe: false,
    map: grass_texture,
});
var lambertBoxMesh = new THREE.Mesh(box, boxMat);
lambertBoxMesh.position.set(3,0,0);
// add box to scene
scene.add(lambertBoxMesh);
//#endregion

//camera always starts at (0,0,0) and because the 
//near clip is 1, we are out of visible range
camera.position.z = 10;
camera.position.x = 1.5;

//add renderer to html
document.body.appendChild(renderer.domElement);

//add window resize listener
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
})

var adder = 0.01;
//draw loop
const draw = () => {
    if(camera.position.z > 100 || camera.position.z < 0) adder *= -1;
    emissiveDemo.rotation.y += adder;
    mapDemo.rotation.y += adder;
    emissiveDemo.rotation.x += adder;
    mapDemo.rotation.x += adder;
    
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

draw();