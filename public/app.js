import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Vector3,
    Color,
    AmbientLight,
    BoxGeometry,
    MeshLambertMaterial,
    PointLight,
    Mesh,
} from '../node_modules/three/build/three.module.js';



// add camera controls
import { OrbitControls } from './jsm/three/OrbitControls.js';
import { VRcontrols } from './jsm/controls/VRcontrols.js'; 
import { loadModels, loadModel} from './jsm/loader/model_loader.js';

//to display the canvas properly remove margins at the window edges
document.body.setAttribute('style', 'margin: 0; overflow: hidden;');

//global varible and object declarations ****************************************************
let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let controls;
let cube;


// setup renderer
var renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.autoClear = false;
document.getElementById("canvas").appendChild(renderer.domElement);

//prevent default behavior like opening files in the browser
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    renderer.domElement.addEventListener(eventName, preventDefaults, false)
})



async function sceneInit() {
    scene.background = new Color(0x383838);
    const light = new PointLight(0xffffff, 1, 100);
    light.position.set(5, 10, 5);
    scene.add(light);
    const ambientLight2 = new AmbientLight(0xffffee, 0.2);
    scene.add(ambientLight2);

    renderer.render(scene, camera); //render the scene once to make sure that the canvas is displayed
    //load models from gltf files
    var models_resources = ['./gltf/bendyTutorial.glb','./gltf/scene.gltf'];
    //vait for the models to load
    //var loaded_models = await loadModels(models_resources);
    //console.log(loaded_models);
    //add the models to the scene and position them
    let bendy = await loadModel('./gltf/bendyTutorial.glb');//loaded_models[0];
    bendy.position.set(1,0,0);
    scene.add(bendy);

    let operating_room = await loadModel('./gltf/scene.gltf');//loaded_models[1];
    scene.add(operating_room);

    //controls = new OrbitControls(camera, renderer.domElement);
    controls = new VRcontrols(camera,scene);

    controls.setPosition(-2, 0, 2);
    camera.lookAt(0, 1, 0);

    //setup program loop
    renderer.setAnimationLoop(()=>{
        controls.update(); //controls need to be updated every frame
        renderScene();
    });

}


sceneInit(); //setup lighting and helper objects


function renderScene(){
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    renderer.clear();
    renderer.render(scene, camera);
}

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

renderer.domElement.addEventListener('drageneter',()=>{console.log("dragenter")},false);
renderer.domElement.addEventListener('dragleave',()=>{console.log("dragleave hide drop file icon"); loadingFileIcon.visible = false;},false);
renderer.domElement.addEventListener('drop',handleDrop,false);
renderer.domElement.addEventListener('dragover',()=>{console.log("dragover show drop file icon"); loadingFileIcon.visible = true;},false);

function handleDrop(e) {
    console.log("droped file hide icon");
}

//resize the canvas when the window is resized
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}