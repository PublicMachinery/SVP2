import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    Vector2,
    Vector3,
    Vector4,
    Line,
    LineLoop,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    MOUSE,
    Clock,
    MeshLambertMaterial,
    DirectionalLight,
    MeshPhongMaterial,
    SphereGeometry,
    AmbientLight,
    GridHelper,
    WireframeGeometry,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments,
    AxesHelper,
    BufferGeometry,
    BufferAttribute,
    TrianglesDrawMode,
    TriangleStripDrawMode,
    Triangle,
    Object3D
  } from "three";
  
  
  import CameraControls from 'camera-controls';
  
  const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils.DEG2RAD,
      clamp: MathUtils.clamp
    }
  };

CameraControls.install({THREE : subsetOfTHREE});
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";





// export function Buffer(canvas,guiCont){

    
//     // Scene

//     const scene= new Scene();
//     scene.background= null;

//     //  CUSTOM the object

   
//     const triangles = 5000;

//     let geometryTr = new BufferGeometry();

//     // const positions = new Float32Array( triangles * 3 * 3 );
//     // const normals = new Float32Array( triangles * 3 * 3 );
//     // const colors = new Float32Array( triangles * 3 * 3 );
    

//     // helpers


//     const axes = new AxesHelper(1);
//     axes.material.depthTest = true;
//     const grid = new GridHelper();
//     grid.material.depthTest = true;
//     grid.renderOrder = 1;
//     scene.add(axes);
//     scene.add(grid);
//     // the material

//     const material= new MeshBasicMaterial({
//         color: 0x5f92b9,
//         polygonOffset:true,
//         polygonOffsetFactor:1,
//         polygonOffsetUnits:1,
//         side:2
//     });
//     const materialp= new MeshPhongMaterial({
//         color: 0x5f92b9,
//         shininess: 100 ,
//         flatShading: false,
//         side:2
//     });

//     const edgesMaterial= new LineBasicMaterial({
//         color:0x000000
//     });

//     edgesMaterial.linewidth = 2;
    
    
    
    
    
    
//     const rayCaster = new Raycaster();
//     //const intersect = rayCaster.intersectObject(meshT);
//     const mouse = new Vector2();

//     let previuousSelectedUuid;

//     window.addEventListener('mousemove',(event)=>{
//         mouse.x = event.clientX / canvas.clientWidth * 2 -1 ;
//         mouse.y = - (event.clientY / canvas.clientHeight) * 2+1 ;
//     })

    
    

//     // if (!intersects.length){
//     //     resetPreviousSelection();
//     //     return;
//     // }

    
    
//     const gui = new GUI({autoPlace : false});
//     const min = -3;
//     const max = 3; 
//     const step = 0.001;
//     gui.width = 800;
//     gui.domElement.id = "three-gui";
//     guiCont.append(gui.domElement);
    
//     const colorParam= {
//         color : 0xff0000,
//     }
    
//     // gui.add(meshT.position,'x',min,max,step); 
//     // gui.addColor(colorParam,'color').onChange(()=>{
//     //     meshT.material.color.set(colorParam.color);
        
//     // });
    
//     // lights

//     const light = new DirectionalLight();
//     light.position.set(3,2,1).normalize();
//     scene.add(light);

//     const light2 = new AmbientLight(0xffffff,0.3);
//     light.position.set(-3,2,-1).normalize();

//     scene.add(light2);
    

//     // camera;

//     const camera= new PerspectiveCamera(50, canvas.clientWith / canvas.clientHeight);
//     camera.position.z = 3;
//     camera.position.y = 3;
//     camera.position.x = 3;
//     const origin = new Vector2(0,0,0)
//     camera.lookAt(origin)
//     scene.add(camera);

//     // GUI

//     //the renderer
    
//     const renderer = new WebGLRenderer( { canvas : canvas } )
    
//     renderer.setSize(canvas.clientWidth , canvas.clientHeight, false)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
//     renderer.setClearColor(0xffffff,1);
//     //renderer.render(scene,camera);
    
//     //controls
    
//     const clock = new Clock();
//     const cameraControls = new CameraControls(camera,canvas);
    
//     cameraControls.dollyToCursor=true;

    
    
//     //animtation
//     const  animate = () => {
//         const detla = clock.getDelta();
//         cameraControls.update(detla);
//         renderer.render(scene,camera);
//         requestAnimationFrame(animate);
//     }
    
//     animate();

//     window.addEventListener('resize',()=> {
//         camera.aspect = canvas.clientWidth / canvas.clientHeight ;
//         camera.updateProjectionMatrix();
//         renderer.setSize(canvas.clientWidth , canvas.clientHeight, false);
        
//     });
    
    
   
// }



//import Stats from 'three/addons/libs/stats.module.js';

// export function Buffer2(canvas,guiCont){
    
//     let container, stats;

//     let camera, scene, renderer;

//     let raycaster, pointer;

//     let mesh, line;

//     init();
//     animate();

//     function init(canvas) {

//         container = canvas;

//         // camera Sene

//         camera = new PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
//         camera.position.z = 2750;

//         scene = new Scene();
//         scene.background = new Color( 0x050505 );
//         scene.fog = new Fog( 0x050505, 2000, 3500 );

//         // Lights

//         scene.add( new AmbientLight( 0x444444 ) );

//         const light1 = new DirectionalLight( 0xffffff, 0.5 );
//         light1.position.set( 1, 1, 1 );
//         scene.add( light1 );

//         const light2 = new DirectionalLight( 0xffffff, 1.5 );
//         light2.position.set( 0, - 1, 0 );
//         scene.add( light2 );

//         // Geometry

//         const triangles = 5000;

//         let geometry = new BufferGeometry();

//         const positions = new Float32Array( triangles * 3 * 3 );
//         const normals = new Float32Array( triangles * 3 * 3 );
//         const colors = new Float32Array( triangles * 3 * 3 );

//         const color = new Color();

//         const n = 800, n2 = n / 2;	// triangles spread in the cube
//         const d = 120, d2 = d / 2;	// individual triangle size

//         const pA = new Vector3();
//         const pB = new Vector3();
//         const pC = new Vector3();

//         const cb = new Vector3();
//         const ab = new Vector3();

//         for ( let i = 0; i < positions.length; i += 9 ) {

//             // positions

//             const x = Math.random() * n - n2;
//             const y = Math.random() * n - n2;
//             const z = Math.random() * n - n2;

//             const ax = x + Math.random() * d - d2;
//             const ay = y + Math.random() * d - d2;
//             const az = z + Math.random() * d - d2;

//             const bx = x + Math.random() * d - d2;
//             const by = y + Math.random() * d - d2;
//             const bz = z + Math.random() * d - d2;

//             const cx = x + Math.random() * d - d2;
//             const cy = y + Math.random() * d - d2;
//             const cz = z + Math.random() * d - d2;

//             positions[ i ] = ax;
//             positions[ i + 1 ] = ay;
//             positions[ i + 2 ] = az;

//             positions[ i + 3 ] = bx;
//             positions[ i + 4 ] = by;
//             positions[ i + 5 ] = bz;

//             positions[ i + 6 ] = cx;
//             positions[ i + 7 ] = cy;
//             positions[ i + 8 ] = cz;

//             // flat face normals

//             pA.set( ax, ay, az );
//             pB.set( bx, by, bz );
//             pC.set( cx, cy, cz );

//             cb.subVectors( pC, pB );
//             ab.subVectors( pA, pB );
//             cb.cross( ab );

//             cb.normalize();

//             const nx = cb.x;
//             const ny = cb.y;
//             const nz = cb.z;

//             normals[ i ] = nx;
//             normals[ i + 1 ] = ny;
//             normals[ i + 2 ] = nz;

//             normals[ i + 3 ] = nx;
//             normals[ i + 4 ] = ny;
//             normals[ i + 5 ] = nz;

//             normals[ i + 6 ] = nx;
//             normals[ i + 7 ] = ny;
//             normals[ i + 8 ] = nz;

//             // colors

//             const vx = ( x / n ) + 0.5;
//             const vy = ( y / n ) + 0.5;
//             const vz = ( z / n ) + 0.5;

//             color.setRGB( vx, vy, vz );

//             colors[ i ] = color.r;
//             colors[ i + 1 ] = color.g;
//             colors[ i + 2 ] = color.b;

//             colors[ i + 3 ] = color.r;
//             colors[ i + 4 ] = color.g;
//             colors[ i + 5 ] = color.b;

//             colors[ i + 6 ] = color.r;
//             colors[ i + 7 ] = color.g;
//             colors[ i + 8 ] = color.b;

//         }

//         geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );
//         geometry.setAttribute( 'normal', new BufferAttribute( normals, 3 ) );
//         geometry.setAttribute( 'color', new BufferAttribute( colors, 3 ) );

//         geometry.computeBoundingSphere();

//         let material = new MeshPhongMaterial( {
//             color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
//             side: DoubleSide, vertexColors: true
//         } );

//         mesh = new Mesh( geometry, material );
//         scene.add( mesh );

//         //

//         raycaster = new Raycaster();

//         pointer = new Vector2();

//         geometry = new BufferGeometry();
//         geometry.setAttribute( 'position', new BufferAttribute( new Float32Array( 4 * 3 ), 3 ) );

//         material = new LineBasicMaterial( { color: 0xffffff, transparent: true } );

//         line = new Line( geometry, material );
//         scene.add( line );

//         //

//         renderer = new WebGLRenderer();
//         renderer.setPixelRatio( window.devicePixelRatio );
//         renderer.setSize( window.innerWidth, window.innerHeight );
//         container.appendChild( renderer.domElement );

//         //

//         //stats = new Stats();
//         //container.appendChild( stats.dom );

//         //

//         window.addEventListener( 'resize', onWindowResize );
//         document.addEventListener( 'pointermove', onPointerMove );

//     }

//     function onWindowResize() {

//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();

//         renderer.setSize( window.innerWidth, window.innerHeight );

//     }

//     function onPointerMove( event ) {

//         pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//         pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//     }

//     //

//     function animate() {

//         requestAnimationFrame( animate );

//         render();
//         //stats.update();

//     }

//     function render() {

//         const time = Date.now() * 0.001;

//         mesh.rotation.x = time * 0.15;
//         mesh.rotation.y = time * 0.25;

//         raycaster.setFromCamera( pointer, camera );

//         const intersects = raycaster.intersectObject( mesh );

//         if ( intersects.length > 0 ) {

//             const intersect = intersects[ 0 ];
//             const face = intersect.face;

//             const linePosition = line.geometry.attributes.position;
//             const meshPosition = mesh.geometry.attributes.position;

//             linePosition.copyAt( 0, meshPosition, face.a );
//             linePosition.copyAt( 1, meshPosition, face.b );
//             linePosition.copyAt( 2, meshPosition, face.c );
//             linePosition.copyAt( 3, meshPosition, face.a );

//             mesh.updateMatrix();

//             line.geometry.applyMatrix4( mesh.matrix );

//             line.visible = true;

//         } else {

//             line.visible = false;

//         }

//         renderer.render( scene, camera );

//     }
// }

