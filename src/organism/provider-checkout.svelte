<script lang="ts">
  import { ProviderCart } from 'adapters/cart'
  import ProductCheckout from 'organism/product-checkout.svelte'

  const cart = ProviderCart.getCart()
</script>

<ProductCheckout {cart} />
