const $ = document.querySelector.bind(document)

interface ToastProps {
  autoClose?: boolean | number
  position?: `${ToastPositionY}-${ToastPositionX}`
  text: Element | string
  onClose?: () => {}
}
type ToastPositionX = 'right' | 'left' | 'center'
type ToastPositionY = 'top' | 'bottom'
type ToastPosition = `${ToastPositionY}-${ToastPositionX}`
const DEFAULT_TOAST_PROPS = {
  position: 'top-right' as ToastPosition,
  autoClose: 3000,
}

export class Toast {
  #toast: HTMLDivElement
  #autoCloseTimeout: NodeJS.Timeout | undefined

  constructor(props: ToastProps) {
    this.#toast = document.createElement('div')
    this.#toast.classList.add(
      ..."relative box-border min-w-80 rounded-lg border border-eerie-black bg-anti-flash-white p-4 after:absolute after:right-1 after:top-0.5 after:cursor-pointer text-sm after:text-lg after:content-['\\00d7']".split(
        /\s/
      )
    )
    this.#toast.addEventListener('click', this.remove.bind(this))
    const position = props.position ?? DEFAULT_TOAST_PROPS.position
    const autoClose = props.autoClose ?? DEFAULT_TOAST_PROPS.autoClose
    const text = props.text
    this.update({ text, position, autoClose })
  }

  set autoClose(autoClose: boolean | number) {
    if (!autoClose) return
    this.#autoCloseTimeout = setTimeout(
      this.remove.bind(this),
      typeof autoClose === 'number' ? autoClose : DEFAULT_TOAST_PROPS.autoClose
    )
  }

  set position(position: ToastPosition) {
    const pos = createPosition(position)
    const classContainer = createClassContainer(pos)
    const $container = $(`[data-position]`) || createContainer(pos)
    $container.classList.add(...classContainer.split(/\s/))
    document.body.append($container)
    $container.append(this.#toast)
    // $container.insertAdjacentElement('afterbegin', this.#toast)
  }

  set text(value: Element | string) {
    this.#toast.replaceChildren(value)
  }

  show() {}

  update(props: Partial<ToastProps>) {
    Object.entries(props).forEach(([key, value]) => {
      this[key as 'text' | 'position' | 'autoClose'] = value as never
    })
  }

  remove() {
    const $container = $('[data-position]')
    this.#toast.remove()
    if (!$container?.hasChildNodes()) {
      $container?.remove()
    }
    clearTimeout(this.#autoCloseTimeout)
  }
}

const createPosition = (position: ToastPosition) => {
  const pos = [
    position.includes('top') && 'top-0',
    position.includes('bottom') && 'bottom-0',
    position.includes('right') && 'right-0',
    position.includes('left') && 'left-0',
  ]
    .filter(Boolean)
    .join(' ')

  return pos
}

const createClassContainer = (positionClass: string) => {
  return `fixed z-[1000] m-3 flex flex-col gap-2 hover:cursor-pointer ${positionClass}`
}

const createContainer = (positionClass: string) => {
  const toastClass = createClassContainer(positionClass)
  const $toastContainer = document.createElement('div') as HTMLDivElement
  $toastContainer.classList.add(...toastClass.split(/\s/))
  $toastContainer.dataset.position = positionClass
  return $toastContainer
}
