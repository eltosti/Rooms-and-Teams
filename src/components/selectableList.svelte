<script>
  import {MaterialApp} from 'svelte-materialify'
  let selected = null;
  let setSelected = i => {selected = i; console.log(i)};
  export let items;
</script>

<MaterialApp>
    <div class="listContainer">
        {#each items as item, index}
            <div on:click={()=>setSelected(index)}>
                <slot name="itemList"></slot>
            </div>
        {/each}
    </div>
</MaterialApp>


<style>
.listContainer{
    overflow: hidden;
}
</style>