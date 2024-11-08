
export function createModal({ title, message, confirmText = '확인', cancelText = '취소' }) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="modal-buttons">
                <button class="btn modal-cancel">${cancelText}</button>
                <button class="btn modal-confirm">${confirmText}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const confirmButton = modal.querySelector('.modal-confirm');
    const cancelButton = modal.querySelector('.modal-cancel');

    cancelButton.addEventListener('click', () => closeModal(modal));
    return { modal, confirmButton };
}


export function openModal(modalElement) {
    modalElement.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}


export function closeModal(modalElement) {
    modalElement.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalElement.remove(); 
}
