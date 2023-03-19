export function isUrlValid(userInput) {
    const res = userInput.match(
        // eslint-disable-next-line max-len
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (res == null) return false;
    else return true;
}

export function isClockStyleCapital() {
    const clockClass = document.getElementById('main-heading-slider');
    if (clockClass.classList.contains('default-text-style')) return true;
    else return false;
}
