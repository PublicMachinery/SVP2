//import data from '../assets/midpoints.json' assert {type:'JSON'}

async function panels(){
    const response = fetch('./assets/panels.json');
    return (await response).json()
};
export const panelsr =  await panels();

async function pointsSortedObj(){
    const response = fetch('./assets/pointsSorted.json');
    return (await response).json()
};

export const pointsSorted= await pointsSortedObj();

async function indexesSortedObj(){
    const response = fetch('./assets/indexesSorted.json');
    return (await response).json()
};

export const indexesSorted = await indexesSortedObj();