<script lang="ts">
  import { UserCart } from 'adapters/cart'
  import ProductCheckout from 'organism/product-checkout.svelte'

  const cart = UserCart.getCart()
</script>

<ProductCheckout {cart} />
