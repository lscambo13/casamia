const modal = document.getElementById('advanced-settings-modal');
const modalBackground =
    document.getElementById('advanced-settings-modal-background-overlay');

export function openAdvancedSettings() {
    modal.style.display = 'block';
    modalBackground.style.display = 'block';
};

export function closeAdvancedSettings() {
    modal.style.display = 'none';
    modalBackground.style.display = 'none';
};
