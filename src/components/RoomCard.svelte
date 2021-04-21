<script>


  import {Button, CardText, Dialog, Icon} from "svelte-materialify"
  import {mdiMinus, mdiPlus} from '@mdi/js';
  import {slide} from 'svelte/transition'
  import {create, earnings, size, time} from './utilFuctions'
  import HsvPicker from './HsvPicker.svelte'
  import {Color} from "svelte-colorpick";
  import {deleteItem, saveAmountChange, saveColorChange} from "../store/actions";

  export let expanded = false;

  export let onAdd;
  export let index;
  export let counter = false;
  let colorPickerOpen = false;


  const openColorPicker = () => colorPickerOpen = true
  let hasChange = false;


  let colorTimeOut = window.setTimeout(() => {
  }, 1000)



  export let handleColorChange = (newColor) => {
    window.clearTimeout(colorTimeOut)
    colorTimeOut = window.setTimeout(() => {
      saveColorChange(item.id, buildingColor);
    }, 1000)
    buildingColor = Color.rgb(newColor.detail).toHex();
  }

  const toggleExpanded = (e) => {
    (e.shiftKey) ? deleteSelf() : expanded = !expanded;

  }
  const add = () => saveAmountChange()
  const rest = () => count = Math.max(0, count - 1)
  let circleSize = 1.4
  let bb;
  const deleteSelf = () => {
    expanded = false
    deleteItem(item.id)
  };


  export let item
  let buildingColor
  $: buildingColor = item ? item.color : "red"
  let count =  (item) ? item.amount : 1;
  const addd = () => {
    count++
    saveAmountChange(item.id, count)
  }
  const restd = () => {
    count = Math.max(1, count - 1)
    saveAmountChange(item.id, count)
  }
</script>

<div>
    <div on:click={(e)=>{(e.shiftKey) ? deleteSelf() : expanded = !expanded;}} class="{expanded ? 'roomCardHeader selected ' : 'roomCardHeader '}">
        <div style="display: flex; align-items: baseline">
            {#if counter}
                <div class="RoomCardColor" on:click|stopPropagation={openColorPicker}
                     style="width: 1rem;height: 1rem; --Room-Card-Color: {buildingColor}">
                </div>
            {/if}
            <div style="padding-left: 0.5rem">
                {item.Name}
            </div>
        </div>
        <div>
            {#if counter}
                <span on:click|stopPropagation>
                <Button size="small" on:click={restd} icon><Icon path={mdiMinus}/></Button>
            </span>
                {count}
                <span on:click|stopPropagation>
                <Button size="small" on:click={addd} icon><Icon path={mdiPlus}/></Button>
            </span>
            {:else}
                <span on:click|stopPropagation>
                        <Button size="small" on:click={()=> onAdd(index)} icon><Icon path={mdiPlus}/></Button>
                </span>
            {/if}

        </div>
    </div>
    {#if expanded}
        <div class="roomCardContent" transition:slide>
            {#if item["Check Bonus"]}
                <div><b>Earnings: </b>{earnings(item)}</div>
            {/if}
            <div><b>Create: </b>{create(item)}</div>
            <div><b>Time: </b>{time(item)}</div>
            <div><b>Size: </b>{size(item)}</div>
            <div>{item.Benefit.Note}</div>
            <div>{item.Description}</div>
            {#if counter}
                <div style="display: flex; justify-content: flex-end; padding-top: 0.5rem">
                    <Button class="red white-text" on:click={deleteSelf}>Delete</Button>
                </div>
            {/if}
        </div>
    {/if}
    <Dialog bind:active={colorPickerOpen} width="400">
        <CardText>
            <div style="display: flex; justify-content: center">
                <HsvPicker on:colorChange={handleColorChange} startColor={buildingColor}/>
            </div>
        </CardText>
    </Dialog>
</div>


<style>
    .roomCardHeader {
        padding: 0.5em 1em 0 1em;
        display: flex;
        justify-content: space-between;
    }

    .selected {
        background-color: #41626D;
        color: white;
    }

    .roomCardContent {
        padding-left: 1em;
        padding-right: 1em;
        background-color: #78909c;
        color: white;
    }

    .roomCardName {
        display: flex;
        align-items: baseline;
        flex-direction: column;
    }

    .RoomCardColor {
        background-color: var(--Room-Card-Color);
    }
</style>