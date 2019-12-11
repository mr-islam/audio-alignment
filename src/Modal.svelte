{#if show}
<div class="modal">
  <div class="modal-overlay" tabindex="-1" data-close on:click={overlay_click} transition:fade={{duration: 150}}>
    <div class="modal-container" role="dialog" aria-modal="true">
      {#if title}
        <header>
          <h2>{title}</h2>
          <button data-close><icon id="close"/></button>
        </header>
      {/if}
      <main>
        <svelte:component this="{component}" bind:title={title} {props}/>
      </main>
    </div>
  </div>
</div>
{/if}

<script>
import { fade } from 'svelte/transition';

function overlay_click(e) {
    if ('close' in e.target.dataset)
        show = false;
}

function set_body_scroll(shown) {
    const s = {overflow: shown ? 'hidden' : '', height: shown ? '100vh' : ''};
    Object.assign(document.body.style, s);
}
$: set_body_scroll(show);

let title = '';
export let component;
export let props = {};
export let show = false;
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modal-container {
  width: 90vw;
  max-width: 450px;
  margin: 1rem auto 0.2rem;
  box-shadow: 0 3px 10px #555;
}
header {
  position: relative;
  background: #fbfbfb;
  border-radius: 3px 3px 0 0;
}
h2 {
  margin: 0;
  text-align: center;
}
main {
  padding: 0.5rem;
  background: #fbfbfb;
  max-height: 76vh;
  overflow-y: auto;
  border-radius: 0 0 3px 3px;
}
button[data-close] {
  position: absolute;
  top: -18px;
  right: -15px;
  z-index: 1;
  background: white;
  border-radius: 50%;
  padding: 0 0.2rem;
  border: 4px solid #666;
}
.icon-close {
  margin-top: 3px;
  width: 1.25rem;
  height: 1.25rem;
  pointer-events: none;
  margin-right: 1px;
}
</style>
