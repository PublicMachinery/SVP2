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
  Object3D,
  Uint32BufferAttribute,
  Uint16BufferAttribute,
  Float32BufferAttribute,
  Float64BufferAttribute,
  ShaderMaterial,
  BufferGeometryLoader,
  LoadingManager,
} from "three";

import CameraControls from "camera-controls";

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
    clamp: MathUtils.clamp,
  },
};

import { cross, index, norm, typeOf } from "mathjs";
CameraControls.install({ THREE: subsetOfTHREE });
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { panelsr, pointsSorted, indexesSorted } from "./src/custom_mesh";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

export function customMesh(canvas, guiCont) {
 
  // Scene

  const scene = new Scene();
  scene.background = null;

  

 
  // Helpers

  const axes = new AxesHelper(1);
  axes.material.depthTest = true;
  const grid = new GridHelper();
  grid.material.depthTest = true;
  axes.renderOrder = 1;
  grid.renderOrder = 1;
  scene.add(axes);
  scene.add(grid);

  

  // lights

  const light = new DirectionalLight();
  light.position.set(3, 2, 1).normalize();
  scene.add(light);

  const light2 = new AmbientLight(0xffffff, 0.3);
  light.position.set(-3, 2, -1).normalize();

  scene.add(light2);

  // camera;

  const camera = new PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight
  );
  camera.position.z = 3;
  camera.position.y = 3;
  camera.position.x = 3;
  camera.lookAt(new Vector3(0, 0, 0));
  scene.add(camera);


 //  Reading from JSON


 const flatcoord = [].concat(...pointsSorted["points"]);
 const flatcoordsc = [];

 for (let v of flatcoord) {
   const sclcrd = v * 0.0001;
   flatcoordsc.push(sclcrd);
 }

 const indexes = indexesSorted["indexes"];

 const colorArray = [];

 for (let c in indexes) {
   const color = [85, 213, 83];
   colorArray.push(color);
 }

 // Arrays
 const flatColorArr = new Float32Array([].concat(...colorArray));

 const vertices = new Float32Array(flatcoordsc);

 // Geometry

 const geometry = new BufferGeometry();

 geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
 geometry.setAttribute("color", new Float32BufferAttribute(flatColorArr, 3));

 // the materials

 const edgesMaterial = new LineBasicMaterial({
   color: 0x000000,
 });

 const material = new MeshBasicMaterial({
   polygonOffset: true,
   polygonOffsetFactor: 1,
   polygonOffsetUnits: 1,
   side: 2,
   vertexColors: true,
 });

 const wireTriangle = new WireframeGeometry(geometry);
 const wireframe = new LineSegments(wireTriangle, edgesMaterial);
 const mesh = new Mesh(geometry, material);
 scene.add(mesh);
 scene.add(wireframe);


// GUI

const gui = new GUI({ autoPlace: false });
const min = -3;
const max = 3;
const step = 0.001;
gui.width = 800;
gui.domElement.id = "three-gui";
guiCont.append(gui.domElement);

const colorParam = {
  color: 0xff0000,
};

gui.add(mesh.position, "x", min, max, step);
gui.addColor(colorParam, "color").onChange(() => {
  mesh.material.color.set(colorParam.color);
});

  // Raycaster picking

  const rayCaster = new Raycaster();
  const mouse = new Vector2();

  const previousSelection = {
    index: null,
    face: null,
    location: null,
  };

  let firstCollision;

  const collision = [];
  const lableArray = [];

  const canvasWrapper = document.getElementById( "three-canvas");

  

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = (event.layerX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.layerY / canvas.clientHeight) * 2 + 1;
    rayCaster.setFromCamera(mouse, camera);
    
    
    const intersects = rayCaster.intersectObject(mesh);
    const hasCollided = intersects.length !== 0;

    const label = document.createElement("p");
    label.className = "label";
    const labelObject = new CSS2DObject(label);
    lableArray.push(labelObject);

    if (!hasCollided) {
      geometry.setAttribute(
        "color",
        new Float32BufferAttribute(flatColorArr, 3)
      );
      labelObject.removeFromParent;
      label.id = "hidden-label";
      for (let l of lableArray) {
        l.removeFromParent();
      }
      lableArray.length = 0;
      return;
    }

    firstCollision = intersects[0].faceIndex;
    collision.push(firstCollision);

    if (collision.length > 1) {
      const isPrevious = firstCollision in collision;
      
      for (let l of lableArray) {
        l.removeFromParent();
      }
      if (!isPrevious) {
        geometry.setAttribute(
          "color", new Float32BufferAttribute(flatColorArr, 3)
        );
      }
      collision.length = 0;
      
    }

    previousSelection.location = intersects[0].point;
    previousSelection.index = intersects[0].faceIndex;
    previousSelection.face = intersects[0].face;
    const face = previousSelection.face;
    const x = face.a;
    const y = face.b;
    const z = face.c;
    const collorAttribute = geometry.getAttribute("color");
    collorAttribute.setXYZ(x, 250, 0, 0);
    collorAttribute.setXYZ(y, 250, 0, 0);
    collorAttribute.setXYZ(z, 250, 0, 0);
    collorAttribute.needsUpdate = true;

   
    
    label.textContent = `this is panel ${firstCollision}`;
    const location = previousSelection.location;

    if (lableArray.length > 1) {
      labelObject.position.copy(location);
      const previousLabel = lableArray[lableArray.length - 2];
      const currentLabel = lableArray[lableArray.length - 1];
      currentLabel.position.copy(location);
      scene.add(currentLabel);
      previousLabel.removeFromParent();
    }

    
  });
  canvas.addEventListener('dblclick',()=>{
    const rightbar = document.getElementsByClassName('rightbar-hidden');
    rightbar[0].className ='none';
    rightbar.id = 'rightbar-view';
    
  })

  //the renderer

  const renderer = new WebGLRenderer({ canvas });
  
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
  console.log(renderer.info)
 

  //controls

  const clock = new Clock();
  const cameraControls = new CameraControls(camera, canvas);

  cameraControls.dollyToCursor = true;

  const labelRenderer = new CSS2DRenderer();

  labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.pointerEvents = "none";
  labelRenderer.domElement.style.top = "0";

  document.body.appendChild(labelRenderer.domElement);

  //animtation
  
  console.log(canvas.clientHeight)
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    const detla = clock.getDelta();
    cameraControls.update(detla);
    labelRenderer.render(scene, camera);
    console.log(canvas.clientHeight)
    
  };
  
  animate();

  
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    //renderer.render(scene, camera);
  });
  


  
}
