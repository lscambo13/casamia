import { changeGlow } from './colors.js';
import { WALLPAPERS_URL } from './constants.js';
import { applyPreferences } from './load_preferences.js';
import { changeTextAccentColor } from './utils.js';

export let selectedWallpaper = null;
export let color = null;
export let wallpapersList = [];

export async function fetchWallpapersList() {
    // Add wallpapers to HTML
    let response = await fetch(
        WALLPAPERS_URL + 'wallpapers_list.json',
    );
    for (let i = 0; i <= 3 && response.status != 200; i++) {
        console.log(`CONNECTION ERROR: ${response.status}\nRetrying ${i}...`);
        response = await fetch(
            WALLPAPERS_URL + 'wallpapers_list.json',
        );
        if (i == 3) window.open('./pages/error', '_self');
    };
    // if (response.status == 200) {
    //     console.log(`Connection established: ${response.status}`);
    // }
    const text = await response.text();

    wallpapersList = JSON.parse(text);
    resolveWallpapers();
    populateWallpapersInDOM();
}

export async function setWallpaper(fileName, color) {
    selectedWallpaper = fileName;
    const overlay = document.getElementById('overlay');
    console.log('test ' + overlay.style.backdropFilter);
    overlay.style.backdropFilter = 'blur(1em)';
    const temp = new Image();
    temp.src = WALLPAPERS_URL + fileName;
    temp.onload = (e) => {
        applyWallpaper(selectedWallpaper);
        localStorage.setItem('wallpaper', selectedWallpaper);
        applyPreferences();
    };

    changeGlow(color);
    changeTextAccentColor(color);
    const inputThumb = fileName.split('.').join('-thumb.');
    applyWallpaper(inputThumb);
}

function applyWallpaper(input) {
    document.body.style.backgroundImage = 'url(' + WALLPAPERS_URL + input + ')';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
}

export function highlightSetWallpaper() {
    const availableWallpapers = document.getElementsByClassName('thumb-group');
    for (const n of availableWallpapers) {
        const thumbnail = n.getElementsByClassName('thumbnail')[0];
        const title = n.getElementsByClassName('thumb-title')[0];
        n.classList.add('animate');

        if (thumbnail.src.replace('-thumb', '').includes(selectedWallpaper)) {
            title.style.opacity = '1';
            n.classList.remove('animate');
            n.classList.add('highlighted');
        } else {
            title.style.opacity = '0';
            n.classList.add('animate');
            n.classList.remove('highlighted');
        }
    }
}


export function changeWallpaper(event) {
    event.stopPropagation();
    let selection = event.target.title;
    if (!selection) selection = event.target.childNodes[1].title;
    // console.log("clicks " + selection + event.target.childNodes[1].title);
    const wall = getWallpaperDetails(selection);
    setWallpaper(wall[0], wall[1]);
    highlightSetWallpaper();
}

export function getWallpaperDetails(title) {
    const wallpaper = wallpapersList.filter((item) => {
        return item.title == title;
    })[0].file;
    const color = wallpapersList.filter((item) => {
        return item.title == title;
    })[0].color;
    return [wallpaper, color];
}

function resolveWallpapers() {
    selectedWallpaper = localStorage.getItem('wallpaper');
    if (selectedWallpaper == null) {
        selectedWallpaper = wallpapersList[4].file;
        // var color = wallpapers_list[4].color;
        console.log(wallpapersList);
    }

    color = wallpapersList.filter((item) => {
        return item.file == selectedWallpaper;
    })[0].color;
}

function populateWallpapersInDOM() {
    const bar = document.getElementById('wallpapers');

    for (const n of wallpapersList) {
        let input = n.file;
        input = input.split('.').join('-thumb.');

        const thumb = document.createElement('div');
        thumb.className = 'thumb-group';
        thumb.setAttribute('onclick', 'changeWallpaper(event)');
        thumb.setAttribute('onkeypress', 'click_to_enter(event)');

        thumb.setAttribute('tabindex', '3');

        const div = document.createElement('div');
        div.innerHTML = n.title;
        div.className = 'thumb-title';
        thumb.appendChild(div);

        const img = document.createElement('img');
        img.src = WALLPAPERS_URL + input;
        img.className = 'thumbnail';
        img.title = n.title;
        thumb.appendChild(img);

        bar.appendChild(thumb);
    }
}
