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

export function customMesh(canvas, guiCont) {
  // Scene

  const scene = new Scene();
  scene.background = null;

 

  const edgesMaterial = new LineBasicMaterial({
    color: 0x000000,
  });

  //  Reading from JSON

  const flatcoord = [].concat(...pointsSorted["points"]);
  const flatcoordsc = [];

  for (let v of flatcoord) {
    const sclcrd = v * 0.001;
    flatcoordsc.push(sclcrd);
  }

  const indexes = indexesSorted["indexes"];


  const colorArray = []

  for(let c in indexes){
    const color = [255,200,0]
    colorArray.push(color)
  }

  // Arrays
  const flatColorArr= new Float32Array([].concat(...colorArray));
  console.log(flatColorArr)
 const vertices = new Float32Array(flatcoordsc);
  //   vertices[flatcoordsc]
  // const normalArrray = new Float32Array(flatNormals)
  const indexesArr = new Uint16Array(indexes);
  //console.log(indexesArr)
  // Geometry

  const geometry = new BufferGeometry();
 
  geometry.setAttribute("position", new Float32BufferAttribute(vertices,3));
  geometry.setAttribute('color',new Float32BufferAttribute(flatColorArr,3))
  //geometry.setAttribute('normal', new BufferAttribute(normalArrray,3))
  //geometry.setIndex( new Uint16BufferAttribute(indexesArr,1))
  //geometry.setIndex(indexes)


 // the materials

  
  const material = new MeshBasicMaterial({
  // color: 0x5f92b9,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
  side: 2,
  vertexColors : true ,
 });


  const wireTriangle = new WireframeGeometry(geometry);
  const wireframe = new LineSegments(wireTriangle, edgesMaterial);
  const mesh = new Mesh(geometry, material);
  ;
  scene.add(mesh);
  scene.add(wireframe);

  // Helpers

  const axes = new AxesHelper(1);
  axes.material.depthTest = true;
  const grid = new GridHelper();
  grid.material.depthTest = true;
  grid.renderOrder = 1;
  scene.add(axes);
  scene.add(grid);

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
    canvas.clientWith / canvas.clientHeight
  );
  camera.position.z = 3;
  camera.position.y = 3;
  camera.position.x = 3;
  camera.lookAt(new Vector3(0, 0, 0));
  scene.add(camera);

  // Raycaster

  const rayCaster = new Raycaster();
  //const intersect = rayCaster.intersectObject(mesh);
  const mouse = new Vector2();

  let previuousSelectedUuid;

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
    rayCaster.setFromCamera(mouse, camera);
    
    const intersects = rayCaster.intersectObject(mesh,true);
    
    
    
    if (intersects.length>0) {
      //console.log(intersects[0].face.a,intersects[0].face.b,intersects[0].face.c);
      const faceIndex= intersects[0].faceIndex;
      const face = intersects[0].face
      const x = face.a;
      const y = face.b;
      const z = face.c;
      const collorAttribute = geometry.getAttribute('color');
      collorAttribute.setXYZ(x,250,0,0);
      collorAttribute.setXYZ(z,250,0,0);
      collorAttribute.setXYZ(y,250,0,0);
      collorAttribute.needsUpdate = true;
      
      console.log(face)
      console.log(x)
      
    }
  });

  //the renderer

  const renderer = new WebGLRenderer({ canvas: canvas });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xffffff, 1);
  //renderer.render(scene,camera);

  //controls

  const clock = new Clock();
  const cameraControls = new CameraControls(camera, canvas);

  cameraControls.dollyToCursor = true;

  //animtation

  const animate = () => {
    const detla = clock.getDelta();
    cameraControls.update(detla);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  });
}
