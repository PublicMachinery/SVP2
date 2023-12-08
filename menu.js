export const menu = document.createElement("div");
menu.className = "menu";
const menuList = document.createElement("ul");
const menuOptions = ["Geometry", "BIM", "Calculation", "Statics"];

for (let opt of menuOptions) {
  const li=document.createElement("li");
  li.textContent=opt;
  menuList.append(li);
}

menu.append(menuList)
// export function menuComp (){
//     return menu
// }
