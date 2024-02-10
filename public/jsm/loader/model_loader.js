
//add the GLTFLoader and DRACOLoader to the project so that we can load gltf files
import { GLTFLoader } from './GLTFLoader.js';
import { DRACOLoader } from './DRACOLoader.js';

//create a class that will add a loading screen to the canvas element
// and will load the models from the gltf and fbx files
// also report on the progres of the defoult loading manager (if possible or needed)

//http://benchung.com/loading-animation-three-js/


//conevrt loading function to a promise so that we can wait for the models to load before continuing
function modelGLFTLoader(url) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        // Optional: Provide a DRACOLoader instance to decode compressed mesh data
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( './jsm/three/' );
        loader.setDRACOLoader( dracoLoader );

        loader.load(url,
            // called when the resource is loaded
            function ( gltf ) {
                resolve(gltf);
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                reject(error);
            }
        );
    });
}

// load a glTF resources and return a list of the loaded models
async function loadModels(models_resources) {
    var loaded_models = [];
    var number_of_models = models_resources.length;

    //give the user some feedback that the models are loading 
    //this is a very basic loading screen that can be improved
    document.getElementById("loading").innerHTML = "Loading " + number_of_models + " models";

    for (var i = 0; i < models_resources.length; i++) {
        // Load a glTF resource
        document.getElementById("loading").innerHTML += "<br> Loading " + models_resources[i] + " " + (i+1) + "/" + number_of_models + " models";
        let gltf = await modelGLFTLoader(models_resources[i]);
        loaded_models.push(gltf.scene);
    }
    document.getElementById("loading").innerHTML = ""; //remove loading text
    return loaded_models;
}

async function loadModel(model_resource) {
    document.getElementById("loading").innerHTML += "<br> Loading " + model_resource;
    let gltf = await modelGLFTLoader(model_resource);
    document.getElementById("loading").innerHTML = ""; //remove loading text
    return gltf.scene;
}

export { loadModels, loadModel };