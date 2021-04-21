<script>
  import {MaterialApp, Button, Icon, Dialog, Divider} from 'svelte-materialify';
  import {Tabs, TabList, Tab, TabPanel} from "./components/tabs/Tabs";
  import {rooms, isMouseDownRight, isMouseDownLeft, save, selectedColor} from "./store/store";
  import BuildingList from "./components/BuildingList.svelte";

  import BuildingMap from "./components/BuildingMap.svelte";
  import {newTab} from "./store/store";
  import {saveChange} from "./store/actions";
  import {mdiPlus} from "@mdi/js"
  import InfoDisplay from "./components/InfoDisplay.svelte";

  const {ipcRenderer} = window.require("electron")
  let tabNames = $save.buildings
  $: tabNames = $save.buildings
  let theme = 'light'
  let openNewTab = false


  document.body.onmousedown = (ev) => {
    if (ev.button === 0) isMouseDownRight.set(true)
    if (ev.button === 2) isMouseDownLeft.set(true)
  }
  document.body.onmouseup = (ev) => {
    if (ev.button === 0) isMouseDownRight.set(false)
    if (ev.button === 2) isMouseDownLeft.set(false)
  }

  const validEntry = () => {
    let errors = []
    if ($newTab.name === "" || $save.buildings.includes($newTab.name)) {
      errors.push("No empty name nor repeated name")
    }
    if ($newTab.cellSize.search("px") === -1) errors.push("No valid unit for cells")
    return {
      success: errors.length === 0,
      message: errors.join(", ")
    }
  }

  const createBuilding = () => {
    let a = validEntry()
    console.log($newTab)
    if (a.success) {
      let newtab = {
        name: $newTab.name,
        rooms: [],
        cellMap: [],
        GridSize: $newTab.mapSize,
        CellSize: $newTab.cellSize,
        existingCells: [],
        separation: {
          gold: 0,
          goods: 0,
          influence: 0,
          magic: 0,
          labor: 0
        }
      }
      for (let i = 0; i < $newTab.mapSize.y; i++) {
        newtab.existingCells.push([])
        for (let j = 0; j < $newTab.mapSize.x; j++) {
          newtab.existingCells[i].push(0);
        }
      }
      $save[$newTab.name] = newtab
      console.log($save)
      $save.buildings.push($newTab.name)

      $save = $save
      $newTab = {
        name: "",
        cellSize: "15px",
        mapSize: {x: 30, y: 30}
      }
      saveChange()
      closeDialaog()
    } else {
      errors = a.message
    }
  }

  const closeDialaog = () => {
    $newTab = {
      name: "",
      cellSize: "15px",
      mapSize: {x: 30, y: 30}
    }
    openNewTab = false;
    errors = ""
  }
  const deleteTab = (t) => {
    delete $save[t]
    let a = $save.buildings.indexOf(t)
    $save.buildings.splice(a, a)
    $save.buildings = $save.buildings;
    if ($save["activeBuilding"] === t) {
      $save["activeBuilding"] = $save.buildings[0] ? $save.buildings[0] : ""
    }
    $save = $save;
    saveChange()
  }

  let errors = ""

  export let appName
</script>


<MaterialApp theme={theme}>
    <main>
        <Tabs>
            <div style="height: 5vh">
                <TabList>
                    {#each tabNames as t,i}
                    <span on:click={(e)=>{
                      if (!e.shiftKey){
                        $save["activeBuilding"] = t; $selectedColor="#000000"; $save=$save;  saveChange()
                      }else{
                        deleteTab(t)
                      }
                    }}><Tab>{t}</Tab>
                    </span>
                    {/each}
                    <Button icon on:click={()=> openNewTab = true}>
                        <Icon path={mdiPlus}/>
                    </Button>
                </TabList>
            </div>
            <Divider/>
            <div class="mt-4"></div>
            {#each tabNames as t,i}
                {#if $save[$save["activeBuilding"]]}
                    <TabPanel>
                        <div class="building-panel">
                            <div class="small list">
                                <BuildingList items={$rooms}/>
                            </div>
                            <div class="map">
                                <BuildingMap cellSize={$save[$save["activeBuilding"]]["CellSize"]}
                                             size={$save[$save["activeBuilding"]].GridSize}/>
                            </div>
                            <div class="small">
                                <div style="max-height: 40vh;overflow: auto;min-height: 40vh">
                                    <BuildingList counter={true} bind:items={$save[$save["activeBuilding"]].rooms}/>
                                </div>
                                <Divider></Divider>
                                <div style="max-height: 53vh;" class="list">
                                    <InfoDisplay/>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                {/if}
            {/each}
        </Tabs>
        <Dialog bind:active={openNewTab} persistent>
            <div class="pa-4 ">
                <form class="content" on:submit={createBuilding}>
                    <div style="display: flex; align-items: baseline">
                        <label for="tabName">Building Name:</label>
                        <input id="tabName" type="text" bind:value={$newTab.name}>
                    </div>
                    <div style="display: flex; align-items: baseline">
                        <label for="tabCellSize">Map Cell Size:</label>
                        <input id="tabCellSize" type="text" bind:value={$newTab.cellSize}>
                    </div>
                    <div style="display: flex; align-items: baseline">
                        <label for="tabMapX">Map Size:</label>
                        <div class="pl-1">X:</div>
                        <input id="tabMapX" type="number" bind:value={$newTab.mapSize.x} style="width: 4.5rem" min="0">
                        <div>- Y:</div>
                        <input id="tabMapY" type="number" bind:value={$newTab.mapSize.y} style="width: 4.5rem" min="0">
                    </div>
                    <div></div>
                    <div style="display: flex; justify-content: space-between">
                        <div style="color: red">
                            <b>{errors}</b>
                        </div>
                        <div>
                            <Button class="red white-text mr-1" on:click={()=>{closeDialaog()}}>Cancel</Button>
                            <Button on:click={()=>{createBuilding()}}>Create</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    </main>

</MaterialApp>

<style>

    main {
        width: 100vw;
        height: 100vh;
    }

    .small {
        width: 25vw;
        height: 100%;
        max-height: 92vh;
        overflow: hidden;
    }

    .small::-webkit-scrollbar {
        display: none;
    }

    .map {
        width: 50vw;
    }

    .building-panel {
        display: flex;
        height: 100%;
        overflow: auto;
    }
    .list{
        overflow: auto;
    }
</style>