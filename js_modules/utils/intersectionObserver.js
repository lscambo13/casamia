export function intersectionObserver(rootID, targetClass) {
    const targetClasses = document.getElementsByClassName(targetClass);
    const options = {
        root: document.getElementById(rootID),
        rootMargin: '0px',
        threshold: 0.5,
    };

    const callback = (entries) => {
        entries.forEach((entry) => {
            entry.isIntersecting ? localStorage
                .setItem('selected-widget-style', entry.target.id) : null;
            console.log(entry.target.id)
            console.log(entry.intersectionRatio)
        });
    };

    const observer = new IntersectionObserver(callback, options);

    for (const target of targetClasses) {
        observer.observe(target);
    }
};
