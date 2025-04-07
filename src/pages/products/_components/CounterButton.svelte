<script lang="ts">
  import { products } from 'consts'
  import { getLangFromUrl, useTranslations } from 'i18n/utils.ts'
  import type { Product } from 'adapters/storage.types.ts'
  import { UserCart } from 'adapters/cart.ts'
  import { getCount } from './counter-store.svelte.ts'
  import { Toast } from 'ui/Toast.ts'

  interface Props {
    id: number
  }

  const getTitleById = (id: number) => {
    if (id === 1) {
      return 'DE CAJÓN VODKA'
    }
    if (id === 2) {
      return 'DE CAJÓN GIN'
    }

    return 'DE CAJÓN Siembra'
  }

  const lang = getLangFromUrl(new URL(location.pathname, location.origin))
  const t = useTranslations(lang)
  let { id }: Props = $props()

  const name = getTitleById(id)
  const onUpdateCart = () => {
    const item = products.get(id) as Product
    new Toast({
      text: `${name} ${t('cart.productAddedToCart')}`,
    })
    UserCart.updateCart({ ...item, count: getCount() || 1 })
  }
</script>

<button
  class="col-span-2 w-auto bg-rosewood text-zinc-1000 py-2 px-3 rounded-[1.25rem] row-start-4 mt-6 text-nowrap md:col-span-1 md:col-start-1 md:row-start-5 md:mt-0 md:self-end"
  id="shop"
  onclick={onUpdateCart}>{t('common.buyNow')}</button
>
