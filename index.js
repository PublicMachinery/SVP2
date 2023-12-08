import {menu} from "./menu.js";
import { threeMesh } from "./three.js";
import { customMesh } from "./three.js";
// Main structure

const win = window
window.addEventListener('load', () =>{
    console.log("loaded")
})
console.log(win)
const container = document.querySelector(".main-container")
const header= document.createElement("div");
header.className = "header";

const appcontainer= document.createElement("div");
appcontainer.className = "appcontainer"


const rightbar= document.createElement('div');
rightbar.className = "rightbar"

const viewer= document.createElement('div');
viewer.className = "viewer"

const menuC=menu;

const divs= [header,appcontainer]
const appelements = [viewer,rightbar]

for (let element of divs){
    container.appendChild(element);
}

for (let element of appelements){
    appcontainer.appendChild(element);
}

const title = document.createElement("h1")
title.textContent = "GEOMETRY VIEWER 🔍"

header.appendChild(title)

// three.js canvas

const canvas= document.createElement("canvas");
canvas.id="three-canvas";
const gui = document.createElement('div');
gui.id = "three-gui";
customMesh(canvas,gui);
console.log(canvas)



//  Spaces titles   

const rightbarTitle=document.createElement("h3")
rightbarTitle.textContent='Element Information'

const viewertitle= document.createElement("h3")
viewertitle.textContent='Geometry Analisis'

viewer.appendChild(viewertitle);
viewer.appendChild(canvas);
viewer.appendChild(gui);
rightbar.appendChild(rightbarTitle)

viewer.addEventListener("mouseenter",()=>{
    rightbar.style.backgroundColor = "yellow"
})
viewer.addEventListener("mouseout",()=>{
    rightbar.style.backgroundColor = "aqua"
})

