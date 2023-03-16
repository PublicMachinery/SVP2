//import { resolve } from "mathjs";
import { customMesh } from "./three.js";
// import { customMesh } from "./three-async";

// Main structure

const container = document.querySelector(".main-container");
const header = document.createElement("div");
header.className = "header";

const appcontainer = document.createElement("div");
appcontainer.className = "appcontainer";

const rightbar = document.createElement("div");
rightbar.className = "rightbar-hidden";

const viewer = document.createElement("div");
const totalHeight = window.innerHeight || document.body.clientHeight;

const totalWidth = window.screen.width;

viewer.className = "viewer";
viewer.style.height = `${totalHeight} + px`;

const divs = [header,appcontainer,rightbar];
const appelements = [viewer];

for (let element of divs) {
  container.appendChild(element);
}

for (let element of appelements) {
  appcontainer.appendChild(element);
}

const title = document.createElement("h1");
title.textContent = "GEOMETRY VIEWER 🔍";

const canvas = document.createElement("canvas");
canvas.id = "three-canvas";

const gui = document.createElement("div");
header.append(title)

//  Spaces titles

const rightbarTitle = document.createElement("h3");
rightbarTitle.textContent = "Element Information";

const viewertitle = document.createElement("h3");
viewertitle.textContent = "Geometry Analisis";

//viewer.appendChild(viewertitle);
viewer.appendChild(canvas);
viewer.appendChild(gui);

//rightbar.appendChild(rightbarTitle);

// viewer.addEventListener("mouseenter", () => {
//   rightbar.style.backgroundColor = "yellow";
// });
// viewer.addEventListener("mouseout", () => {
//   rightbar.style.backgroundColor = "aqua";
// });


gui.id = "three-gui";

customMesh(canvas,gui);

// const canvasSel= document.getElementById('three-canvas');




