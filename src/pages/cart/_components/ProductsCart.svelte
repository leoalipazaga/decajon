<script lang="ts">
  import { onMount } from 'svelte'
  import { Storage, removeProduct, updateCount } from 'adapters/storage'
  import type { CartProduct } from 'adapters/storage.types.ts'
  import { currency } from 'utils'
  import Gin from 'images/decajon-gin-1.jpeg'
  import Siembra from 'images/siembra-1.jpeg'
  import Vodka from 'images/vodka-1.jpeg'
  import Trash from 'icons/trash.svg'
  import Modal from 'ui/Modal.svelte'
  import { products } from 'consts'
  import {
    getLangFromUrl,
    useTranslatedPath,
    useTranslations,
  } from 'i18n/utils'
  import Counter from './Counter.svelte'
  import ProductCart from './ProductCart.svelte'

  let cart = $state([] as CartProduct[])
  let total = $derived(
    cart.reduce((sum, item) => (sum += item.count * item.price), 0)
  )
  let t = $state<ReturnType<typeof useTranslations>>()
  let translatePath = $state<ReturnType<typeof useTranslatedPath>>()

  const getTitleById = (id: number) => {
    if (id === 1) {
      return 'DE CAJÓN VODKA'
    }
    if (id === 2) {
      return 'DE CAJÓN GIN'
    }

    return 'DE CAJÓN Siembra'
  }

  const getImgById = (id: number) => {
    if (id === 1) {
      return { src: Vodka.src, alt: 'Vodka' }
    }
    if (id === 2) {
      return { src: Gin.src, alt: 'Vodka Gin' }
    }
    return { src: Siembra.src, alt: 'Vodka Siembra' }
  }

  const onRemoveProduct = (id: number) => {
    cart = removeProduct({ id }) as CartProduct[]
  }

  const onChangeCount = (props: { id: number; count: number }) => {
    cart = updateCount(props)
  }

  onMount(() => {
    const store = Storage.session.getValue('DECAJON_STORAGE')
    cart = store?.cart
    const lang = getLangFromUrl(
      new URL(window?.location?.pathname, window?.location?.origin)
    )
    t = useTranslations(lang!)
    translatePath = useTranslatedPath(lang!)
  })
</script>

<header
  class="grid grid-rows-[auto_auto] sm:row-start-[auto] sm:grid-cols-[auto_auto_1fr]"
>
  <h1
    class="col-start-1 row-start-1 text-center text-xl uppercase sm:row-start-1 sm:text-left"
  >
    {t?.('cart.cartCheckout')}
  </h1>
  {#if cart?.length}
    <h1
      class="col-start-1 text-center text-xl uppercase sm:col-start-2 sm:row-start-1 sm:text-left"
    >
      &nbsp;({cart?.length}
      {cart?.length === 1 ? t?.('common.product') : t?.('common.produtcs')})
    </h1>
  {/if}
  <p
    class="hidden self-end justify-self-end text-rosewood sm:col-start-3 md:block"
  >
    {t?.('cart.continueShop')}
  </p>
</header>
{#if !cart?.length}
  <h2 class="uppercase text-sm py-6 border-y text-center border-y-eerie-black">
    {t?.('cart.empty')}
  </h2>
{/if}
{#each cart as item (item.id)}
  <ProductCart
    id={item.id}
    alt={getImgById(item.id).alt}
    src={getImgById(item.id).src}
    count={item.count}
    title={getTitleById(item.id)}
    volumen={products.get(item.id)!.volumen}
    price={products.get(item.id)!.price}
  >
    {#snippet counter()}
      <Counter
        count={item.count}
        onChange={(count) => onChangeCount({ count, id: item.id })}
      />
    {/snippet}
    {#snippet action()}
      <Modal title={t?.('cart.deleteArticle')}>
        {#snippet trigger({ onOpen })}
          <button
            class="[&&]:h-7 [&&]:w-7 bg-rosewood rounded-full flex items-center justify-center w-[2.5rem] h-[2.5rem]"
            onclick={onOpen}
          >
            <img src={Trash.src} alt="trash" />
          </button>
        {/snippet}
        {#snippet content()}
          <p class="text-center text-sm">
            {t?.('cart.deleteArticleQuestion')}
          </p>
          <p class="text-center text-sm">{t?.('cart.deleteArticleNoRevert')}</p>
        {/snippet}
        {#snippet actions({ onClose })}
          <button
            class="w-auto text-zinc-1000 py-2 px-3 rounded-[1.25rem] bg-zinc-1050"
            onclick={onClose}>{t?.('common.cancel')}</button
          >
          <button
            class="w-auto bg-rosewood text-zinc-1000 py-2 px-3 rounded-[1.25rem]"
            onclick={() => {
              onRemoveProduct(item.id)
              onClose()
            }}>{t?.('common.delete')}</button
          >
        {/snippet}
      </Modal>
    {/snippet}
  </ProductCart>
{/each}
{#if cart?.length}
  <article
    class="grid grid-cols-[auto_1fr] grid-rows-[repeat(5,auto)] gap-y-4 border-b border-b-eerie-black py-9 sm:ml-auto sm:w-1/2"
  >
    <p class="col-start-1 -col-end-1 row-start-1">{t?.('cart.applyCoupon')}</p>
    <span class="col-start-1 row-start-2">{t?.('common.subtotal')}</span>
    <span class="col-start-2 row-start-2 justify-self-end">
      {currency(total)}</span
    >
    <span class="col-start-1 -col-end-1 row-start-3 h-0.5 bg-eerie-black"
    ></span>
    <span class="col-start-1 row-start-4">Total:</span>
    <span class="col-start-2 row-start-4 justify-self-end"
      >{currency(total)}</span
    >
    <a
      href={translatePath?.('/checkout')}
      class="w-auto text-center bg-rosewood text-zinc-1000 py-2 px-3 rounded-[1.25rem] col-start-1 -col-end-1 row-start-5 mt-4"
      >{t?.('cart.continuePayment')}</a
    >
  </article>
{/if}
