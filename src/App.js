import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { EventDispatcher } from 'EventDispatcher';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { keyboardImplementationWrapper } from '@testing-library/user-event/dist/keyboard';
// import Stats from 'three/examples/jsm/libs/stats.module';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


function App() {
  
  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 96;

    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xff00ff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0x00ffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);


    


    // instantiate a loader
    const loader = new OBJLoader();

    // load a resource
    loader.load(
      // resource URL
      './models/monster.obj',
      // called when resource is loaded
      function ( object ) {

        scene.add( object );

      },
      // called when loading is in progresses
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' );

      }
    );

    


    // If Window Resizes
    // window.addEventListener('resize', () => this.onWindowResize(), false);

    // Add Geometry
  
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(20, 5, 100),
      new THREE.MeshNormalMaterial(),
    );
    scene.add(box);

    // Controls
    const control = new THREE.Mesh(
      new THREE.BoxGeometry(5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    );
    control.position.set(0, 20, 20);
    control.cursor = 'pointer';
    scene.add(control);


    /// multiple boxes

    var xDistance = 15;
    var yDistance = 15;
    var zDistance = 15;
    var geometry = new THREE.BoxGeometry(10,10,10);
    var material = new THREE.MeshBasicMaterial({color:0x00ff44});
    material = new THREE.MeshNormalMaterial();
    
    var material_red = new THREE.MeshBasicMaterial({color:0x00ffff});
    
    //initial offset so does not start in middle.
    var xOffset = 0;
    var yOffset = 0;
    
    for(var i = 0; i < 2; i++) {
        for(var j = 0; j < 3; j++) {
          for(var k = 0; k < 3; k++) {
                var mesh  = new THREE.Mesh(geometry, material);
                mesh.position.x = (xDistance * i) + xOffset;
                mesh.position.y = (yDistance * j) + yOffset;
                mesh.position.z = (zDistance * k);
                scene.add(mesh);
            };
        };
    };

    xOffset = 30;
    yOffset = 0;

    for(i = 0; i < 1; i++) {
      for(j = 0; j < 3; j++) {
        for(k = 0; k < 3; k++) {
            var mesh1  = new THREE.Mesh(geometry, material_red);
            mesh1.position.x = (xDistance * i) + xOffset;
            mesh1.position.y = (yDistance * j) + yOffset;
            mesh1.position.z = (zDistance * k);
            scene.add(mesh1);
          };
      };
    };

    // Add Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    

    //
    
    document.addEventListener('click', onMouseDown, false);

    function onMouseDown(e) {
      // box.scale.x *= 1.1;
      // box.scale.y *= 1.1;
      box.rotation.y += Math.PI / 2 / 100;
      mesh1.rotation.y += Math.PI / 2 / 100;
    }


    // Add Animations
    // const stats = Stats();
    // document.body.appendChild(stats.dom);
    
    // Add Animations
    const animate = () => {
      // box.rotation.y += 0.01;
      // stats.update();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="App">
        <div>
          <canvas id="myThreeJsCanvas" />
        </div>
        
        <h1 class="text-3xl font-bold underline">
          ETH Cubes
        </h1>
    </div>
  );
}

export default App;
