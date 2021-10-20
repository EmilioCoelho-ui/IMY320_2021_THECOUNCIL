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
let obj;
let render;

function main() {
    //Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // larger the number the further away it is
    camera.position.y = 1;
    camera.position.z = 1;
    camera.position.x = 10;

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

    // Texture
    let texture1 = new THREE.TextureLoader().load('../assets/model/obj/textures/Eye_D.jpg');
    let texture2 = new THREE.TextureLoader().load('../assets/model/obj/textures/Eye_N.jpg');
    let texture3 = new THREE.TextureLoader().load('../assets/model/obj/textures/REF 1.jpg');
    //const textures  = [texture1, texture2, texture3];


    // Object loader
    let mat;
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(
        '../assets/model/obj/eyeball.mtl',
        function ( materials ) {
            materials.preload();
            mat = materials;
        }
    );

    loader = new THREE.OBJLoader();
    loader.setMaterials(mat);
    loader.load(
        '../assets/model/obj/eyeball.obj',
        function ( object ) {
            obj = object;

            /*
            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material.map = texture1; // assign your diffuse texture here
                }
            } );

             */

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



    /*
    let mesh = null;

    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( '../assets/model/obj/' );
    mtlLoader.load( 'eyeball.mtl', function( materials ) {

        materials.preload();

        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( '../assets/model/obj/' );
        objLoader.load( 'eyeball.obj', function ( object ) {

            mesh = object;
            mesh.position.y = -50;
            scene.add( mesh );

        } );

    } )

     */


    // Render
    render = function () {
        requestAnimationFrame(render);
        if (obj != null) {
            obj.rotation.y += 0.01;
        }
        controls.update();
        renderer.render(scene, camera);
    }
    render();
}

main();