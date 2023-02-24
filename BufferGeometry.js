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
import { cross, index, norm, typeOf } from "mathjs";
CameraControls.install({THREE : subsetOfTHREE});
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { panelsr,pointsSorted,indexesSorted } from "./src/custom_mesh";


export function customMesh(canvas,guiCont){

    
    // Scene

    const scene= new Scene();
    scene.background= null;

    //  CUSTOM the object

    // const panels2=panelsr
    // const sortedObjKeys = Object.keys(panelsr['L_1']).sort();

    // const sortedObject = {};

    // for (let key of sortedObjKeys){
    //     sortedObject[key]=panels2['L_1'][key]
    // }

    // console.log(sortedObject)

    // const coords=[]
    // const coords2=[]
    // const normals=[]

    const edgesMaterialT= new LineBasicMaterial({
        color:0x0000ff
    });

    
    // for(const l in sortedObject){
    //     //console.log(l)
    //     coords.push(sortedObject[l])
    
    // }

    // for(let a in coords){
    //     const arr1= coords[a][0]
    //     const arr2=coords[a][1]
    //     const normC= cross(arr1,arr2)
        
    //     for(let v of coords[a]){
    //         coords2.push(v)
    //         normals.push(norm(normC));
    //     }
    //}
    //console.log(coords2)
    // const coordsAdd= []
    // for(let a of coords2){
    //     const sum = a.reduce((accumulator, currentValue) => accumulator + currentValue,0);
    //     (Math.round(sum))
    //     coordsAdd.push(JSON.stringify(a))
    // }
    
    const flatcoord=[].concat(...pointsSorted['points']);
    // const flatNormals=[].concat(...normals)
    const flatcoordsc=[]
    
    for(let v of flatcoord){
        const sclcrd=(v*0.0001)
        flatcoordsc.push(sclcrd)
    }
   
    const uniq_coords=[...new Set(coordsAdd)]
    //console.log(uniq_coords)
    const indexes = indexesSorted['indexes']

    // for(let i in coordsAdd){
    //     //console.log(i)
    //     for(let u in uniq_coords){
    //         let crdv= coordsAdd[i]
    //         let crdu= uniq_coords[u]
    //         if(crdv ===crdu ){
    //             indexes.push(u)
    //         }
    //     }
    // } 

    
     console.log(indexes)
    
    // OBJECTS 


    const vertices= new Float32Array(flatcoordsc)
    // const normalArrray = new Float32Array(flatNormals)
    const indexesArr = new Uint32Array(indexes)
    const geometry2 = new BufferGeometry();
    //geometry2.setIndex(indexes)
    //console.log(indexesArr)
    geometry2.setAttribute('position',new BufferAttribute(vertices,3));
    // geometry2.setAttribute('normal', new BufferAttribute(normalArrray,3))
    geometry2.setIndex( new BufferAttribute(indexesArr,1))
    //const bSphere =geometry2.computeBoundingBox();
   // console.log(bSphere)
    
   
   
   // Helpers



    const axes = new AxesHelper(1);
    axes.material.depthTest = true;
    const grid = new GridHelper();
    grid.material.depthTest = true;
    grid.renderOrder = 1;
    scene.add(axes);
    scene.add(grid);
    
    // the material

    const material= new MeshBasicMaterial({
        color: 0x5f92b9,
        polygonOffset:true,
        polygonOffsetFactor:1,
        polygonOffsetUnits:1,
        side:2
    });
    const materialp= new MeshPhongMaterial({
        color: 0x5f92b9,
        shininess: 100 ,
        flatShading: false,
        side:2
    });

    const edgesMaterial= new LineBasicMaterial({
        color:0x000000
    });

    
    
    const mesh = new Mesh(geometry2,material)
    const wireTriangle = new WireframeGeometry(geometry2);
    const wireframe= new LineSegments(wireTriangle,edgesMaterial)
    const meshT= new Mesh(geometry2,material);
    
    
    scene.add(meshT);
    scene.add(wireframe);
    
    
    // GUI
    const gui = new GUI({autoPlace : false});
    const min = -3;
    const max = 3; 
    const step = 0.001;
    gui.width = 800;
    gui.domElement.id = "three-gui";
    guiCont.append(gui.domElement);
    
    const colorParam= {
        color : 0xff0000,
    }
    
    gui.add(meshT.position,'x',min,max,step); 
    gui.addColor(colorParam,'color').onChange(()=>{
        meshT.material.color.set(colorParam.color);
        
    });
    
    // lights

    const light = new DirectionalLight();
    light.position.set(3,2,1).normalize();
    scene.add(light);

    const light2 = new AmbientLight(0xffffff,0.3);
    light.position.set(-3,2,-1).normalize();

    scene.add(light2);
    

    // camera;

    const camera= new PerspectiveCamera(50, canvas.clientWith / canvas.clientHeight);
    camera.position.z = 3;
    camera.position.y = 3;
    camera.position.x = 3;
    camera.lookAt(new Vector3(0,0,0))
    scene.add(camera);



    // Raycaster

    const rayCaster = new Raycaster();
    //const intersect = rayCaster.intersectObject(meshT);
    const mouse = new Vector2();
    
    let previuousSelectedUuid;
    
    window.addEventListener('pointermove',(event)=>{
        mouse.x = event.clientX / canvas.clientWidth * 2 -1 ;
        mouse.y = - (event.clientY / canvas.clientHeight) * 2+1 ;
        rayCaster.setFromCamera(mouse,camera);
        const intersects = rayCaster.intersectObject(meshT)
        if(intersects){
            console.log(intersects[0].index)
        }
    })
    
    
    
    

    // if (!intersects.length){
    //     resetPreviousSelection();
    //     return;
    // }

    //const firstIntersection = intersects[1];
    //firstIntersection.object.material.color.set('orange');
    
    // const obj = firstIntersection.object.geometry.uuid
    // console.log (obj)
    // //const isNotPrevious = previuousSelectedUuid !== firstIntersection.object.uuid;
   

    // console.log(intersects)  
    
    // controls

    // GUI

    //the renderer
    
    const renderer = new WebGLRenderer( { canvas : canvas } )
    
    renderer.setSize(canvas.clientWidth , canvas.clientHeight, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setClearColor(0xffffff,1);
    //renderer.render(scene,camera);
    
    //controls
    
    const clock = new Clock();
    const cameraControls = new CameraControls(camera,canvas);
    
    cameraControls.dollyToCursor=true;

    
    
    //animtation
    const  animate = () => {
        const detla = clock.getDelta();
        cameraControls.update(detla);
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }
    
    animate();

    window.addEventListener('resize',()=> {
        camera.aspect = canvas.clientWidth / canvas.clientHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth , canvas.clientHeight, false);
    });
    
    
   
}