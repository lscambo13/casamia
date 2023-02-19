
export let customBookmarks = [];
export let wallpapersList = [];

export function setCustomBookmarks(text) {
    customBookmarks = text;
}

export function pushCustomBookmarks(text) {
    customBookmarks.push(text);
}

export function setWallpapersList(text) {
    wallpapersList = text;
}


