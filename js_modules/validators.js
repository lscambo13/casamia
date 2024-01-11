export function isUrlValid(userInput) {
    if (!URL.canParse) return true; // for Samshit and Opera mobile
    try {
        return URL.canParse(userInput);
    } catch (err) {
        return false;
    }
}

export function isClockStyleCapital() {
    const clockClass = document.getElementById('main-heading-slider');
    if (clockClass.classList.contains('default-text-style')) return true;
    else return false;
}
