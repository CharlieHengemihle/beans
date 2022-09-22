const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getBeans(title, astroSign){
    let query = client.from(beanie_baby_themes).select('*', { count: exact}).order('name').limit(100);
    if (title) {
        query = query.ilike('name', `%${title}`);
    }

    if (astroSign) {
        query = query.eq('astroSign', astroSign);
    }
    const response = await query;
    return response;
}

export async function getAstro() {
    const response = await client.from(beanie_baby_astroSigns).select();
    return response;
}

export function renderAstroOption(sign) {
    const option = document.createElement('option');
    option.value = sign.name;
    option.textContent = sign.name;
    return option;
}

export function renderBeans(bean) {
    const li = document.createEl('li');
    li.classList('card');

    const img = document.createElement('img');
    img.src = bean.image
    img.alt = bean.title

    const beast = document.createElement('span');
    beast.textContent = bean.animal;

    const subtheme = document.createElement('span');
    subtheme.textContent = bean.subtheme;

    const release = document.createElement('span');
    release.textContent = bean.releaseYear;

    
}