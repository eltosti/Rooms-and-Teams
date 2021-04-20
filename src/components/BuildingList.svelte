<script>
  import RoomCard from "./RoomCard.svelte";
  import {save} from "../store/store";
  import {addRoomToSave} from "../store/actions";
  import {Divider}  from 'svelte-materialify'
    export let counter = false
    export let items
    const addToSave = (index)=>{
      addRoomToSave(items[index])
    }
</script>

<div>
    {#each items as item,i}
        <RoomCard bind:item={item} index={i} onAdd={addToSave} counter={counter}/>
        <Divider />
    {/each}
</div>


<style>

</style>