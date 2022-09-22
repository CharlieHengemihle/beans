/* Imports */
import { renderBeans, renderAstroOption, getAstroSigns, getBeans } from './fetch-utils.js';
/* Get DOM Elements */
const search = document.getElementById('form');
const beanList = document.getElementById('bean-list');
const signSelect = document.getElementById('astro');
const display = document.getElementById('displaying');
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

    displayNotifications();
    if (!error) {
        displayBeans();
    }
}

search.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(search);
    findBeans(formData.get('name'), formData.get('astroSign'));
});

/* Display Functions */
function displayBeans() {
    beanList.innerHTML = '';  

    for (const bean of beans) {
        const beanEl = renderBeans(bean);
        beanList.append(beanEl);
    }
}

function displayNotifications() {
    if (error) {
        display.classList.add('error');
        display.textContent = error.message;
    } else {
        display.classList.remove('error');
        display.textContent = `Showing ${beans.length} of ${count} found beans`;
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstroOption(astroSign);
        signSelect.append(option);
    }
}
// (don't forget to call any display functions you want to run on page load!)
// displayBeans();
// displayAstroSignOptions();