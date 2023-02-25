export function wait(ms) {
    let now = Date.now();
    const end = now + ms;
    while (now < end) {
        now = Date.now();
    }
}
