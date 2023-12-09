
import {mapPolygons} from './mapPolygons.js';
import { mapLines } from './mapPolygons.js';
import { mapLinesCloser,mapLinesLarge } from './mapPolygons.js';
import { mapPoints,mapPointsTrip } from './mapPolygons.js';

let pointC= mapPointsTrip[0]['features']
// debugger
//const testPolygons=(mapPolygons.features[0].geometry.coordinates)
mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYXNtZW5hIiwiYSI6ImNsbXlqZjY0bjEzZGYyamxpOHBwMGxqczMifQ.y8mLdsITvhs0VkXdZXxx0Q';
const map = new mapboxgl.Map({
container: 'map',
// container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/tomasmena/clm87qlc2014001pfg85j9v96', // style URL
center: [20.2040871486724,65.5804451373921], // starting position [lng, lat]
zoom: 6

 // starting zoom
});

// for (let coord of testPolygons){
//     console.log(coord)
// }
const colors={
    points:{
        'Trip':'red',
        'Biofuel':'green',
        'Cesar':'yellow'
    },
    lines:{
        '180kmboundary':'#0000FF',
        'Arcticline_':'cyan',
        'Railway':'#00001B',
        'Cultivationboarder':'#7D7301',       
    },
    polygons:{
        'Intactforest':'white',
        'Military':'blue',
        'Aram':'magenta'
    }
}
const geojson = {
    type:'FeatureCollection',
    features:[{
        type: 'Feature',
        geometry: {
            type:'Point',
            coordinates:[18.583210,66.976418]
            },
            properties:{
            title:'Tjamotis Damm',
            description:'<iframe src="https://speckle.xyz/embed?stream=521b67e98f&transparent=true&autoload=true&hidecontrols=true&noscroll=true&hidesidebar=true&hideselectioninfo=true" width="300" height="300" frameborder="0"></iframe>'
            }           
        }]
    };

map.on('load',()=>{
    
    for(let pol of mapPolygons){
        let srcName= `testPol${mapPolygons.indexOf(pol)}`; 
        // const feat=pol.features
        
        // const featList=[]

        

        // for (let pf of feat){
        //     const flCoord=((pf.geometry.coordinates).flat(1))
        //     const featob={
        //             type:'Feature',
        //             geometry:{
        //                 type:'MultiPolygon',
        //                 coordinates:flCoord
        //             }}
        //     featList.push(featob)
        //  }

        // const geojsonPol={
        //     type:'FeatureCollection',
        //     name:pol.name,
        //     features:featList
        // }
        // console.log(geojsonPol)

        map.addSource(
            `${srcName}`,{
                type:'geojson',
                data:pol,
                }
            )

        const polCol=Object.keys(colors.polygons)
        let color=''
        for (let c of polCol){
            let polName=(pol.name)
            if(polName.includes(c)){
            color=(colors.polygons[`${c}`])
            }
            
        }
        map.addLayer({
        'id': `${srcName}`,
        'type': 'fill',
        'source': `${srcName}`, // reference the data source
        'layout': {},
        'paint': {
        'fill-color': color, // blue color fill
        'fill-opacity': 0.7
        }
        });
        // Add a black outline around the polygon.
        

        map.addLayer({
        'id': `${srcName}`+ 'outline',
        'type': 'line',
        'source': `${srcName}`,
        'layout': {},
        'paint': {
        'line-color': color,
        'line-width': 2
        }
    });};



    for(let line of mapLinesLarge){
        let lineSrcName=`lineLarge${mapLinesLarge.indexOf(line)}`;
        
        map.addSource(
            `${lineSrcName}`,{
                type:'geojson',
                data:line,
                }
            );

        const lineCol=Object.keys(colors.lines)
        let color=''
        
        for (let c of lineCol){
            let lineName=(line.name)
           
            if(lineName.includes(c)){
                color=(colors.lines[`${c}`])
            }
        }
        // debugger    
        map.addLayer({
            'id': `${lineSrcName}`,
            'type': 'line',
            'source': `${lineSrcName}`, // reference the data source
            'layout': {},
            'paint': {
            'line-color': color, // blue color fill
            'line-width': 5,
            'line-dasharray':[1,2]},
                
        });};

    for(let line of mapLines){
        let lineSrcName=`line${mapLines.indexOf(line)}`;
        
        map.addSource(
            `${lineSrcName}`,{
                type:'geojson',
                data:line,
                }
            );
        const lineCol=Object.keys(colors.lines)
        let color=''
        for (let c of lineCol){
            let lineName=(line.name)
            console.log(lineName)
            console.log(c)
            if(lineName.includes(c)){
                color=(colors.lines[`${c}`])
            }
        }
        // debugger 
        map.addLayer({
            'id': `${lineSrcName}`,
            'type': 'line',
            'source': `${lineSrcName}`, // reference the data source
            'layout': {},
            'paint': {
            'line-color': color, // blue color fill
            'line-width':4.5,
            },
                
        })};    

    for(let line of mapLinesCloser){
        let lineSrcName=`lineCloser${mapLinesCloser.indexOf(line)}`;
        console.log(lineSrcName)
        map.addSource(
            `${lineSrcName}`,{
                type:'geojson',
                data:line,
                }
            );
        
        map.addLayer({
            'id': `${lineSrcName}`,
            'type': 'line',
            'source': `${lineSrcName}`, // reference the data source
            'layout': {},
            'paint': {
            'line-color': 'blue', // blue color fill
            'line-width':1,
            // 'line-dasharray':[1,2]
        }
    });};
    
    const pointT = [{type:'FeatureCollection',name:'PointsTrip',
            features:pointC
           }];
    for(let p of pointT){
        let pointTrName=`pointsTrip${pointC.indexOf(p)}`;
    
        // debugger

        map.addSource(
            pointTrName,{
                type:'geojson',
                data:p,
                }
            );

        map.addLayer({
            'id': pointTrName,
            'type': 'circle',
            'source': pointTrName, // reference the data source
            'layout': {},
            'paint': {
                'circle-radius': 13,
                'circle-color': 'black',
                },   
            }
        );
        map.addLayer({
            'id': `${pointTrName}`+'_',
            'type': 'circle',
            'source': pointTrName, // reference the data source
            'layout': {},
            'paint': {
                'circle-radius': 8,
                'circle-color': '#B10425',
                },   
            }
        );
        
    };
    
    for(let pt of mapPoints){
        let lineSrcName=`pointsTrip${mapPoints.indexOf(pt)}`;
    
        map.addSource(
            lineSrcName,{
                type:'geojson',
                data:pt,
                }
            );
            
        // map.addLayer({
        //     'id': lineSrcName,
        //     'type': 'circle',
        //     'source': lineSrcName, // reference the data source
        //     'layout': {},
        //     'paint': {
        //         'circle-radius': 5,
        //         'circle-color': '#FF0000',
        //         },     
        // });
    };
                  
        // Add a new layer to visualize the polygon.
});


for (let feature of geojson.features){
    const el= document.createElement('div');
    el.className='marker';
    new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h3>${feature.properties.title} </h3><p> ${feature.properties.description}</p>`).setMaxWidth('600'))
    .addTo(map);
};  


