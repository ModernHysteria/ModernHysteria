import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

if ( WebGL.isWebGL2Available() ) {

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate ); // Automatically calls animate on every frame
    document.body.appendChild( renderer.domElement );

    // Lighting (optional, improves model appearance)
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Load the 3D model
    const loader = new GLTFLoader();
    let model;

    loader.load(
        'C:/Users/Gunther/Desktop/ISS/SpaceStation.glb', // Replace with your model's file path
        (gltf) => {
            model = gltf.scene;
            scene.add(model);
            model.position.set(0, 0, 0); // Optional: adjust position
        },
        (xhr) => {
            console.log(`Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded.`);
        },
        (error) => {
            console.error('An error occurred while loading the model:', error);
        }
    );

    camera.position.z = 5;

    // Animation loop
    function animate() {
        if (model) {
            model.rotation.x += 0.004;
            model.rotation.y += 0.008;
        }

        renderer.render( scene, camera );
    }

} else {

    // Display a warning message if WebGL 2 is not supported
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild( warning );

}
