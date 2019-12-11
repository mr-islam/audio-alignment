<form on:submit|preventDefault={props.change_item}>
  <label>
    <select>
      <option disabled selected>Select previous file</option>
      {#each Object.entries(props.items) as [url, item]}
        <option value={url}>{url}</option>
      {/each}
    </select>
  </label>
  <label><input type=url placeholder=https://...></label>
  <label>
    <input type=file accept=audio/* on:change={file_change} bind:this={file_input} hidden>
    <button type=button on:click={() => file_input.click()}>Upload</button>
  </label>
  <button>Select</button>
</form>

<script>
export let props;
export const title = 'Select File';

let file_input;

function file_change() {
    const reader = new FileReader();
    reader.onload = e => {
        JSON.parse(e.target.result);
    };
    reader.readAsText(file_input.files[0]);
}
</script>

<style>
select, input {
  width: 98%;
}
label {
  display: block
}
</style>
