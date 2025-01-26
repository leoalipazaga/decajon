<script lang="ts">
  import { getCart } from 'adapters/storage'
  import { getLangFromUrl, useTranslations } from 'i18n/utils'
  import { currency } from 'utils'

  const lang = getLangFromUrl(new URL(location.pathname, location.origin))
  const t = useTranslations(lang)

  const cart = getCart()
  const getNameById = (id: number) => {
    if (id === 1) {
      return 'Vodka'
    }
    if (id === 2) {
      return 'Vodka Gin'
    }

    return 'Vodka Siembra'
  }
</script>

<div class="col-span-2 grid grid-cols-2 px-[0.625rem] py-4">
  <h4 class="font-thabit text-base font-bold">{t('checkout.product')}</h4>
  <h4 class="justify-self-end font-thabit text-base font-bold">
    {t('common.subtotal')}
  </h4>
</div>
{#each cart as product (product.id)}
  <div class="px-[0.625rem] col-span-2 grid grid-cols-2 border-b py-4">
    <p class="text-base">{getNameById(product.id)}</p>
    <span class="col-start-1 row-start-2 text-base">{product.volumen}ml</span>
    <p class="justify-self-end text-base">
      {currency(product.price)}
    </p>
  </div>
  <div class="col-span-2 flex border-b px-[0.625rem] py-4">
    <p class="text-base">{t('checkout.count')}:</p>
    <p class="justify-self-end text-base">
      <span>{product.count}</span>
      {t('checkout.products')}
    </p>
  </div>
  <div class="col-span-2 grid grid-cols-2 border-b px-[0.625rem] py-4">
    <p class="text-base">{t('common.subtotal')}:</p>
    <p class="font-bold justify-self-end text-base">
      {currency(product.count * product.price)}
    </p>
  </div>
{/each}
