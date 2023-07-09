export function scrollPosition() {
    const slideritems = document.getElementsByClassName('widget-slide');

    // slider.addEventListener('scroll', (event) => {
    //     console.log(event.target);
    // });

    const intersection = new IntersectionObserver(
        (entries) => {
            console.log('------------');
            for (const entry of entries) {
                console.log(entry.target);
                console.log(entry.intersectionRect);
            }
        },
    );
    for (const item of slideritems) {
        intersection.observe(item);
    }
};
