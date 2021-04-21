<script>
  import {isMouseDownLeft, isMouseDownRight, save} from "../store/store";
  import {updateCell} from "../store/actions";
  import {onMount} from "svelte";
  import {writable} from "svelte/store"

  export let getColor
  export let size
  export let cellId
  export let cellInitialColor = "floralwhite"

  let cellColor = writable(cellInitialColor)
  let id = {
    x:parseInt(cellId.split("-")[0]),
    y:parseInt(cellId.split("-")[1])
  }
  let element;
  onMount(() => {
    element.onmouseenter = (ev) => {
      if ($isMouseDownRight) {
        $cellColor = getColor();
        updateCell(cellId, getColor(), true)
      }else if ($isMouseDownLeft){
        updateCell(cellId, "floralwhite", false)
        element.style.backgroundColor = "floralwhite"
      }
    }
    element.onmouseup = (ev) => {
      if (ev.button === 0) {
        $cellColor = getColor();
        updateCell(cellId, getColor(), true)
      }else if (ev.button === 2){
        element.style.backgroundColor = "floralwhite"
        updateCell(cellId, "floralwhite", false)
      }
    }
    element.onmouseleave = (ev) => {
      if ($isMouseDownRight) {
        $cellColor = getColor();
        updateCell(cellId, getColor(), true)
      }else if ($isMouseDownLeft){
        updateCell(cellId, "floralwhite", false)
        element.style.backgroundColor = "floralwhite"
      }
    }
  })

</script>


<div class="cell" style="--cell-size: {size}">
    <div class="internal-cell" id="{cellId}" bind:this={element} style="background-color: {$cellColor}">
    </div>
</div>

<style>
    .cell {
        width: var(--cell-size);
        height: var(--cell-size);
    }

    .internal-cell {
        width: 100%;
        height: 100%;
        border-top: inset 1px gray;
        border-right: inset 1px gray;
    }
</style>