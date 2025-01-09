<script lang="ts">
  interface Props {
    count?: number
    onChange: (count: number) => void
  }

  let { count = 1, onChange }: Props = $props()
  let counter = $state(count)

  const onNext = () => {
    counter += 1
    onChange(counter)
  }

  const onPrev = () => {
    counter = Math.max(1, counter - 1)
    onChange(counter)
  }
</script>

<div
  class="flex col-start-1 row-start-1 min-w-min gap-1 sm:col-start-2 sm:gap-4 [&&]:px-2 flex-row items-center justify-between [&&]:p-1 text-nowrap rounded-[1.25rem] border border-rosewood px-7 py-1.5 text-xs text-eerie-black lg:px-[2.625rem] lg:text-base"
>
  <button
    class="bg-rosewood rounded-full flex items-center justify-center w-[2.5rem] h-[2.5rem] font-bold text-anti-flash-white [&&]:h-7 [&&]:w-7"
    onclick={onNext}>+</button
  >
  <span class="w-4 text-center font-bold">{counter}</span>
  <button
    class="bg-rosewood rounded-full flex items-center justify-center w-[2.5rem] h-[2.5rem] font-bold text-anti-flash-white [&&]:h-7 [&&]:w-7"
    onclick={onPrev}
  >
    -
  </button>
</div>
