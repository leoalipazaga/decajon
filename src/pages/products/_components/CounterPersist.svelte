<script lang="ts">
  import { getItemBy } from 'adapters/storage.ts'
  import type { CartProduct } from 'adapters/storage.types.ts'
  import Counter from './Counter.svelte'
  import { set } from './counter-store.svelte.ts'

  interface Props {
    id: number
  }
  const { id }: Props = $props()
  let item: CartProduct | undefined = $state()
  const onIncrease = set
  const onDecrease = set
  if (window && window.sessionStorage) {
    item = getItemBy({ id })
  }
</script>

<Counter count={item?.count} {onIncrease} {onDecrease} />
