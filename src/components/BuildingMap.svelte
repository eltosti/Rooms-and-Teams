<script>

import MapCell from "./MapCell.svelte";
  import {selectedColor} from "../store/store";
  import {MaterialApp, ButtonGroup,ButtonGroupItem} from "svelte-materialify"
  import {save} from "../store/store";
import {writable} from "svelte/store";

  export let cellSize
  export let size
  export let coloring = "black"
  $: coloring = $selectedColor
  let roomst
  $: roomst = $save[$save["activeBuilding"]].rooms
  let b = {...size}
  b.x = [...Array(b.x[0]).keys()]
  b.y = [...Array(b.y[0]).keys()]

  const getColor = () => {
    return coloring
  }
    const getInitialColor = (x, y) => {
    let c = ""
      $save[$save["activeBuilding"]].cellMap.forEach((r)=>{
        if (r.location.x == x && r.location.y==y){
          c = r.color;
        }
      })
      return c
    };
  const selectColor = (color)=>{
    return color === $selectedColor
  }

  let selected = "#000000"

</script>

<MaterialApp>
    <div class="con">
        <div style="height: 6.5vh; display: flex; overflow: auto">
            <div  class:selected={selected === "#000000"} style="flex-shrink: 0;margin-left: 0.5em;height: 1.6em;width: 1.6em; background-color: #000000"
                 on:click={()=> {$selectedColor = "#000000";selected = "#000000"} }>
            </div>
            {#each roomst as room}
                <div class:selected={selected === room.color} style="flex-shrink: 0;margin-left: 0.5em;height: 1.6em;width: 1.6em;background-color: {room.color}"
                     on:click={()=> {$selectedColor = room.color;selected = room.color}}>
                </div>
            {/each}
        </div>
        <div style="height: 85.5vh; overflow: scroll">
            {#each $save[$save["activeBuilding"]].existingCells as y,iy}
                <div class="row">
                    {#each y as x,ix}
                        <div>
                            {#if $save[$save["activeBuilding"]].existingCells[iy][ix] === 1}
                                <MapCell {getColor} size={cellSize} cellId={ix+"-"+iy} cellInitialColor={getInitialColor(ix,iy)}/>
                            {:else}
                                <MapCell {getColor} size={cellSize} cellId={ix+"-"+iy}/>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>

    </div>
</MaterialApp>



<style>
    .row {
        display: flex;
    }
    .selected{
        border: dashed black 2px;
    }
</style>