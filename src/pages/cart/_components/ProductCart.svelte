<script lang="ts">
  import type { Snippet } from 'svelte'
  import { currency } from 'utils'

  interface Props {
    id: number
    alt: string
    src: string
    title: string
    volumen: number
    price: number
    count: number
    counter: Snippet
    action: Snippet
  }

  const { alt, src, title, volumen, price, count, action, counter }: Props =
    $props()
  let total = $derived(count * price)
</script>

<article
  class="grid grid-cols-2 grid-rows-[1fr_repeat(3,auto)] gap-x-4 border-b-eerie-black py-9 [border-bottom:1px_solid] sm:grid-cols-[minmax(107px,auto)_1fr_1fr] sm:grid-rows-[repeat(3,auto)] sm:py-1.5 md:grid-cols-[minmax(0,180px)_1fr_1fr]"
>
  <img
    {src}
    class="aspect-square object-cover row-start-1 col-start-1 -row-end-1"
    {alt}
  />
  <h1
    class="col-start-2 uppercase row-start-1 self-end text-xs sm:text-nowrap sm:text-left md:text-sm"
  >
    {title}
  </h1>
  <p
    class="col-start-2 row-start-2 text-xs sm:self-center sm:text-nowrap sm:text-left md:text-sm"
  >
    Botella {volumen}ml
  </p>
  <p
    class="col-start-2 row-start-3 text-xs sm:text-nowrap sm:text-left md:text-sm"
  >
    Precio: {currency(price)}
  </p>
  <footer
    class="col-start-2 row-start-4 mt-1.5 grid grid-cols-[auto_auto] items-center justify-start gap-x-[0.375rem] sm:col-start-3 sm:row-start-2 sm:mt-0 sm:grid-cols-[auto_auto_auto] sm:justify-end sm:gap-x-4"
  >
    <span
      class="col-start-1 row-start-1 block text-nowrap rounded-[1.25rem] border border-rosewood px-7 py-1.5 text-xs text-eerie-black lg:px-[2.625rem] lg:text-base"
    >
      {currency(total)}
    </span>
    <div class="">
      {@render counter?.()}
    </div>
    <div class="col-start-2 row-start-1 justify-self-end sm:col-start-3">
      {@render action?.()}
    </div>
  </footer>
</article>
