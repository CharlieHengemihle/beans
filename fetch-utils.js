const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getBeans(name, astroSign){
    let query = client.from('beanie_babies').select('*', { count: 'exact' }).order('title').limit(100);
    
    if (name) {
        query = query.ilike('title', `%${name}`);
    }

    if (astroSign) {
        query = query.eq('astroSign', astroSign);
    }
    const response = await query;

    return response;
}

export async function getAstroSigns() {
    const response = await client.from('beanie_baby_astro_signs').select();
    return response;
}

export function renderAstroOption(astroSign) {
    const option = document.createElement('option');
    option.value = astroSign.name;
    option.textContent = astroSign.name;
    return option;
}

export function renderBeans(bean) {
    const li = document.createElement('li');
    li.classList.add('card');

    const img = document.createElement('img');
    img.src = bean.image;
    img.alt = bean.title;

    const content = document.createElement('div');
    content.classList.add('content');

    const h2 = document.createElement('h2');
    h2.textContent = bean.title;

    const attributes = document.createElement('p');
    attributes.classList.add('attributes');

    const beast = document.createElement('span');
    beast.textContent = bean.animal;

    const subtheme = document.createElement('span');
    subtheme.textContent = bean.subtheme;

    const release = document.createElement('span');
    release.textContent = bean.releaseYear;

    const astroSign = document.createElement('span');
    astroSign.textContent = bean.astroSign;

    attributes.append(beast, subtheme, astroSign);

    content.append(h2, attributes, release);

    li.append(img, content);

    return li;
}