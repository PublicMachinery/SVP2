//import data from '../assets/midpoints.json' assert {type:'JSON'}

const fileList=['LargeLines_Arcticline.geojson',
'Line_Cultivationboarder.geojson',
'Point_BiofuelGenerator.geojson',
'Point_Cesarcoordinats.geojson',
'Line_Railway.geojson',
'PointTrip_Tripcoordinates.geojson',
'Pol_Laxede_Aramsfile.geojson',
'Pol_Military.geojson',
'LargeLines_180kmboundary.geojson',
'Pol_Intactforest4_Tomas.geojson'
]

async function polygons(files){
    const response = fetch(`./assets/${files}`);
    return (await response).json()

};

const allCoordPol=[]
const allCoordLine=[]
const allCoordLineCloser=[]
const allCoordPoints=[]
const allCoordLineLarge=[]
const allCoordPointTrip=[]

for(let file of fileList){
    if (file.includes('Line_')){
        let lineFile=file;
        const coord =  await polygons(file);
        allCoordLine.push(coord);
    };
    if(file.includes('_CloserLines')){
        let lineFileCloser=file;
        const coord= await polygons(file);
        allCoordLineCloser.push(coord);
    }
    if(file.includes('Point_')){
        let polFile=file;
        const coord =  await polygons(file);
        allCoordPoints.push(coord);
    }
    if(file.includes('Pol_')){
        let polFile=file;
        const coord =  await polygons(file);
        allCoordPol.push(coord);
    }
    if(file.includes('LargeLines_')){
        let polFile=file;
        const coord =  await polygons(file);
        allCoordLineLarge.push(coord);
    }
    if(file.includes('PointTrip_')){
        let polFile=file;
        const coord =  await polygons(file);
        allCoordPointTrip.push(coord);
    }
}

export const mapLines = allCoordLine
export const mapLinesCloser= allCoordLineCloser
export const mapPolygons = allCoordPol
export const mapPoints = allCoordPoints
export const mapPointsTrip= allCoordPointTrip
export const mapLinesLarge=allCoordLineLarge