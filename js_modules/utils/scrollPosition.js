export function scrollPosition() {
    const slider = document.getElementById('main-heading-slider');

    slider.addEventListener(inter, (event) => {
        console.log(`${event} scroll`);
    });
};
