import { changeGlow } from './colors.js';
import { WALLPAPERS_URL } from './constants.js';
import { wallpapersList } from './database.js';
import { loadBlur } from './load_preferences.js';
import { changeTextAccentColor } from './utils.js';

export let selectedWallpaper = null;
export let color = null;

export function setWallpaper(fileName, color) {
    selectedWallpaper = fileName;
    const overlay = document.getElementById('overlay');
    console.log('test ' + overlay.style.backdropFilter);
    overlay.style.backdropFilter = 'blur(1em)';
    const temp = new Image();
    temp.src = WALLPAPERS_URL + fileName;
    temp.onload = (e) => {
        applyWallpaper(selectedWallpaper);
        localStorage.setItem('wallpaper', selectedWallpaper);
        loadBlur();
    };

    changeGlow(color);
    changeTextAccentColor(color);
    const inputThumb = fileName.split('.').join('-thumb.');
    applyWallpaper(inputThumb);
}

export function applyWallpaper(input) {
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

export function resolveWallpapers() {
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

