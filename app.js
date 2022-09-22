/* Imports */
import { renderBeans, renderAstroOption, getAstroSigns, getBeans } from './fetch-utils.js';
/* Get DOM Elements */
const search = document.getElementById('form');
const beanList = document.getElementById('bean-list');
const signSelect = document.getElementById('astro');
/* State */
let error = null;
let count = 0;
let astroSigns = [];
let beans = [];

/* Events */
window.addEventListener('load', async () => {

    const response = await getAstroSigns();

    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }

});

async function findBeans(name, astroSign) {
    const response = await getBeans(name, astroSign);

    error = response.error;
    count = response.count;
    beans = response.data;

    if (!error) {
        displayBeans();
    }
}



function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstroOption(astroSign);
        signSelect.append(option);
    }
}


/* Display Functions */
function displayBeans() {
    beanList.innerHTML = '';

    for (const bean of beans) {
        const beanEl = renderBeans(bean);
        beanList.append(beanEl);
    }
}

// (don't forget to call any display functions you want to run on page load!)
// displayBeans();
// displayAstroSignOptions();