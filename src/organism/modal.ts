export const closeModal = (modal: HTMLDialogElement) => {
  const body = document.body
  modal.close()
  // if (isTouchDevice()) {
  //   disableTouchControls(modal)
  // }
  setTimeout(() => {
    modal.classList.add('ac-modal--close')
    body.style.overflow = 'auto'
  }, 200)
}

export const openModal = (modal: HTMLDialogElement) => {
  const body = document.body

  body.style.overflow = 'hidden'
  modal.classList.remove('ac-modal--close')
  modal.showModal()
  // if (isTouchDevice()) {
  //   enableTouchControls(modal)
  // }

  modal.addEventListener(
    'click',
    (event) => {
      if (event.target === modal) {
        closeModal(modal)
      }
    },
    { once: true }
  )
}
