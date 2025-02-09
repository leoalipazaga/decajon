<script lang="ts">
  import { type Snippet } from 'svelte'
  import Notification from 'icons/notification.svg'

  interface Props {
    title: string
    icon?: string
    actions?: Snippet<[{ onClose: () => void }]>
    content: Snippet
    trigger: Snippet<[{ onOpen: () => void }]>
  }
  let dialog: HTMLDivElement
  let open = $state(false)
  const {
    actions,
    icon = Notification.src,
    content,
    trigger,
    title,
  }: Props = $props()

  const onOpen = () => {
    open = true
  }

  const onClose = () => {
    open = false
  }

  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }

    if (!open) {
      document.body.style.overflow = 'auto'
    }
  })
</script>

{@render trigger({ onOpen })}
<div
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="dialog_label"
  aria-describedby="dialog_desc"
  bind:this={dialog}
  class="bg-[rgba(0,0,0,0.4)] fixed left-0 top-0 z-10 h-dvh w-dvw overflow-hidden flex justify-center items-center {!open
    ? 'invisible'
    : 'visible'}"
  onclick={onClose}
>
  <div
    class="md:px-10 px-6 py-8 bg-anti-flash-white rounded-lg md:w-[30rem] w-[21rem]"
    onclick={(e) => e.stopPropagation()}
  >
    <div
      class="w-[2.5rem] h-[2.5rem] bg-rosewood rounded-full grid justify-self-center justify-center items-center mb-4"
    >
      <img src={icon} alt="icon" />
    </div>
    <h4 class="mb-2 text-2xl text-center uppercase">{title}</h4>
    {@render content()}
    <footer class="flex justify-center gap-3 mt-4 items-center">
      {@render actions?.({ onClose })}
    </footer>
  </div>
</div>
