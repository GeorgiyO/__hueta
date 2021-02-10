import {GLSL} from "./glsl.js";

let w = window.innerWidth;
let h = window.innerHeight;
let s = Math.min(w, h);

let scene;
let camera;
let renderer;

let canvas;

let uniforms = {};

init();
initUniforms();
addObjects();
addEventListeners();
render();

function init() {
    createThree();
    setUpThree();
    createObjects();

    function createThree() {
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(0, w, 0, h, 0.1, 11);
        renderer = new THREE.WebGLRenderer();
    }

    function setUpThree() {
        renderer.setSize(s, s);
        document.body.appendChild(renderer.domElement);
        camera.position.z = 8;
    }

    function createObjects() {
        canvas = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.ShaderMaterial({
                uniforms,
                fragmentShader: GLSL.fragShad
            })
        );

        canvas.scale.x = w;
        canvas.scale.y = h;

        canvas.position.x = w / 2;
        canvas.position.y = h / 2;

        canvas.rotation.y = Math.PI;
    }
}

function addObjects() {
    [canvas]
        .forEach((o) => scene.add(o));
}

function initUniforms() {

    uniforms.u_resolution = {
        type: "v2",
        value: new THREE.Vector2(s, s)
    }

    uniforms.u_time = {
        type: "f",
    }

}

function addEventListeners() {
    window.addEventListener("resize", () => {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let s = Math.min(w, h);
        camera.right = s;
        camera.bottom = s;
        renderer.setSize(s, s);
        uniforms.u_resolution.value = new THREE.Vector2(s, s);
    });
}

var count = 0;
var sum = 0;
var prevTime = 0;

function timeStep(time) {
    count++;
    sum += time;

    if (sum >= 1000) {
        console.log(count); // function calls in 1 second
        count = 0;
        sum = 0;
    }
}

function render(time) {
    timeStep(time - prevTime);
    prevTime = time;
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function update() {
    uniforms.u_time.value = window.performance.now() / 1000;
}
