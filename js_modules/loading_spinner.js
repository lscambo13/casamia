let previousClick = null;

export function hideLoading() {
    if (previousClick) {
        previousClick.classList.toggle('loader');
    }
    previousClick = null;
}
export function displayLoading(target) {
    const click = target;
    previousClick = click;
    click.classList.toggle('loader');
}
