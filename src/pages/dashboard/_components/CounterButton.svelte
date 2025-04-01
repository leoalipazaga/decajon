<script lang="ts">
  import { boxes } from 'consts'
  import {
    getLangFromUrl,
    useTranslatedPath,
    useTranslations,
  } from 'i18n/utils.ts'
  import type { Product } from 'adapters/storage.types.ts'
  import { ProviderCart } from 'adapters/cart.ts'
  import { getCount } from './counter-store.svelte.ts'

  interface Props {
    id: number
  }

  const lang = getLangFromUrl(new URL(location.pathname, location.origin))
  const t = useTranslations(lang)
  const translatePath = useTranslatedPath(lang)
  let { id }: Props = $props()
  const onUpdateCart = () => {
    const item = boxes.get(id) as unknown as Product
    ProviderCart.updateCart({ ...item, count: getCount() || 1 })
  }
</script>

<a
  class="col-span-2 w-auto bg-rosewood text-zinc-1000 py-2 px-3 rounded-[1.25rem] row-start-4 mt-6 text-nowrap md:col-span-1 md:col-start-1 md:row-start-5 md:mt-0 md:self-end"
  id="shop"
  href={translatePath('/dashboard/cart/')}
  onclick={onUpdateCart}>{t('common.buyNow')}</a
>
