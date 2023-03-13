import { customMesh } from "./three.js";

// Main structure

const container = document.querySelector(".main-container");
const header = document.createElement("div");
header.className = "header";

const appcontainer = document.createElement("div");
appcontainer.className = "appcontainer";

const rightbar = document.createElement("div");
rightbar.className = "rightbar";

const viewer = document.createElement("div");
const totalHeight = window.screen.height;
const totalWidth = window.screen.width;
console.log(totalHeight)
console.log(totalWidth)
viewer.className = "viewer";
viewer.style.height = `${totalHeight} + px`;

const divs = [appcontainer];
const appelements = [viewer];

for (let element of divs) {
  container.appendChild(element);
}

for (let element of appelements) {
  appcontainer.appendChild(element);
}

const title = document.createElement("h1");
title.textContent = "GEOMETRY VIEWER 🔍";

//header.appendChild(title);

// three.js canvas

const canvas = document.createElement("canvas");
canvas.id = "three-canvas";
const gui = document.createElement("div");

//  Spaces titles

const rightbarTitle = document.createElement("h3");
rightbarTitle.textContent = "Element Information";

const viewertitle = document.createElement("h3");
viewertitle.textContent = "Geometry Analisis";

//viewer.appendChild(viewertitle);
viewer.appendChild(canvas);
viewer.appendChild(gui);

//rightbar.appendChild(rightbarTitle);

viewer.addEventListener("mouseenter", () => {
  rightbar.style.backgroundColor = "yellow";
});
viewer.addEventListener("mouseout", () => {
  rightbar.style.backgroundColor = "aqua";
});

//const headerHeight = document.querySelector('.header').offsetHeight;

//console.log(headerHeight)

gui.id = "three-gui";
customMesh(canvas,gui);

function loaded() {
  canvas.style.width = "auto";
  const height = window.innerHeight;
  canvas.style.height = `${height * 0.9}px`;
}


