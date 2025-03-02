export const Modal = {
  wrapper: document.createElement('div'),
  ok: document.createElement('button'),
  open(props: {
    title: string
    description?: string
    icon?: string
    ok: { title: string; onClick?: () => void }
  }) {
    const wrapper = Modal.wrapper
    const ok = Modal.ok

    ok.classList.add(
      'w-auto',
      'bg-rosewood',
      'text-zinc-1000',
      'cursor-pointer',
      'py-2',
      'px-3',
      'rounded-[1.25rem]'
    )
    ok.appendChild(document.createTextNode(props.ok.title))
    ok.addEventListener('click', () => {
      props.ok?.onClick?.()
      wrapper.remove()
    })
    wrapper.classList.add(
      'bg-[rgba(0,0,0,0.4)]',
      'fixed',
      'left-0',
      'top-0',
      'z-10',
      'h-dvh',
      'w-dvw',
      'overflow-hidden',
      'flex',
      'justify-center',
      'items-center'
    )
    wrapper.setAttribute('role', 'alertdialog')
    wrapper.setAttribute('aria-modal', 'true')
    wrapper.setAttribute('aria-labelledby', 'dialog_label')
    wrapper.setAttribute('aria-describedby', 'dialog_desc')
    wrapper.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="md:px-10 px-6 py-8 bg-anti-flash-white rounded-lg md:w-[30rem] w-[21rem]">
          <div class="w-[2.5rem] h-[2.5rem] bg-rosewood rounded-full grid justify-self-center justify-center items-center mb-4">
          ${!!props.icon && `<img alt="icon" src="${props?.icon}">`}
          </div>
          <h4 class="mb-2 text-2xl text-center uppercase">${props.title}</h4>
          <p class="text-center text-sm">${props.description}</p>
          <footer class="flex justify-center gap-3 mt-4 items-center">
          </footer>
        </div>
    `
    )
    wrapper.querySelector('footer')?.appendChild(ok)
    document.body.insertAdjacentElement('beforeend', wrapper)
  },
  close() {
    Modal.wrapper.remove()
  },
}
