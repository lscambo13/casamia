import { changeHeadingStyles } from '../utils.js';

export function animateCarouselDirection(event, id, ms, direction) {
    document.getElementById(id).
        classList.add(`animation_carousel_${direction}_hide`);
    setTimeout(() => {
        if (direction == 'left') changeHeadingStyles(event, -1);
        if (direction == 'right') changeHeadingStyles(event, 1);
        document.getElementById(id).
            classList.add(`animation_carousel_${direction}_appear`);
        setTimeout(() => {
            document.getElementById(id).
                classList.remove(`animation_carousel_${direction}_appear`);
        }, ms);
    }, ms);
}
