let previousClick = null;

export function hideLoading() {
    if (previousClick) {
        previousClick.classList.toggle('loader');
    }
    previousClick = null;
}
export function displayLoading(event) {
    // console.log(event);
    event.stopPropagation();
    // event.preventDefault();
    hideLoading();
    const click = event.target;
    previousClick = click;
    click.classList.toggle('loader');
}
