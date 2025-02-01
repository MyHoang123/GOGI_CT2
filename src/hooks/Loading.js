
function OpenLoading() {
    const loadingModal = document.querySelector('.Loading_modal');
    if (loadingModal) {
        loadingModal.classList.remove('unactive')
    }
}
function CloseLoading() {
        const loadingModal = document.querySelector('.Loading_modal');
        if (loadingModal) {
            loadingModal.classList.add('unactive')
        }
}


export { OpenLoading, CloseLoading  }