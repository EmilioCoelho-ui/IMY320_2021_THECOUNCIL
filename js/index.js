AOS.init({
    duration: 1200,
})

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//Global Variables
let scene;
let renderer;
let camera;
let myCanvas;
let controls;
let loader;

function main() {
    //Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // larger the number the further away it is
    camera.position.z = 80; // Setting the camera position
    camera.position.y = 0;
    camera.position.x = 110;

    // Canvas
    myCanvas = document.getElementById("myCanvas");

    // Renderer
    renderer = new THREE.WebGLRenderer({canvas: myCanvas});
    renderer.setSize( window.innerWidth, 500 );

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Light
    const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
    light.position.set(10, 0, 25);
    scene.add(light);

    // Object loader
    loader = new THREE.OBJLoader();
    loader.load(
        urlValue,
        function ( object ) {
            obj = object;

            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material.map = texture; // assign your diffuse texture here
                }
            } );

            scene.add( object );
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error occurred' );
            console.log( error);
        }
    );
}