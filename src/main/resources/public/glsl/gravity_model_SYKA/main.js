import {dotsEntry} from "./dotsEntry.js";
import "./../../_tmp/Stringformat.js";

const DOTS_COUNT = 10;
const BASE_POWER = 1 / 5000;

const shaderCode = readFile("fragShad.glsl");

let shaderSettings = new Map()
    .set("dotsCount", DOTS_COUNT)
    ;

let getDotsCount = () => shaderSettings.get("dotsCount");
let calculatePower = () => BASE_POWER / dotsEntry.dots.length;


let w = window.innerWidth;
let h = window.innerHeight;
let s = Math.min(w, h);

let extraBlock = document.getElementById("zalupa");
let ballsCount = document.getElementById("ballsCount");
let ballsCountSpan = document.getElementById("ballsCount-span");

let scene;
let camera;
let renderer;

let canvas;
let canvasGeometry;
let canvasMaterial

let uniforms = {};

updateExtraBlock((w - s) / 2.0);
ballsCount.onchange = () => {updateDotsCount(ballsCount.value)};

init();
initUniforms();
addEventListeners();
render();

function updateExtraBlock(leftPos) {
    extraBlock.style.left = `${leftPos}px`;
}

function updateDotsCount(dotsCount) {
    ballsCountSpan.innerText = ballsCount.value;
    shaderSettings.set("dotsCount", dotsCount);
    updateModel();
    canvasMaterial.fragmentShader = shaderCode.format(shaderSettings);
    canvasMaterial.needsUpdate = true;
}

function init() {

    // create three
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(0, w, 0, h, 0.1, 11);
    renderer = new THREE.WebGLRenderer();

    // set up three
    renderer.setSize(s, s);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 8;

    // create objects
    initCanvas();
    scene.add(canvas);
}

function initCanvas() {
    canvasGeometry = new THREE.PlaneGeometry(1, 1);
    canvasMaterial =
        new THREE.ShaderMaterial({
            uniforms,
            fragmentShader: shaderCode.format(shaderSettings)
        });
    canvas = new THREE.Mesh(
        canvasGeometry,
        canvasMaterial
    );

    canvas.scale.x = w;
    canvas.scale.y = h;

    canvas.position.x = w / 2;
    canvas.position.y = h / 2;

    canvas.rotation.y = Math.PI;

    updateModel();
}

function updateModel() {
    let randomArray = [];

    for (let i = 0; i < getDotsCount(); i++) {
        randomArray[i] = {
            x: Math.random(),
            y: Math.random()
        }
    }

    dotsEntry.setDots(randomArray).setPower(calculatePower());
}

function initUniforms() {

    uniforms.u_resolution = {
        value: new THREE.Vector2(s, s)
    }

    uniforms.u_time = {
        value: 10000
    }

    uniforms.u_mouse = {
        value: new THREE.Vector2(0,0)
    }

    uniforms.u_clicks = {
        value: 1.0
    }

    uniforms.u_dots = {
        value: []
    }

}

function addEventListeners() {
    window.addEventListener("resize", updateUResolution);
    window.addEventListener("mousemove", updateUMouse);
    window.addEventListener("click", incrementUClicks);
}

function updateUResolution() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let s = Math.min(w, h);
    camera.right = s;
    camera.bottom = s;
    renderer.setSize(s, s);
    uniforms.u_resolution.value = new THREE.Vector2(s, s);
    updateExtraBlock((w - s) / 2.0);
}

function updateUMouse(e) {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let s = Math.min(w, h);
    let dw = (w - s) / 2;
    let dh = (h - s) / 2;

    uniforms.u_mouse.value = new THREE.Vector2(
        (e.pageX - dw) / s,
        1.0 - (e.pageY - dh) / s
    );
}

function incrementUClicks(e) {
    uniforms.u_clicks.value++;
}

var count = 0;
setInterval(() => {
    console.log(count);
    count = 0;
}, 1000);

function render(time) {
    count++;
    update(time);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function update(time) {
    time /= 1000;
    uniforms.u_time.value = time + 1000;
    uniforms.u_dots.value = dotsEntry.update().map((dot) => new THREE.Vector2(dot.x, dot.y));
}

function readFile(url) {
    let result = null;
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    if (request.status === 200) {
        result = request.responseText;
    }
    return result;
}