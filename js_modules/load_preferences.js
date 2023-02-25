
export function loadLights() {
    // Lights out
    const checkboxWall = document.getElementById('toggle-wallpaper-cb');
    const overlay = document.getElementById('overlay');

    const wall = localStorage.getItem('disable_wallpaper');
    if (wall != null) {
        overlay.style.backgroundColor = wall;
        if (wall != 'rgba(0, 0, 0, 0.375)') {
            checkboxWall.checked = true;
        } else {
            checkboxWall.checked = false;
        }
    } else {
        checkboxWall.checked = false;
    }
}

export function loadBlur() {
    // Blur
    const checkboxBlur = document.getElementById('toggle-blur-cb');
    const overlay = document.getElementById('overlay');

    const blur = localStorage.getItem('blur_wallpaper');
    if (blur != null) {
        overlay.style.backdropFilter = blur;
        if (blur == 'blur(1em)') {
            checkboxBlur.checked = true;
        } else {
            checkboxBlur.checked = false;
        }
    } else {
        checkboxBlur.checked = false;
        overlay.style.backdropFilter = 'blur(0em)';
    }
}

export function loadLabs() {
    // Labs
    const checkboxLabs = document.getElementById('toggle-labs-cb');
    const labsDiv = document.getElementById('labs');

    const labs = localStorage.getItem('labs');
    if (labs != null) {
        labsDiv.style.display = labs;
        if (labs == 'block') {
            checkboxLabs.checked = true;
        } else {
            checkboxLabs.checked = false;
        }
    } else {
        checkboxLabs.checked = false;
    }
}

export function loadSettings() {
    loadBlur();
    loadLights();
    loadLabs();
}
