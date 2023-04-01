export function redoOnboarding() {
    localStorage.setItem('onBoarding', '0');
    window.location.reload();
};
