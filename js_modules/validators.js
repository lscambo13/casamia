export function isUrlValid(userInput) {
    try {
        new URL(userInput);
        return true;
    } catch (err) {
        return false;
    }
}

export function isClockStyleCapital() {
    const clockClass = document.getElementById('main-heading-slider');
    if (clockClass.classList.contains('default-text-style')) return true;
    else return false;
}
