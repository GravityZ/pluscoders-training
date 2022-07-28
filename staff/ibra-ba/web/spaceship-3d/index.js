import { GLTFLoader } from "./GLTFLoader.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.01, 1000
)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var loader = new GLTFLoader()
var ship;
var bullet;

loader.load('scene.gltf', function (gltf) {
    ship = gltf.scene;
    scene.add(gltf.scene);
});

loader.load('bullet.gltf', function (gltf) {
    bullet = gltf.scene;
    scene.add(gltf.scene);
});

scene.background = new THREE.Color(0x200642)
var light = new THREE.HemisphereLight(0xffffff, 0x000000, 3);

var loader = new THREE.TextureLoader()               // añadi un texture loader para poner una imagen de fondo
loader.load('spaceback.jpg', function (texture) {
    scene.background = texture
})

scene.add(light);
camera.position.set(0, 100, 300);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

animate();

const step = 10

document.onkeydown = event => {
    const { key } = event

    //console.log(key)

    if (key === 'ArrowUp')
        ship.position.y += step
    else if (key === 'ArrowDown')
        ship.position.y -= step
    else if (key === 'ArrowLeft')
        ship.position.x -= step
    else if (key === 'ArrowRight')
        ship.position.x += step
    else if (key === ' ')
        launchMissil()
    if (key === 'ArrowUp')
        bullet.position.y += step
    else if (key === 'ArrowDown')
        bullet.position.y -= step
    else if (key === 'ArrowLeft')
        bullet.position.x -= step
    else if (key === 'ArrowRight')
        bullet.position.x += step
}

function launchMissil() {
    let count = 0
    const intervalId = setInterval(() => {
        bullet.position.y += step
        count++

        if (count > 10)
            clearInterval(intervalId)
    }, 250) // 1s / 4 -> 1000ms / 4 -> 250ms
}