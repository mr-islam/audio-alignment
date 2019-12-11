Segments: {regions.length + 1}

<button on:click={() => raw = !raw}>{raw ? 'raw' : 'form'}</button>
Text? <button on:click={() => raw = !raw}></button>

<section>
  {#if raw}
    <textarea bind:value={text} dir=auto></textarea>
    <textarea bind:value={text} dir=auto></textarea>
  {:else}
    <div></div>
    <div></div>
  {/if}
</section>

<script>
export let regions;
let raw = false;
</script>

<style>

</style>
