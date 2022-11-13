//init scene
let scene = new THREE.Scene();

//init camera
let camera = new THREE.PerspectiveCamera(
    45, //FOV - angle of view
    innerWidth/innerHeight, //aspect ratio of screen
    1, //near clip - closest distance visible to camera
    100 //far clip - furthest distance visible to camera
);

//init renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

//prepare map
const map_texture = new THREE.TextureLoader().load('./textures/minecraft-grass.png');
//prepare emissiveMap
const emit_texture = new THREE.TextureLoader().load('./textures/emit-texture.jpeg');
//prepare alphaMap
const alpha_texture = new THREE.TextureLoader().load('./textures/alpha-demo.jpg');
//prepare bumpMap
const bump_texture = new THREE.TextureLoader().load('./textures/brick-bump-map.jpg');

//prepare multiMap
const A_texture = new THREE.TextureLoader().load('./textures/a.jpg');
const B_texture = new THREE.TextureLoader().load('./textures/b.jpeg');
const C_texture = new THREE.TextureLoader().load('./textures/c.jpeg');
const D_texture = new THREE.TextureLoader().load('./textures/d.jpeg');
const E_texture = new THREE.TextureLoader().load('./textures/e.jpeg');
const F_texture = new THREE.TextureLoader().load('./textures/f.webp');

//prepare UVMap
const UV_texture = new THREE.TextureLoader().load('./textures/UVMap-demo.png');

let boxes = [];
let lights = [];

//pointLight create
const createPointLight = (intensity, x, y, z) => {
    console.log(lights)
    lights.push(new THREE.PointLight(0xffffff, intensity, 0, 2));
    console.log(lights[lights.length-1]);
    lights[lights.length-1].position.set(x, y, z);
    scene.add(lights[lights.length-1])
}

const createBox = (boxMaterial, x, y, z) => {
    boxes.push(new THREE.Mesh(box, boxMaterial))
    boxes[boxes.length - 1].position.set(x, y, z);
    scene.add(boxes[boxes.length - 1])
}

//#region MapDemo
const mapDemo = (x, y, z) => {
    //mapDemo material
    const boxMat = new 
    THREE.MeshPhongMaterial({
        map: map_texture
    });
    //create object
    createBox(boxMat, x, y, z);
}
//#endregion

//#region emissiveMapDemo
const emissiveMapDemo = (x, y, z) => {
    //emissiveDemo material
    const boxMat = new 
    THREE.MeshPhongMaterial({
        map: map_texture,
        emissive: 0xff0000,
        emissiveIntensity: 0.8,
        emissiveMap: emit_texture,
    });
    //create object
    createBox(boxMat, x, y, z);
}
//#endregion

//#region alphaMapDemo
const alphaMapDemo = (x, y, z) => {
    //alphaDemo material
    const boxMat = new 
    THREE.MeshPhongMaterial({
        map: map_texture,
        alphaMap: alpha_texture,
        transparent: true,
        side: THREE.DoubleSide
    });
    //create object
    createBox(boxMat, x, y, z);
}
//#endregion

//#region bumpMapDemo
const bumpMapDemo = (x, y, z) => {
    //bumpDemo material
    const boxMat = new 
    THREE.MeshPhongMaterial({
        // map: map_texture,
        bumpMap: bump_texture,
        bumpScale: 0.05,
    });
    //create object
    createBox(boxMat, x, y, z);
}
//#endregion

//#region displacementMapDemo
const displacementMapDemo = (x, y, z) => {
    //displacementDemo material
    const boxMat = new 
    THREE.MeshPhongMaterial({
        displacementMap: alpha_texture,
        displacementScale: 0.5,
    });
    //create object
    createBox(boxMat, x, y, z);
}
//#endregion

//#region multiMapDemo
const multiMapDemo = (x, y, z) => {
    //multiMapDemo material 
    const boxMat = [
        new THREE.MeshPhongMaterial({map: A_texture}),
        new THREE.MeshPhongMaterial({map: B_texture}),
        new THREE.MeshPhongMaterial({map: C_texture}),
        new THREE.MeshPhongMaterial({map: D_texture}),
        new THREE.MeshPhongMaterial({map: E_texture}),
        new THREE.MeshPhongMaterial({map: F_texture}),
    ];
    //create object
    createBox(boxMat, x, y, z);
}
//#endregion


//#region UV Mapping Demo
const UVMapDemo = (side, x, y, z) => {
    const uvDemo = new THREE.BufferGeometry()
    //set vertex positions
    const vertices = new Float32Array([
        side, side, 0.0, // top right
        0, side, 0.0, // top left
        0, 0, 0.0, // bottom left
    
        side, side, 0.0, //top right
        0, 0, 0.0, // bottom left
        side, 0, 0.0, // bottom right
    ]);
    //add vertices to buffer geometry
    uvDemo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    //initialize UVs
    const UVs = new Float32Array([
        1, 1,
        0, 1,
        0, 0,

        1, 1,
        0, 0,
        1, 0,
    ]);
    //add UVs to buffer geometry
    uvDemo.setAttribute('uv', new THREE.BufferAttribute(UVs, 2))

    let uvDemoMat = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        map: UV_texture,
    });
    let uvDemoMesh = new THREE.Mesh(uvDemo, uvDemoMat);
    uvDemoMesh.position.set(x, y, z);
    //set uv mapping
    
    
    
    scene.add(uvDemoMesh);
}
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

var adder = 0.003;
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

createPointLight(1, 0, -10, 3);
createPointLight(2, 0, 10, 3);

//init box 
const side = 3;
const segments = 40;
var box = new THREE.BoxGeometry(side, side, side, segments, segments, segments);
//

const x = 0;
const y = 0;
const z = 0;

// mapDemo(x, y, z);
// emissiveMapDemo(x, y, z);
// bumpMapDemo(x, y, z);
// displacementMapDemo(x, y, z);
// alphaMapDemo(x, y, z);
// multiMapDemo(x, y, z);
// UVMapDemo(5, -2.5, -2.5);

draw();