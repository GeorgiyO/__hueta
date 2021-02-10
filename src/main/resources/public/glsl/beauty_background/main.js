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
    // create three
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(0, w, 0, h, 0.1, 11);
    renderer = new THREE.WebGLRenderer();

    // set up three
    renderer.setSize(s, s);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 8;

    // create objects
    canvas = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.ShaderMaterial({
            uniforms,
            fragmentShader: readFile("fragShad.glsl")
        })
    );

    canvas.scale.x = w;
    canvas.scale.y = h;

    canvas.position.x = w / 2;
    canvas.position.y = h / 2;

    canvas.rotation.y = Math.PI;

    if (!String.prototype.format) {
        String.prototype.format = function(map) {
            let res = "Моего ${pet} зовут ${name}";
            map.forEach((v, k) => {
                let arg = "${" + k + "}";
                res = res.replaceAll(arg, v);
            });
            return res;
        }
    }      
}

function addObjects() {
    [canvas]
        .forEach((o) => scene.add(o));
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

}

function addEventListeners() {
    window.addEventListener("resize", updateUResolution);
    window.addEventListener("mousemove", updateUMouse);
}

function updateUResolution() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let s = Math.min(w, h);
    camera.right = s;
    camera.bottom = s;
    renderer.setSize(s, s);
    uniforms.u_resolution.value = new THREE.Vector2(s, s);
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