//import data from '../assets/midpoints.json' assert {type:'JSON'}



const fileList=['180kmboundary-Tomas_line.geojson','Arcticline_Tomas_line.geojson','Intactforest4_Tomas_pol.geojson']


async function polygons(files){
    const response = fetch(`./assets/${files}`);
    return (await response).json()

};


const allCoordPol=[]
const allCoordLine=[]

for(let file of fileList){
    if (file.includes('_line')){
        let lineFile=file;
        const coord =  await polygons(file);
        allCoordLine.push(coord);
    }
    else{
        let polFile=file;
        const coord =  await polygons(file);
        allCoordPol.push(coord);
    }
    
}

export const mapLines = allCoordLine
export const mapPolygons = allCoordPol
