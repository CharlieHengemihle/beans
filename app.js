/* Imports */
import { renderBeans, renderAstroOption, getAstro, getBeans } from './fetch-utils.js';
/* Get DOM Elements */
const search = document.getElementById('form');
const beanList = document.getElementById('bean-list');

/* State */
let error = null;
let count = 0;
let astroSigns = [];
let beans = [];

/* Events */
window.addEventListener('load', async () => {
    findBeans();

    const response = await getAstro();

    error = response.error;
    astroSigns = response.data;



})

async function findBeans(name, astroSign) {
    const response = await getBeans(name, astroSign);

    error = response.error;
    count = response.count;
    beans = response.data;

    if (!error) {
        discplayBeans();
    }
}


/* Display Functions */
function discplayBeans() {
    beanList.innerHTML = '';

    for (const bean of beans) {
        const beanEl = renderBeans(bean);
        beanList.append(beanEl);
    }
}

// (don't forget to call any display functions you want to run on page load!)
discplayBeans();