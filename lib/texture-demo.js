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
let map_texture = new THREE.TextureLoader().load('./textures/minecraft-grass.png');
//prepare emissiveMap
let emit_texture = new THREE.TextureLoader().load('./textures/emit-texture.jpeg');
//prepare alphaMap
let alpha_texture = new THREE.TextureLoader().load('./textures/alpha-demo.jpg');
//prepare bumpMap
let bump_texture = new THREE.TextureLoader().load('./textures/emit-texture.png');

let boxes = [];
let lights = [];

//pointLight create
const createPointLight = (x, y, z) => {
    console.log(lights)
    lights.push(new THREE.PointLight(0xffffff, 1, 0, 2));
    console.log(lights[lights.length-1]);
    lights[lights.length-1].position.set(x, y, z);
    scene.add(lights[lights.length-1])
}

const createBox = (boxMaterial, x, y, z) => {
    boxes.push(new THREE.Mesh(box, boxMaterial))
    boxes[boxes.length - 1].position.set(x, y, z);
    scene.add(boxes[boxes.length - 1])
}

// prepare lighting
createPointLight(0, -10, 0);
createPointLight(0, 10, 0);

//init box 
var box = new THREE.BoxGeometry(0.75,0.75,0.75);
//

//#region MapDemo
//emissiveDemo material
var boxMat = new THREE.MeshPhongMaterial({
    map: map_texture
});
//create object
createBox(boxMat, -3, 2, 0);
//#endregion

//#region emissiveMapDemo
//emissiveDemo material
var boxMat = new THREE.MeshPhongMaterial({
    map: map_texture,
    
    emissive: 0xff0000,
    emissiveIntensity: 0.8,
    emissiveMap: emit_texture,
});
//create object
createBox(boxMat, 0, 2, 0);
//#endregion

//#region alphaMapDemo
//alphaDemo material
var boxMat = new THREE.MeshPhongMaterial({
    alphaMap: alpha_texture,
    transparent: true,
    color: 0xff0000,
    side: THREE.DoubleSide
});
//create object
createBox(boxMat, 3, 2, 0);
//#endregion

//camera always starts at (0,0,0) and because the 
//near clip is 1, we are out of visible range
camera.position.z = 10;

//add renderer to html
document.body.appendChild(renderer.domElement);

//add window resize listener
window.addEventListener('resize', () => {
    window.location.reload();
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
})

var adder = 0.005;
//draw loop
const draw = () => {
    if(camera.position.z > 100 || camera.position.z < 0) adder *= -1;
    boxes.forEach((box) => {
        box.rotation.x += adder
        box.rotation.y += adder
        box.rotation.z += adder
    })
    
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

draw();