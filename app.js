/* Imports */
import { renderBeans, renderAstroOption, getAstroSigns, getBeans } from './fetch-utils.js';
/* Get DOM Elements */
const search = document.getElementById('form');
const beanList = document.getElementById('bean-list');
const signSelect = document.getElementById('astro');
const display = document.getElementById('displaying');
// const more = document.getElementById('next');
/* State */
let error = null;
let count = 0;
let astroSigns = [];
let beans = [];

// let filterName = '';
// let filterType = '';
// let page = 1;
// let pageSize = 25;


let filter = {
    name: '',
    astroSign: ''
};

let paging = {
    page: 1,
    pageSize: 25,
};

/* Events */
window.addEventListener('load', async () => {


    const response = await getAstroSigns();

    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }

});

async function findBeans() {
    const response = await getBeans(filter, paging);
    
    error = response.error;
    count = response.count;
    beans = response.data;
    
    displayNotifications();
    if (!error) {
        displayBeans();
    }
}

// more.addEventListener('click', () =>
//     getMoreBeans()
// )

const observer = new IntersectionObserver((entries) => {
    for(const entry of entries) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            getMoreBeans();
        }
    }
})

async function getMoreBeans() {
    paging.page++;
    const response = await getBeans(filter, paging);

    error = response.error;
    count = response.count;
    const more = response.data;
    beans = beans.concat(more);

    displayNotifications();
    displayMoreBeans(more);

}

search.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(search);
    filter.name = formData.get('name');
    filter.astroSign = formData.get('astrology')

    paging.page = 1;

    findBeans(formData.get('name'), formData.get('astrology'));
});

/* Display Functions */
function displayBeans() {
    beanList.innerHTML = '';
    displayMoreBeans(beans); 
}

function displayMoreBeans() {
// moreBeans???
    let lastEl = null;
    for (const bean of beans) {
        const beanEl = renderBeans(bean);
        beanList.append(beanEl);
        lastEl = beanEl;
    }

    if(beans.length < count){
    observer.observe(lastEl);
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